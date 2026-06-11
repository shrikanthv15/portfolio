"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

/**
 * Lenis smooth scroll wired to the GSAP ticker (the canonical 2026 setup):
 * one RAF loop drives Lenis, and every Lenis scroll pings ScrollTrigger so
 * pinned/scrubbed scenes never read a stale scrollY. Disabled entirely under
 * prefers-reduced-motion (native scroll, no hijack).
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [reduce, setReduce] = useState<boolean | null>(null);
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduce(mq.matches);
    const timer = window.setTimeout(onChange, 0);
    mq.addEventListener("change", onChange);
    return () => {
      window.clearTimeout(timer);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    if (reduce) return;
    registerGsap();

    let frame = 0;
    const wire = () => {
      const lenis = lenisRef.current?.lenis;
      if (!lenis) {
        frame = requestAnimationFrame(wire);
        return;
      }
      lenis.on("scroll", ScrollTrigger.update);
      const update = (time: number) => lenis.raf(time * 1000); // s → ms
      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => {
        gsap.ticker.remove(update);
        lenis.off("scroll", ScrollTrigger.update);
      };
    };
    let cleanup = () => {};
    wire();

    // Recalculate every ScrollTrigger after fonts load + SplitText re-wraps
    // (which shifts layout). Without this, triggers below the fold keep stale
    // start positions and fire on load instead of on scroll. Refresh again on
    // full load and after a settle delay to catch late layout shifts.
    const refresh = () => ScrollTrigger.refresh();
    const timers: number[] = [];
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => requestAnimationFrame(refresh));
    }
    window.addEventListener("load", refresh);
    timers.push(window.setTimeout(refresh, 900), window.setTimeout(refresh, 2200));

    return () => {
      cancelAnimationFrame(frame);
      cleanup();
      window.removeEventListener("load", refresh);
      timers.forEach(clearTimeout);
    };
  }, [reduce]);

  if (reduce !== false) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ lerp: 0.1, duration: 1.2, smoothWheel: true, autoRaf: false }}
    >
      {children}
    </ReactLenis>
  );
}
