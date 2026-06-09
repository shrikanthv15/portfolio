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
  const [reduce, setReduce] = useState(false);
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
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

    return () => {
      cancelAnimationFrame(frame);
      cleanup();
    };
  }, [reduce]);

  if (reduce) return <>{children}</>;

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
