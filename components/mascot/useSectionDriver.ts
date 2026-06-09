"use client";

import { useEffect } from "react";

/**
 * Robust dialogue driver: fires `onEnter(sectionKey)` when a section
 * ([data-mascot-key]) scrolls into view — via IntersectionObserver, decoupled
 * from the pet's animation loop so the monologue advances reliably as you
 * scroll. De-duping is the tour's job (high-water-mark). Only active while touring.
 */
export function useSectionDriver(onEnter: (key: string) => void, active: boolean) {
  useEffect(() => {
    if (!active || typeof window === "undefined") return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-mascot-key]"));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // fire for intersecting sections, top-most first, so order stays natural
        entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          .forEach((e) => {
            const key = (e.target as HTMLElement).dataset.mascotKey;
            if (key) onEnter(key);
          });
      },
      { threshold: 0.35 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onEnter, active]);
}
