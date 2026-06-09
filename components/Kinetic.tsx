"use client";

import { createElement, useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, registerGsap, prefersReducedMotion } from "@/lib/gsap";

type KineticProps = {
  /** plain-text headline (best for char reveals) */
  text?: string;
  /** rich children when the headline has inline spans (use line reveals) */
  children?: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  /** char-by-char (headlines) vs line-by-line (paragraphs / spans) */
  chars?: boolean;
  /** play on mount (hero) instead of on scroll-into-view */
  immediate?: boolean;
  stagger?: number;
  start?: string;
  delay?: number;
};

/**
 * Kinetic heading: masked SplitText reveal with the premium expo.out curve.
 * - Splits AFTER fonts load (no reflow mis-split), `aria:"auto"` keeps the
 *   full string for screen readers, and the whole thing no-ops under
 *   prefers-reduced-motion (renders plain, fully-visible text).
 */
export default function Kinetic({
  text,
  children,
  as = "h2",
  className,
  chars = false,
  immediate = false,
  stagger,
  start = "top 82%",
  delay = 0,
}: KineticProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const el = ref.current;
      if (!el) return;

      const run = () => {
        const split = SplitText.create(el, {
          type: chars ? "chars" : "lines",
          mask: "lines",
          autoSplit: true,
          aria: "auto",
        });
        const targets = chars ? split.chars : split.lines;
        const tween = gsap.from(targets, {
          yPercent: 115,
          opacity: 0,
          duration: chars ? 0.9 : 1.05,
          delay,
          ease: "expo.out",
          stagger: stagger ?? (chars ? 0.014 : 0.08),
          scrollTrigger: immediate ? undefined : { trigger: el, start },
        });

        // Safety net for above-the-fold reveals: native setTimeout fires even
        // when rAF/GSAP is throttled (backgrounded tab), so the hero text can
        // never get stuck partially hidden. Scroll reveals are left to GSAP.
        if (immediate) {
          window.setTimeout(() => {
            if (ref.current && tween.progress() < 1) {
              gsap.set(targets, { clearProps: "opacity,transform,y,yPercent" });
            }
          }, 2200);
        }
      };

      if (typeof document !== "undefined" && document.fonts?.ready) {
        document.fonts.ready.then(run);
      } else {
        run();
      }
    },
    { scope: ref, dependencies: [text] }
  );

  return createElement(
    as,
    { ref, className: ["kinetic", className].filter(Boolean).join(" ") },
    children ?? text
  );
}
