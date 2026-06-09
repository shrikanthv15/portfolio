"use client";

import { createElement, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Decrypt-on-scroll: text scrambles then resolves as it enters view (GSAP
 * ScrambleText). On-theme "terminal/agent" feel for the mono Field-Note labels.
 * SSR-safe (renders the real text), reduced-motion → plain text.
 */
export default function Decrypt({
  text,
  as = "span",
  className,
  start = "top 90%",
  chars = "upperAndLowerCase",
}: {
  text: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  start?: string;
  chars?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const el = ref.current;
      if (!el) return;
      gsap.to(el, {
        duration: 1.1,
        scrambleText: { text, chars, speed: 0.55, revealDelay: 0.25, tweenLength: false },
        ease: "none",
        scrollTrigger: { trigger: el, start, once: true },
      });
    },
    { scope: ref, dependencies: [text] }
  );

  return createElement(as, { ref, className }, text);
}
