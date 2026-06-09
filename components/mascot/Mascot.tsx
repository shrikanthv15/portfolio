"use client";

import { useEffect, useRef, useState } from "react";
import MascotSprite from "./MascotSprite";
import { MASCOT, type Pose } from "./mascot.config";
import { prefersReducedMotion, isCoarsePointer } from "@/lib/gsap";

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/**
 * Kratos the pet — the locomotion engine. Rides the right edge of the in-view
 * section ([data-mascot-platform]), climbing/hopping/dangling as you scroll,
 * eyes tracking the cursor. Click → onPetClick (starts the tour). Section change
 * → onSection. `talking` biases it to the talk pose. 60fps via direct DOM writes;
 * self-heals on layout change (ResizeObserver). Off on touch / reduced-motion-snap.
 */
export default function Mascot({
  onPetClick,
  onSection,
  talking = false,
}: {
  onPetClick?: () => void;
  onSection?: (key: string) => void;
  talking?: boolean;
}) {
  const [enabled, setEnabled] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLButtonElement>(null);
  const talkingRef = useRef(talking);
  talkingRef.current = talking;
  const cbRef = useRef({ onPetClick, onSection });
  cbRef.current = { onPetClick, onSection };

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

    let cur = { x: vw() - 92, y: vh() - 170 };
    let wander = { x: 0, y: 0 };
    const cursor = { x: vw() / 2, y: vh() / 2 };
    let activeKey = "top";
    let lastKey = "top";
    let jumpUntil = 0;

    const activePlatform = () => {
      const probe = vh() * 0.4;
      let best: HTMLElement | null = null;
      let bestDist = Infinity;
      for (const p of platforms) {
        const r = p.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh()) continue;
        if (r.top <= probe && r.bottom >= probe) return p;
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

    const ro = new ResizeObserver(() => scan());
    ro.observe(document.body);
    const onResize = () => scan();
    window.addEventListener("resize", onResize, { passive: true });

    // blink
    let blinkT: number;
    const blink = () => {
      figure.classList.add("is-blink");
      window.setTimeout(() => figure.classList.remove("is-blink"), 120);
      blinkT = window.setTimeout(blink, rand(...MASCOT.blinkEveryMs));
    };
    if (!reduce) blinkT = window.setTimeout(blink, rand(...MASCOT.blinkEveryMs));

    // idle wander
    let wanderT: number;
    const reWander = () => {
      wander = { x: rand(-MASCOT.wanderRadius, 4), y: rand(-12, 12) };
      wanderT = window.setTimeout(reWander, rand(...MASCOT.wanderEveryMs));
    };
    if (!reduce) reWander();

    const onClick = () => cbRef.current.onPetClick?.();
    figure.addEventListener("click", onClick);

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
      let tx = vw() - 92;
      let ty = vh() - 170;
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

      const now = performance.now();
      if (activeKey !== lastKey) {
        jumpUntil = now + 440;
        lastKey = activeKey;
        cbRef.current.onSection?.(activeKey);
      }

      const k = reduce ? 1 : MASCOT.lerp;
      const dx = tx - cur.x;
      const dy = ty - cur.y;
      cur.x += dx * k;
      cur.y += dy * k;
      root.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;

      let pose: Pose = "idle";
      if (now < jumpUntil) pose = "jump";
      else if (talkingRef.current) pose = "talk";
      else if (dy < -1.2) pose = "climb";
      else if (cur.y >= vh() - MASCOT.clampBottom - 2) pose = "dangle";
      else if (Math.abs(dx) > 0.6) pose = "walk";
      poseEl.dataset.pose = pose;

      const face = Math.abs(dx) > 0.4 ? (dx < 0 ? -1 : 1) : cursor.x < cur.x ? -1 : 1;
      figure.style.setProperty("--face", String(face));

      // catchlight tracks the cursor (counter-flip so it points the right way)
      const a = Math.atan2(cursor.y - (cur.y + 26), cursor.x - (cur.x + 31));
      const px = Math.cos(a) * 2 * face;
      const py = Math.sin(a) * 2;
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
      ro.disconnect();
      clearTimeout(blinkT);
      clearTimeout(wanderT);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <div className="ink-overlay">
      <div ref={rootRef} className="ink-root">
        <button
          ref={figureRef}
          className="ink-figure"
          type="button"
          aria-label="Kratos — Shrikanth's orchestrator. Click for a guided tour."
        >
          <div className="ink-pose" data-pose="idle">
            <MascotSprite />
          </div>
        </button>
      </div>
    </div>
  );
}
