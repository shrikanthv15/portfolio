/**
 * Kratos's scroll-driven monologue. Click the pet → the intro ("top") beats
 * fire; then each section pushes its beats once, on first downward entry
 * (high-water-mark, so re-scrolling never replays). Edit the script freely —
 * keys match each section's data-mascot-key.
 *
 * Voice: Kratos is Shrikanth's top orchestrator agent — proud, dry, a little
 * theatrical, self-aware that he's AI. The running gag: he's perpetually mid-way
 * through building a billion-dollar system under "don't make any mistakes" pressure.
 */
export type Beat = { id: string; text: string; typingMs?: number };

export const TOUR: Record<string, Beat[]> = {
  top: [
    { id: "i1", text: "Oh — you clicked me.", typingMs: 600 },
    { id: "i2", text: "I was right in the middle of building Shrikanth a billion-dollar system." },
    { id: "i3", text: "(No pressure. “Just don’t make any mistakes,” they said. Classic.)" },
    { id: "i4", text: "…but for you? I’ll take a break. Scroll — I’ll narrate. ↓" },
  ],
  who: [
    { id: "w1", text: "Field Note 01 — the human." },
    { id: "w2", text: "MS in Data Science at Maryland. 4.0. He doesn’t miss either. Frankly, annoying." },
  ],
  machine: [
    { id: "m1", text: "Ah. Home turf." },
    { id: "m2", text: "That’s my crew: Loki scouts, Mimir publishes, Hermes keeps the books." },
    { id: "m3", text: "I orchestrate. I’m the one holding the billion-dollar pressure, remember." },
  ],
  work: [
    { id: "k1", text: "The shipped work. Production, not demos." },
    { id: "k2", text: "I logged every one of these myself. You’re welcome." },
  ],
  experience: [
    { id: "e1", text: "The track record — Confer, NV Rad, FX31." },
    { id: "e2", text: "Real rooms. Real deadlines. Fewer mistakes than you’d expect." },
  ],
  education: [
    { id: "d1", text: "Foundations: IIT Madras, then Maryland." },
    { id: "d2", text: "Pedigree checks out. I ran the numbers twice." },
  ],
  contact: [
    { id: "c1", text: "End of the tour." },
    { id: "c2", text: "If you’re hiring — and you should be — this is where you say hi." },
    { id: "c3", text: "I’ll pass it to Shrikanth. Then… back to that billion dollars." },
  ],
};

/** Order sections are expected to appear in (drives "skip to end" + completion). */
export const TOUR_ORDER = ["top", "who", "machine", "work", "experience", "education", "contact"];
