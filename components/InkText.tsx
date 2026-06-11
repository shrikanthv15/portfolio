"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, registerGsap, prefersReducedMotion } from "@/lib/gsap";

const INK = "#1b1a17";
const PAPER = "#f4f1e9";
const SIGNAL = "#d64324";
const ghostOf = (rgb: string, a = 0.16) => `rgba(${rgb},${a})`;
const INK_RGB = "27,26,23";
const PAPER_RGB = "244,241,233";
const SIGNAL_RGB = "214,67,36";

/**
 * Ink-in-on-scroll: words start ghosted and saturate to full colour word-by-word
 * as the line scrolls through the viewport. Words inside a `.text-signal` span
 * fill to vermilion; everything else fills to ink (light) or paper (dark `tone`).
 * SCRUBBED → locked to scroll position, so it can never "fire early and finish"
 * the way an entrance tween can — this is what makes animations work below the
 * hero. Reduced-motion → final colour, no animation.
 */
export default function InkText({
  text,
  children,
  as = "h2",
  className,
  tone = "ink",
  start = "top 90%",
  end = "top 45%",
}: {
  text?: string;
  children?: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  tone?: "ink" | "paper";
  start?: string;
  end?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const setRef = (node: HTMLElement | null) => {
    ref.current = node;
  };

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;
      const baseRgb = tone === "paper" ? PAPER_RGB : INK_RGB;
      const baseFill = tone === "paper" ? PAPER : INK;
      const isAccent = (w: Element) => !!w.closest(".text-signal");
      const fillFor = (w: Element) => (isAccent(w) ? SIGNAL : baseFill);
      const ghostFor = (w: Element) => ghostOf(isAccent(w) ? SIGNAL_RGB : baseRgb, 0.18);

      if (prefersReducedMotion()) {
        el.style.color = baseFill;
        return;
      }

      const run = () => {
        const split = SplitText.create(el, { type: "words", aria: "auto" });
        split.words.forEach((w) => gsap.set(w, { color: ghostFor(w) }));
        gsap.to(split.words, {
          color: (i: number, t: Element) => fillFor(t),
          ease: "none",
          stagger: 0.5,
          scrollTrigger: { trigger: el, start, end, scrub: 0.6 },
        });
      };

      if (typeof document !== "undefined" && document.fonts?.ready) {
        document.fonts.ready.then(run);
      } else {
        run();
      }
    },
    { scope: ref, dependencies: [text] }
  );

  const content = children ?? text;
  if (as === "p") return <p ref={setRef} className={className}>{content}</p>;
  if (as === "h3") return <h3 ref={setRef} className={className}>{content}</h3>;
  return <h2 ref={setRef} className={className}>{content}</h2>;
}
