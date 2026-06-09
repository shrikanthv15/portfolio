import { profile, about } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/Reveal";
import HeartbeatPill from "@/components/HeartbeatPill";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-dvh flex-col justify-between px-6 pb-10 pt-32 sm:px-10 lg:px-16"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center">
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

        {/* wordmark */}
        <h1 className="display-xl mt-8">
          <RevealWords text="Shrikanth" className="block" immediate />
          <RevealWords text="Vilvadrinath" className="block text-signal" delay={0.12} immediate />
        </h1>

        {/* thesis */}
        <Reveal delay={0.32} className="mt-9 max-w-2xl" immediate>
          <p className="font-display text-2xl leading-[1.15] sm:text-[2rem]">
            An AI built this site.{" "}
            <span className="text-muted">I built the AI.</span>
          </p>
        </Reveal>

        <Reveal delay={0.42} className="measure mt-6" immediate>
          <p className="text-lg text-muted">{about.lede}</p>
        </Reveal>

        <Reveal delay={0.52} className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4" immediate>
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
      </div>

      {/* footer rail / scroll cue */}
      <div className="mx-auto flex w-full max-w-6xl items-end justify-between">
        <span className="eyebrow flex items-center gap-3">
          <span aria-hidden className="inline-block h-4 w-px animate-pulse bg-ink/50" />
          Scroll — Field Note 01
        </span>
        <span className="eyebrow hidden sm:block">N 38.99° · W 76.94°</span>
      </div>
    </section>
  );
}
