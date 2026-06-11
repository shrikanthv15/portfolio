"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { profile, about } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import Kinetic from "@/components/Kinetic";
import Typewriter from "@/components/Typewriter";
import HeartbeatPill from "@/components/HeartbeatPill";

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Apple-style scroll-scrubbed zoom: the hero scales up & fades as you scroll
  // past it, revealing the next chapter underneath. Sticky inner = no GSAP pin.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.32]);
  const opacity = useTransform(scrollYProgress, [0, 0.62], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const zoomStyle = reduce ? undefined : { scale, opacity };

  return (
    <section id="top" ref={ref} className="relative h-[160vh]">
      <div className="sticky top-0 flex h-dvh flex-col justify-between overflow-hidden px-6 pb-10 pt-32 sm:px-10 lg:px-16">
        {/* Static paper wash: no WebGL, canvas, or scroll-time shader work. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(120% 120% at 28% 18%, #f6f3ec 0%, #efe9dd 55%, #e6dfce 100%)",
          }}
        />

        <motion.div
          style={zoomStyle}
          className="will-zoom relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center"
        >
          {/* journal masthead */}
          <Reveal immediate>
            <div className="eyebrow flex flex-wrap items-center gap-x-4 gap-y-2">
              <span>Field Journal — Vol. 2026</span>
              <span aria-hidden className="hidden h-px w-8 bg-rule sm:inline-block" />
              <span>{profile.location}</span>
              <span aria-hidden className="hidden h-px w-8 bg-rule sm:inline-block" />
              <span>{profile.role}</span>
            </div>
          </Reveal>

          {/* wordmark — kinetic char reveal */}
          <h1 className="display-xl mt-8">
            <Kinetic as="span" className="block" text="Shrikanth" chars immediate />
            <Kinetic
              as="span"
              className="block text-signal"
              text="Vilvadrinath"
              chars
              immediate
              delay={0.08}
            />
          </h1>

          {/* thesis */}
          <Reveal delay={0.34} className="mt-9 max-w-2xl" immediate>
            <p className="font-display text-2xl leading-[1.15] sm:text-[2rem]">
              An AI built this site. <span className="text-muted">I built the AI.</span>
            </p>
          </Reveal>

          {/* rotating typewriter identity line — the one deliberate typing moment */}
          <Reveal delay={0.42} className="mt-5" immediate>
            <p className="font-mono text-sm text-muted sm:text-[0.95rem]">
              <span className="text-signal">▸</span> currently building{" "}
              <Typewriter
                className="text-ink"
                phrases={[
                  "agentic mortgage systems",
                  "multi-agent pipelines",
                  "production AI, not demos",
                  "things that ship while I sleep",
                ]}
              />
            </p>
          </Reveal>

          <Reveal delay={0.5} className="measure mt-6" immediate>
            <p className="text-lg text-muted">{about.lede}</p>
          </Reveal>

          <Reveal
            delay={0.54}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4"
            immediate
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
            >
              See the work
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href={profile.resumeUrl}
              className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-6 py-3 text-sm font-medium transition-colors hover:border-ink"
            >
              Résumé <span aria-hidden>↓</span>
            </a>
            <HeartbeatPill />
          </Reveal>
        </motion.div>

        {/* footer rail / scroll cue */}
        <motion.div
          style={reduce ? undefined : { opacity: cueOpacity }}
          className="relative z-10 mx-auto flex w-full max-w-6xl items-end justify-between"
        >
          <span className="eyebrow flex items-center gap-3">
            <span aria-hidden className="inline-block h-4 w-px animate-pulse bg-ink/50" />
            Scroll — Field Note 01
          </span>
          <span className="eyebrow hidden sm:block">N 38.99° · W 76.94°</span>
        </motion.div>
      </div>
    </section>
  );
}
