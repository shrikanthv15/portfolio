"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * Count-up numeral: ticks from 0 to `value` the first time it scrolls into
 * view (IntersectionObserver + rAF, expo-style deceleration — no deps).
 * Reduced-motion renders the final value immediately.
 */
export default function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1400,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setDisplay(value);
      return;
    }
    // Timer-poll instead of IntersectionObserver: IO + rAF + scroll events are
    // all suspended in hidden/throttled tabs, but timers still run — so the
    // numeral can never get stuck at 0. Visible tabs get the full rAF tick-up.
    let timeout = 0;
    const poll = window.setInterval(() => {
      if (played.current) return;
      const r = el.getBoundingClientRect();
      const inView = r.top < window.innerHeight * 0.85 && r.bottom > 0;
      if (!inView) return;
      played.current = true;
      window.clearInterval(poll);
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(2, -10 * p); // expo.out
        setDisplay(Math.round(value * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      // guarantee the final value even if rAF never ticks
      timeout = window.setTimeout(() => setDisplay(value), duration + 250);
    }, 500);
    return () => {
      window.clearInterval(poll);
      window.clearTimeout(timeout);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
