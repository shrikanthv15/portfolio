import { fetchHeartbeat } from "@/lib/pantheon";

// Server-side proxy so the browser never hits PocketBase directly (no CORS),
// revalidated every 60s.
export const revalidate = 60;

export async function GET() {
  const hb = await fetchHeartbeat();
  return Response.json(hb, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}
