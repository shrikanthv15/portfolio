# Motion & craft spec (v2 upgrade)

Research-backed plan for the premium-minimalist motion pass. Principle: **one
signature moment + restraint + texture + kinetic type.** Every animation must
earn its place and degrade gracefully under `prefers-reduced-motion`.

## Stack
- **Lenis** owns smooth scroll · **GSAP ScrollTrigger** owns pinned/scrubbed scenes
  + SplitText (free in 3.13+) · **Motion** (`motion/react`) for component-local
  scroll transforms · native CSS `view()` for cheap fire-and-forget reveals.
- **One 3D moment:** `@paper-design/shaders-react` GrainGradient wash behind the
  hero (zero three.js; `speed=0` static under reduced-motion / low-power). NOT R3F.

## Easing (the "expensive" feel)
- `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)` — primary reveal curve
- `--ease-ios-spring: cubic-bezier(0.32, 0.72, 0, 1)` — depth/PS5 feel
- GSAP: `expo.out` reveals, `ease:"none"` on all scrubbed timelines.
- Durations: reveals 0.8–1.2s · micro 0.2–0.4s · palette crossfade 0.6–0.8s.

## The 6 moves (ranked, from research)
1. **Foundation** — Lenis↔GSAP RAF wiring (`autoRaf:false` + `gsap.ticker` +
   `useLenis(()=>ScrollTrigger.update())`). `MotionConfig reducedMotion="user"`.
2. **SplitText masked reveals** on every heading (`mask:"lines"`, `expo.out`,
   `stagger 0.012`, `aria:"auto"`, split after `document.fonts.ready`).
3. **One scroll-scrubbed hero zoom** — pin hero, scale+fade wordmark, reveal next.
4. **Premium easing tokens** applied globally.
5. **Scroll-linked palette shift** between chapters (body bg paper↔inkdeep, 0.8s).
6. **Native CSS `view()` reveals** for the long tail (+ `@supports` fallback).

## Reference builds
- Joffrey Spitzer (minimalist editorial GSAP) — titles `expo.out`, line reveals.
- Apple AirPods Pro (pin+scrub zoom). Dennis Snellenberg / Arnaud Rocca (pacing).
- Grain wash: Stefan Vitasović case study; shaders.paper.design.

## A11y / perf guardrails
- Gate every transform animation behind reduced-motion (`gsap.matchMedia`
  "no-preference"). Animate only transform/opacity/filter/color.
- Lazy-load the shader (`next/dynamic ssr:false`), static frame when reduced/low-power,
  CSS radial-gradient fallback always underneath. Initial JS < ~170KB gzip.
- Don't run two smooth-scroll engines. `ease:"none"` on scrubs.
