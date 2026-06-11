"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

export default function TypedSignal({
  text,
  inverted = false,
  className = "",
}: {
  text: string;
  inverted?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [armed, setArmed] = useState(false);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      const timer = window.setTimeout(() => {
        setTyped(text);
        setArmed(true);
      }, 0);
      return () => clearTimeout(timer);
    }

    if (typeof IntersectionObserver === "undefined") {
      const timer = window.setTimeout(() => setArmed(true), 0);
      return () => clearTimeout(timer);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        setArmed(true);
        io.disconnect();
      },
      { threshold: 0.45 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [text]);

  useEffect(() => {
    if (!armed || prefersReducedMotion()) return;

    let char = 0;
    let timer = 0;

    const tick = () => {
      char += 1;
      setTyped(text.slice(0, char));
      if (char < text.length) {
        timer = window.setTimeout(tick, 18 + Math.random() * 28);
      }
    };

    timer = window.setTimeout(tick, 120);
    return () => clearTimeout(timer);
  }, [armed, text]);

  return (
    <p
      ref={ref}
      className={[
        "typed-signal font-mono text-xs uppercase tracking-[0.18em]",
        inverted ? "text-paper/55" : "text-muted",
        className,
      ].join(" ")}
      aria-label={text}
    >
      <span aria-hidden className="text-signal">
        ▸
      </span>{" "}
      <span aria-hidden>{typed}</span>
      {typed.length < text.length ? (
        <span className="tw-caret" aria-hidden>
          &nbsp;
        </span>
      ) : null}
    </p>
  );
}
