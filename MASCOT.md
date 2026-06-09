# Kratos — the companion robot (how it works / how to edit)

"Kratos" is Shrikanth's top orchestrator agent, reimagined as a small companion
robot that lives on the page. He rides the right edge of whichever section is in
view (climbing/hopping/dangling as you scroll), tracks the cursor with his eye,
and — when you **click him** — starts a **scroll-driven monologue**: a docked
chat thread where he "texts" you a guided tour, one contextual beat per section,
opening with the running billion-dollar gag.

Built deliberately modular — **art / locomotion / behaviour / dialogue are
separate** so any one can change without the others.

```
components/mascot/
  KratosCompanion.tsx   wires the pet + the dialogue thread together (mount this)
  Mascot.tsx            LOCOMOTION engine: rAF loop, DOM-platform detection, poses,
                        cursor-tracking eye, self-heals on layout change (ResizeObserver)
  MascotSprite.tsx      the ART — detailed robot SVG (named groups, CSS-var palette).
                        Re-skin the whole character here.
  mascot.config.ts      pet tunables (perch, lerp, blink/wander timing) + Pose type
  dialogue.config.ts    the SCRIPT — Kratos's monologue, keyed by section id
  useDialogueTour.ts    tour state machine: queue + typing pacing, skip/replay/dismiss,
                        back-fills skipped sections so the story stays coherent
  useSectionDriver.ts   IntersectionObserver that pushes each section's beats on scroll
                        (decoupled from the pet's animation loop = robust)
  CompanionThread.tsx   the docked chat UI (aria-live log, controls)
```

## Edit the script (no code)
`dialogue.config.ts` → `TOUR`: keys match each section's `data-mascot-key`
(`top`, `who`, `machine`, `work`, `experience`, `education`, `contact`). Add/edit
beats freely. `top` = the intro that fires on click.

## Re-skin Kratos (swap the art)
`MascotSprite.tsx` is plain SVG. Keep the engine hooks: `.pupil` (catchlight the
engine moves toward the cursor), `.eye-lid` (blink), the named groups
(`.k-head/.k-torso/.k-antenna/.k-arm-*/.k-scanline/.k-spec`) that the idle CSS
animates, and `.ink-pose` (carries `data-pose`). Palette is CSS vars (`--k-*` on
`.ink-overlay` in globals.css) — retheme by changing those.

## Tune behaviour / personality
- Pet motion: `mascot.config.ts` (perch position, floatiness, blink/wander cadence).
- Idle "alive" micro-loops + poses: the `.k-*` / `.ink-pose[data-pose]` rules in
  `app/globals.css` (desynchronized coprime periods so it never visibly repeats).
- Dialogue pacing: `useDialogueTour.ts` (typing delay, gaps).

## Where it walks / talks
Any element with `data-mascot-platform` + `data-mascot-key="<id>"` is both a ledge
Kratos rides and a dialogue trigger. Every `SectionShell` and the hero are tagged.

## Accessibility / perf / architecture notes
- Off on touch + `prefers-reduced-motion` (snaps, no autonomous motion); pauses
  when the tab is hidden. Engine uses direct DOM writes (no per-frame React renders).
- The dialogue thread is **non-modal**: `role="log"` + `aria-live="polite"`, never
  traps focus, dismissible (button + Escape), resumable, with skip/replay.
- Research verdict (2026): hand-SVG + CSS/GSAP beats Rive here (Rive = ~200KB WASM,
  can't inherit the CSS-var palette) and three.js is overkill for a 2D DOM pet.
  Physics (matter.js) only worth adding later for a true swing/dangle state.
