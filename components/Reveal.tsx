"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** Play immediately on mount (use for above-the-fold hero content). */
  immediate?: boolean;
};

const EASE = [0.2, 0.65, 0.3, 1] as const;

/**
 * Scroll-reveal wrapper. Animates when scrolled into view, OR after a short
 * fallback timeout so content can NEVER get stuck invisible if the
 * IntersectionObserver doesn't fire. No-ops under prefers-reduced-motion.
 */
export function Reveal({ children, delay = 0, y = 28, className, immediate = false }: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [fallback, setFallback] = useState(immediate);

  useEffect(() => {
    if (immediate) return;
    const t = setTimeout(() => setFallback(true), 1400);
    return () => clearTimeout(t);
  }, [immediate]);

  if (reduce) return <div className={className}>{children}</div>;

  const show = immediate || inView || fallback;
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word headline reveal, same safety net. Plain text under reduced motion. */
export function RevealWords({
  text,
  className,
  delay = 0,
  immediate = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [fallback, setFallback] = useState(immediate);

  useEffect(() => {
    if (immediate) return;
    const t = setTimeout(() => setFallback(true), 1400);
    return () => clearTimeout(t);
  }, [immediate]);

  const words = text.split(" ");
  if (reduce) return <span className={className}>{text}</span>;

  const show = immediate || inView || fallback;
  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={show ? { y: 0 } : { y: "110%" }}
            transition={{ duration: 0.7, delay: delay + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
