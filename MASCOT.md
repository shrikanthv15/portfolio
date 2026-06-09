# Inkling — the mascot (how to edit / re-skin)

"Inkling" is Shrikanth's field-note companion: a small SVG doodle that rides the
right edge of whichever section is in view, climbs/hops/dangles as you scroll,
tracks the cursor with its eyes, and pops a thought bubble on click (or idly, as
it "notes things down"). Built deliberately modular — **art, behaviour, and
personality are three separate files** so you can change any one without the
others.

```
components/mascot/
  Mascot.tsx          engine: rAF loop, DOM-platform detection, pose FSM, cursor tracking
  MascotSprite.tsx    the ART — pure SVG. Re-skin the whole character here.
  ThoughtBubble.tsx   the speech/thought bubble (pure CSS)
  mascot.config.ts    the PERSONALITY — all tunables + what it "thinks" per section
```

## Edit the personality (no code)
`components/mascot/mascot.config.ts`:
- `THOUGHTS` — what it says, keyed by section id (`top`, `who`, `machine`, `work`,
  `experience`, `education`, `contact`, `default`). Add/edit lines freely.
- `MASCOT` — knobs: `lerp` (floatiness), `edgeInset`, `clampTop/Bottom` (where it
  perches), `wanderRadius`, blink/bubble timing.

## Re-skin the character (swap the art)
Edit `components/mascot/MascotSprite.tsx` — it's plain SVG. Keep these class hooks
so the engine can still drive it:
- `.pupil` (×2) — the engine translates these to track the cursor
- `.eye-lid` (×2) — scaled to blink
- `.ink-pencil` — shown in the `think` pose
- root `.ink-sprite`
Want a cat / Batman / a different blob? Replace the paths inside, keep the hooks.
To use pixel art or a Rive file instead, swap `MascotSprite` for a sprite/Rive
renderer — the engine only needs `.pupil`/`.eye-lid` hooks + a `[data-pose]` host.

## Where it can walk
Any element with `data-mascot-platform` (+ optional `data-mascot-key="<id>"`) is a
ledge it rides. Currently every `SectionShell` and the hero are tagged.

## Make a section talk to it
Set `data-mascot-key="something"` on a platform and add a matching `THOUGHTS.something`.

## Accessibility / perf
Auto-disabled on touch + `prefers-reduced-motion`; pauses when the tab is hidden;
60fps via direct DOM writes (no React re-renders in the loop). The clickable sprite
is a real `<button>` with an aria-label; the bubble is an `aria-live` region.
