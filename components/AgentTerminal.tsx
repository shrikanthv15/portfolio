"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * The ONE place literal typewriter motion is justified: a fake shell that types
 * the agent roster's status line-by-line when it scrolls into view. On-theme for
 * "An AI built this." Reduced-motion → all lines shown instantly.
 */
const LINES: { p: string; t: string }[] = [
  { p: "$", t: "kratos status --agents" },
  { p: " ", t: "✓ loki    scout      · gathering signal" },
  { p: " ", t: "✓ mimir   publisher  · ships articles" },
  { p: " ", t: "✓ hermes  archivist  · keeps the books" },
  { p: " ", t: "✓ league  builders   · 7 heroes on call" },
  { p: "●", t: "4 agents nominal — built while you read this" },
];

export default function AgentTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const [out, setOut] = useState<{ p: string; t: string }[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setOut(LINES);
      return;
    }
    const timers: number[] = [];
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          io.disconnect();
          typeLine(0);
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);

    const typeLine = (li: number) => {
      if (li >= LINES.length) return;
      const line = LINES[li];
      setOut((o) => [...o, { p: line.p, t: "" }]);
      let ci = 0;
      const typeChar = () => {
        ci++;
        setOut((o) => {
          const c = [...o];
          c[li] = { p: line.p, t: line.t.slice(0, ci) };
          return c;
        });
        if (ci < line.t.length) timers.push(window.setTimeout(typeChar, 16 + Math.random() * 26));
        else timers.push(window.setTimeout(() => typeLine(li + 1), 240));
      };
      typeChar();
    };

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={ref} className="terminal space-y-1.5" aria-label="Live agent status">
      {out.map((l, i) => (
        <div key={i} className="flex gap-2">
          <span className="prompt">{l.p}</span>
          <span className="text-paper/85">
            {l.t}
            {i === out.length - 1 && l.t.length < LINES[i].t.length ? (
              <span className="tw-caret" aria-hidden>
                &nbsp;
              </span>
            ) : null}
          </span>
        </div>
      ))}
    </div>
  );
}
