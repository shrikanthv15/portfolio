"use client";

import { useEffect, useRef, useState } from "react";
import MascotSprite from "./MascotSprite";
import ThoughtBubble from "./ThoughtBubble";
import { MASCOT, THOUGHTS, type Pose } from "./mascot.config";
import { prefersReducedMotion, isCoarsePointer } from "@/lib/gsap";

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const pick = (arr: string[]) => arr[(Math.random() * arr.length) | 0];

/**
 * Inkling engine. A fixed overlay (pointer-events: none) with the mascot riding
 * the top-right edge of whichever section ([data-mascot-platform]) is in view —
 * climbing/hopping between them as you scroll, eyes tracking the cursor, and a
 * thought bubble on click (or idly, as it "notes things down"). 60fps via direct
 * DOM writes; React state only for the bubble. Off on touch / reduced-motion.
 */
export default function Mascot() {
  const [enabled, setEnabled] = useState(true);
  const [bubble, setBubble] = useState({ text: "", visible: false });
  const rootRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isCoarsePointer()) {
      setEnabled(false);
      return;
    }
    const reduce = prefersReducedMotion();
    const root = rootRef.current;
    const figure = figureRef.current;
    if (!root || !figure) return;

    const poseEl = figure.querySelector<HTMLElement>(".ink-pose")!;
    const pupils = Array.from(figure.querySelectorAll<SVGGElement>(".pupil"));

    let platforms: HTMLElement[] = [];
    const scan = () => (platforms = Array.from(document.querySelectorAll<HTMLElement>("[data-mascot-platform]")));
    scan();

    const vw = () => window.innerWidth;
    const vh = () => window.innerHeight;

    // start parked bottom-right
    let cur = { x: vw() - 90, y: vh() - 160 };
    let wander = { x: 0, y: 0 };
    const cursor = { x: vw() / 2, y: vh() / 2 };
    let activeKey = "top";
    let lastKey = "top";
    let jumpUntil = 0;
    let thinkUntil = 0;

    const activePlatform = () => {
      const probe = vh() * 0.4;
      let best: HTMLElement | null = null;
      let bestDist = Infinity;
      for (const p of platforms) {
        const r = p.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh()) continue;
        if (r.top <= probe && r.bottom >= probe) return p; // straddles probe
        const d = Math.min(Math.abs(r.top - probe), Math.abs(r.bottom - probe));
        if (d < bestDist) {
          bestDist = d;
          best = p;
        }
      }
      return best;
    };

    const onMove = (e: MouseEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    const onResize = () => scan();
    window.addEventListener("resize", onResize, { passive: true });

    // blink
    let blinkT: number;
    const blink = () => {
      figure.classList.add("is-blink");
      window.setTimeout(() => figure.classList.remove("is-blink"), 130);
      blinkT = window.setTimeout(blink, rand(...MASCOT.blinkEveryMs));
    };
    if (!reduce) blinkT = window.setTimeout(blink, rand(...MASCOT.blinkEveryMs));

    // idle wander retarget
    let wanderT: number;
    const reWander = () => {
      wander = { x: rand(-MASCOT.wanderRadius, 4), y: rand(-12, 12) };
      wanderT = window.setTimeout(reWander, rand(...MASCOT.wanderEveryMs));
    };
    if (!reduce) reWander();

    // idle bubble ("noting things down")
    let bubbleT: number;
    const showThought = (key = activeKey, hold = MASCOT.bubbleHoldMs) => {
      const lines = THOUGHTS[key] ?? THOUGHTS.default;
      setBubble({ text: pick(lines), visible: true });
      thinkUntil = performance.now() + hold;
      window.clearTimeout(hideT);
      hideT = window.setTimeout(() => setBubble((b) => ({ ...b, visible: false })), hold);
    };
    let hideT: number;
    const idleBubble = () => {
      if (!reduce) showThought();
      bubbleT = window.setTimeout(idleBubble, rand(...MASCOT.idleBubbleEveryMs));
    };
    bubbleT = window.setTimeout(idleBubble, rand(...MASCOT.idleBubbleEveryMs));

    // click → react + contextual thought
    const onClick = () => {
      showThought(activeKey, MASCOT.bubbleHoldMs + 800);
    };
    figure.addEventListener("click", onClick);

    // main loop
    let raf = 0;
    let running = true;
    const onVis = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVis);

    const loop = () => {
      if (!running) return;
      const p = activePlatform();
      let tx = vw() - 90;
      let ty = vh() - 160;
      if (p) {
        const r = p.getBoundingClientRect();
        activeKey = p.dataset.mascotKey || "default";
        tx = clamp(r.right - MASCOT.edgeInset, 24, vw() - 24);
        ty = clamp(r.top, MASCOT.clampTop, vh() - MASCOT.clampBottom);
      }
      if (!reduce) {
        tx += wander.x;
        ty += wander.y;
      }

      if (activeKey !== lastKey) {
        jumpUntil = performance.now() + 420; // hop on section change
        lastKey = activeKey;
      }

      const lerp = reduce ? 1 : MASCOT.lerp;
      const dx = tx - cur.x;
      const dy = ty - cur.y;
      cur.x += dx * lerp;
      cur.y += dy * lerp;

      root.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;

      // pose
      let pose: Pose = "idle";
      const now = performance.now();
      if (now < jumpUntil) pose = "jump";
      else if (now < thinkUntil) pose = "think";
      else if (dy < -1.2) pose = "climb";
      else if (cur.y >= vh() - MASCOT.clampBottom - 2) pose = "dangle";
      else if (Math.abs(dx) > 0.6) pose = "walk";
      poseEl.dataset.pose = pose;

      // facing toward travel (or cursor when idle)
      const face = Math.abs(dx) > 0.4 ? (dx < 0 ? -1 : 1) : cursor.x < cur.x ? -1 : 1;
      figure.style.setProperty("--face", String(face));

      // pupils track cursor
      const cx = cur.x;
      const cy = cur.y - 4;
      const a = Math.atan2(cursor.y - cy, cursor.x - cx);
      const px = Math.cos(a) * 1.8 * face; // counter-flip so eyes look right way
      const py = Math.sin(a) * 1.8;
      pupils.forEach((pu) => (pu.style.transform = `translate(${px}px, ${py}px)`));

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      figure.removeEventListener("click", onClick);
      clearTimeout(blinkT);
      clearTimeout(wanderT);
      clearTimeout(bubbleT);
      clearTimeout(hideT);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <div className="ink-overlay" aria-hidden={false}>
      <div ref={rootRef} className="ink-root">
        <ThoughtBubble text={bubble.text} visible={bubble.visible} />
        <button
          ref={figureRef}
          className="ink-figure"
          aria-label="Inkling — Shrikanth's field-note companion. Click for a thought."
          type="button"
        >
          <div className="ink-pose" data-pose="idle">
            <MascotSprite />
          </div>
        </button>
      </div>
    </div>
  );
}
