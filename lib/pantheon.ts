// Light-touch live telemetry from the Pantheon PocketBase backend.
// Fetched SERVER-SIDE (no browser CORS), cached, and degrades gracefully.

const PB_URL = process.env.NEXT_PUBLIC_PANTHEON_URL ?? "https://api.twoby2.dev";

export type Heartbeat = {
  status: "live" | "idle" | "down";
  label: string;
  lastSeenIso: string | null;
  envelopesSeen: number | null;
};

const OFFLINE: Heartbeat = {
  status: "idle",
  label: "telemetry offline",
  lastSeenIso: null,
  envelopesSeen: null,
};

export async function fetchHeartbeat(): Promise<Heartbeat> {
  try {
    const res = await fetch(
      `${PB_URL}/api/collections/hermes_heartbeat/records?perPage=1&sort=-updated`,
      { next: { revalidate: 60 }, signal: AbortSignal.timeout(6000) }
    );
    if (!res.ok) return OFFLINE;

    const data = (await res.json()) as {
      items?: Array<{
        last_sync_at?: string;
        updated?: string;
        envelopes_seen?: number;
      }>;
    };
    const row = data.items?.[0];
    if (!row) return OFFLINE;

    const lastSeenIso = row.last_sync_at ?? row.updated ?? null;
    const ageMs = lastSeenIso ? Date.now() - new Date(lastSeenIso).getTime() : Infinity;
    const status: Heartbeat["status"] =
      ageMs < 1000 * 60 * 30 ? "live" : ageMs < 1000 * 60 * 60 * 24 ? "idle" : "down";

    return {
      status,
      label:
        status === "live"
          ? "agents nominal"
          : status === "idle"
            ? "agents resting"
            : "agents dormant",
      lastSeenIso,
      envelopesSeen: row.envelopes_seen ?? null,
    };
  } catch {
    return OFFLINE;
  }
}
