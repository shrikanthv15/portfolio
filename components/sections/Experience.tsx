import { SectionShell, FieldLabel, Tag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { experience } from "@/lib/content";
import CountUp from "@/components/CountUp";
import TypedSignal from "@/components/TypedSignal";

// Measured outcomes pulled from the résumé — the numbers tick up on scroll.
const STATS: { value: number; prefix?: string; suffix: string; label: string }[] = [
  { value: 87.5, suffix: "%", label: "release-advisor accuracy, zero false-ready" },
  { value: 33, suffix: "", label: "business flows on one approval ladder" },
  { value: 35, suffix: "%", label: "faster clinical review" },
  { value: 90, suffix: "%+", label: "queries resolved autonomously" },
];

/**
 * Field Note 04 — Track record.
 *
 * An editorial timeline, not a card grid: every role hangs off a single
 * vertical hairline, marked by a small vermilion node. Mono metadata sits
 * above an expressive display org name, with highlights set as a tight,
 * quietly-marked list and the stack rendered as restrained mono chips.
 */
export default function Experience() {
  return (
    <SectionShell id="experience" className="py-24 sm:py-32">
      <FieldLabel>FIELD NOTE 04 — TRACK RECORD</FieldLabel>
      <TypedSignal text="outcomes verified // roles and rooms" className="mb-10" />

      <Reveal>
        <p className="measure font-display text-2xl leading-snug text-ink sm:text-3xl">
          Where the agents went to work — production systems shipped, not
          slideware.{" "}
          <span className="text-muted">A few of the rooms I&apos;ve built in.</span>
        </p>
      </Reveal>

      {/* measured outcomes — numerals count up on first view */}
      <Reveal delay={0.1}>
        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-y border-rule py-8 sm:mt-14 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <dd className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </dd>
              <dt className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* The hairline. Entries hang off it; the dot marks each one. */}
      <ol className="mt-16 border-l border-rule sm:mt-20">
        {experience.map((job, i) => (
          <li key={`${job.org}-${job.period}`} className="relative">
            <Reveal delay={i * 0.06}>
              <article
                className={[
                  "relative pl-8 sm:pl-12",
                  i === 0 ? "" : "pt-16 sm:pt-20",
                ].join(" ")}
              >
                {/* signal node sitting on the rule */}
                <span
                  aria-hidden
                  className={[
                    "absolute left-0 block h-2.5 w-2.5 -translate-x-1/2 rounded-full",
                    "bg-signal ring-4 ring-paper",
                    i === 0 ? "top-[0.55rem]" : "top-[4.55rem] sm:top-[5.55rem]",
                  ].join(" ")}
                />

                <p className="eyebrow !tracking-[0.18em] text-muted">
                  {job.period}
                </p>

                <h3 className="display-md mt-3 text-ink">{job.org}</h3>

                <p className="mt-2 font-mono text-sm text-muted">
                  {job.role}
                  <span aria-hidden className="px-2 text-rule">
                    ·
                  </span>
                  {job.place}
                </p>

                <p className="measure mt-5 text-base leading-relaxed text-ink/90">
                  {job.detail}
                </p>

                {job.highlights && job.highlights.length > 0 && (
                  <ul className="measure mt-6 space-y-3">
                    {job.highlights.map((h, hi) => (
                      <li
                        key={hi}
                        className="relative pl-5 text-[0.95rem] leading-relaxed text-muted"
                      >
                        <span
                          aria-hidden
                          className="absolute left-0 top-[0.6em] block h-px w-2.5 bg-signal/70"
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                {job.stack && job.stack.length > 0 && (
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {job.stack.map((tech) => (
                      <li key={tech}>
                        <Tag>{tech}</Tag>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
