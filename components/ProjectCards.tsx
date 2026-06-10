"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { projectCards, type ProjectCard } from "@/lib/content";

/**
 * Field Note 03 — the card file.
 *
 * Six index cards "dealt" out of a stack as the section scrolls into view:
 * each card starts piled at the grid's centre (slight random rotation, like a
 * deck dropped on a desk) and flies to its slot with the premium expo curve.
 * Click/Enter flips a card in 3D to read its back. Cards keep a tiny hand-laid
 * tilt (--tilt) that straightens on hover. Reduced-motion: no deal, no tilt,
 * flip is instant (global reduced-motion CSS zeroes the transition).
 */
export default function ProjectCards() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const grid = gridRef.current;
      if (!grid) return;
      const cards = gsap.utils.toArray<HTMLElement>(grid.querySelectorAll(".pcard"));
      if (!cards.length) return;

      const cleanupFns: (() => void)[] = [];

      const deal = () => {
        const g = grid.getBoundingClientRect();
        // deck origin: top-centre of the grid, like cards lifted off the pile
        const originX = g.left + g.width / 2;
        const originY = g.top + 60;

        const tween = gsap.from(cards, {
          x: (i, el) => {
            const r = (el as HTMLElement).getBoundingClientRect();
            return originX - (r.left + r.width / 2);
          },
          y: (i, el) => {
            const r = (el as HTMLElement).getBoundingClientRect();
            return originY - (r.top + r.height / 2);
          },
          rotation: () => gsap.utils.random(-9, 9),
          opacity: 0,
          scale: 0.92,
          duration: 1.05,
          ease: "expo.out",
          stagger: 0.085,
          clearProps: "x,y,rotation,opacity,scale",
          scrollTrigger: { trigger: grid, start: "top 78%", once: true },
        });

        // Safety net: rAF AND scroll events are both suspended in hidden /
        // throttled tabs, so poll with a timer (timers still run). Once the
        // grid is near the viewport, give the deal 2.6s, then force-complete
        // it so cards can never get stuck invisible.
        const poll = window.setInterval(() => {
          const r = grid.getBoundingClientRect();
          if (r.top < window.innerHeight * 0.95) {
            window.clearInterval(poll);
            window.setTimeout(() => {
              if (tween.progress() < 1) {
                tween.progress(1);
                gsap.set(cards, { clearProps: "x,y,rotation,opacity,scale" });
              }
            }, 2600);
          }
        }, 700);
        cleanupFns.push(() => window.clearInterval(poll));
      };

      // measure after fonts settle so grid positions are final
      if (document.fonts?.ready) document.fonts.ready.then(deal);
      else deal();

      // velocity skew — the grid leans with scroll speed, then settles
      const proxy = { skew: 0 };
      const skewSetter = gsap.quickSetter(grid, "skewY", "deg");
      const clampSkew = gsap.utils.clamp(-1.3, 1.3);
      const st = ScrollTrigger.create({
        trigger: grid,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const skew = clampSkew(self.getVelocity() / -400);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.75,
              ease: "power3",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew),
            });
          }
        },
      });
      return () => {
        st.kill();
        cleanupFns.forEach((fn) => fn());
      };
    },
    { scope: gridRef }
  );

  return (
    <div ref={gridRef} className="pcard-grid mt-14 grid grid-cols-1 gap-6 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
      {projectCards.map((card, i) => (
        <Card key={card.no} card={card} index={i} />
      ))}
    </div>
  );
}

function Card({ card, index }: { card: ProjectCard; index: number }) {
  const [flipped, setFlipped] = useState(false);
  // alternating hand-laid tilt, a touch stronger toward the edges
  const tilt = [(index % 3) - 1][0] * 0.9 + (index % 2 === 0 ? -0.4 : 0.5);

  const toggle = () => setFlipped((f) => !f);

  return (
    <div
      className={["pcard", flipped ? "is-flipped" : ""].join(" ")}
      style={{ ["--tilt" as string]: `${tilt}deg` }}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${card.title} — index card ${card.no}. ${flipped ? "Showing details; press to flip back" : "Press to flip for details"}`}
      data-cursor
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <div className="pcard__inner">
        {/* ── FRONT ── */}
        <div className="pcard__face pcard__front">
          <span aria-hidden className="pcard__tape" />
          <div className="flex items-start justify-between">
            <span className="font-mono text-[0.66rem] tracking-[0.18em] text-muted">
              CARD {card.no} / 06
            </span>
            <span className="font-mono text-[0.66rem] tracking-[0.14em] text-muted">{card.year}</span>
          </div>
          <h3 className="mt-5 font-display text-[1.45rem] font-bold leading-[1.08] tracking-tight text-ink">
            {card.title}
          </h3>
          <p className="mt-3 text-[0.92rem] leading-relaxed text-muted">{card.face}</p>
          <div className="mt-auto flex items-end justify-between gap-3 pt-5">
            <p className="font-mono text-[0.64rem] leading-relaxed text-muted/80">
              {card.stack.slice(0, 4).join(" · ")}
            </p>
            <span className="pcard__hint font-mono text-[0.64rem] text-signal" aria-hidden>
              flip ↻
            </span>
          </div>
        </div>

        {/* ── BACK ── */}
        <div className="pcard__face pcard__back">
          <span aria-hidden className={`pcard__stamp pcard__stamp--${card.stamp.toLowerCase()}`}>
            {card.stamp}
          </span>
          <span className="font-mono text-[0.66rem] tracking-[0.18em] text-muted">
            CARD {card.no} — VERSO
          </span>
          <p className="mt-4 text-[0.85rem] leading-relaxed text-ink/85">{card.back}</p>
          {card.outcome && (
            <p className="mt-3 flex gap-2 text-[0.82rem] font-medium leading-snug text-signal">
              <span aria-hidden className="mt-[0.55em] h-px w-4 shrink-0 bg-signal" />
              {card.outcome}
            </p>
          )}
          <div className="mt-auto flex items-end justify-between gap-3 pt-4">
            {card.href ? (
              <a
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-signal font-mono text-[0.7rem] tracking-wide"
                onClick={(e) => e.stopPropagation()}
              >
                {card.hrefLabel || "View"} ↗
              </a>
            ) : (
              <span className="font-mono text-[0.64rem] text-muted/70">client work — ask me about it</span>
            )}
            <span className="pcard__hint font-mono text-[0.64rem] text-muted" aria-hidden>
              ↻ back
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
