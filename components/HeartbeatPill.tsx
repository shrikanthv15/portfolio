"use client";

import { useEffect, useState } from "react";
import type { Heartbeat } from "@/lib/pantheon";

const DOT: Record<Heartbeat["status"], string> = {
  live: "bg-signal",
  idle: "bg-archival",
  down: "bg-muted",
};

/**
 * Light-touch live status pill. Polls the server proxy (/api/heartbeat) so it
 * reflects the real agent system, and degrades to a calm static state offline.
 */
const DEFAULT: Heartbeat = {
  status: "idle",
  label: "checking telemetry",
  lastSeenIso: null,
  envelopesSeen: null,
};

export default function HeartbeatPill({ initial }: { initial?: Heartbeat }) {
  const [hb, setHb] = useState<Heartbeat>(initial ?? DEFAULT);

  useEffect(() => {
    let alive = true;
    const tick = async () => {
      try {
        const res = await fetch("/api/heartbeat", { cache: "no-store" });
        if (!res.ok) return;
        const next = (await res.json()) as Heartbeat;
        if (alive) setHb(next);
      } catch {
        /* keep last good state */
      }
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  return (
    <a
      href="https://kratos.twoby2.dev"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 rounded-full border border-rule bg-paper/60 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted backdrop-blur transition-colors hover:border-ink hover:text-ink"
      title="Live status from my agent system — opens the Pantheon dashboard"
    >
      <span className="relative flex h-2 w-2">
        {hb.status === "live" && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${DOT[hb.status]}`} />
      </span>
      <span>
        {hb.status === "live" ? "live" : hb.status === "idle" ? "idle" : "offline"}
        <span className="text-muted/70"> · {hb.label}</span>
      </span>
    </a>
  );
}
