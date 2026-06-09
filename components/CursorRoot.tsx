"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion, isCoarsePointer } from "@/lib/gsap";

/**
 * Custom ink-dot cursor: a small dot that trails the pointer and grows over
 * interactive elements (mix-blend-mode: difference reads on both paper & ink).
 * Native cursor stays as the fallback until JS activates (.has-cursor on <html>).
 * Disabled on touch / reduced-motion.
 */
export default function CursorRoot() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || isCoarsePointer()) return;
    registerGsap();
    const dot = dotRef.current;
    if (!dot) return;

    const xTo = gsap.quickTo(dot, "x", { duration: 0.18, ease: "power3" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.18, ease: "power3" });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      dot.style.opacity = "1";
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      dot.classList.toggle(
        "cursor-dot--lg",
        !!t.closest("a, button, [data-cursor], .magnetic, [role='button']")
      );
    };
    const leave = () => (dot.style.opacity = "0");

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.classList.add("has-cursor");

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden />;
}
