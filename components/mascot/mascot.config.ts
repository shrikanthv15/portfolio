/**
 * Mascot config — ALL the editable knobs in one place (behaviour is data, not
 * code). Tune personality here without touching the engine; swap the art by
 * editing MascotSprite.tsx. The character is "Inkling" — Shrikanth's field-note
 * companion that rides the section you're reading and notes things down.
 */
export const MASCOT = {
  size: 60, // px
  edgeInset: 34, // distance in from the active section's right edge
  clampTop: 92, // keep the perch within these viewport bounds
  clampBottom: 150,
  lerp: 0.075, // 0..1 — how snappily it eases toward target (lower = floatier)
  wanderRadius: 30, // idle drift along the ledge
  wanderEveryMs: [2600, 5200] as [number, number],
  blinkEveryMs: [2400, 6000] as [number, number],
  idleBubbleEveryMs: [11000, 19000] as [number, number],
  bubbleHoldMs: 3600,
};

/** What Inkling "thinks" — keyed by the section in view. Edit freely. */
export const THOUGHTS: Record<string, string[]> = {
  top: ["booting up…", "an AI built this — I helped", "scroll, I'll follow ↓"],
  who: ["MS @ UMD · 4.0 ✎", "human-crafted, agent-assisted", "noting the good parts"],
  machine: ["my home turf ⚙", "Kratos · Loki · Mimir · me", "auditing the agents…"],
  work: ["production, not demos", "logging shipped work ✎", "100+ reports parsed"],
  experience: ["timeline checks out", "Confer · NV Rad · FX31", "noting milestones ✎"],
  education: ["foundations: solid", "IIT + UMD", "4.0 — not bad at all"],
  contact: ["say hi 👋", "let's build something", "I'll pass it to Shrikanth"],
  default: ["noting things down ✎", "still watching…", "hmm, interesting"],
};

export type Pose = "idle" | "walk" | "climb" | "dangle" | "jump" | "think" | "talk";
