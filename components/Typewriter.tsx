"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * Restrained rotating typewriter — types a phrase, holds, deletes, next.
 * Used ONCE (the hero identity line). Reduced-motion → static first phrase.
 * Real string lives in aria-label; the animating node is aria-hidden.
 */
export default function Typewriter({
  phrases,
  className,
  typeMs = 52,
  deleteMs = 26,
  holdMs = 1500,
}: {
  phrases: string[];
  className?: string;
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
}) {
  const [text, setText] = useState(phrases[0] ?? "");

  useEffect(() => {
    if (prefersReducedMotion()) {
      setText(phrases[0] ?? "");
      return;
    }
    let i = 0;
    let char = 0;
    let deleting = false;
    let timer: number;

    const step = () => {
      const cur = phrases[i % phrases.length] ?? "";
      if (!deleting) {
        char++;
        setText(cur.slice(0, char));
        if (char >= cur.length) {
          timer = window.setTimeout(() => {
            deleting = true;
            step();
          }, holdMs);
          return;
        }
        timer = window.setTimeout(step, typeMs);
      } else {
        char--;
        setText(cur.slice(0, Math.max(0, char)));
        if (char <= 0) {
          deleting = false;
          i++;
          timer = window.setTimeout(step, 320);
          return;
        }
        timer = window.setTimeout(step, deleteMs);
      }
    };

    timer = window.setTimeout(step, 650);
    return () => clearTimeout(timer);
  }, [phrases, typeMs, deleteMs, holdMs]);

  return (
    <span className={className} aria-label={phrases.join(" · ")}>
      <span aria-hidden>{text}</span>
      <span className="tw-caret" aria-hidden>
        &nbsp;
      </span>
    </span>
  );
}
