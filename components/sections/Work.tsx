import { SectionShell, FieldLabel, Tag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import InkText from "@/components/InkText";
import { projects } from "@/lib/content";
import TypedSignal from "@/components/TypedSignal";

/**
 * Field Note 03 — Work.
 *
 * Projects are journal entries (not cards): a big muted index numeral + meta in
 * a narrow rail, prose in a wide column, rails alternating sides so the page
 * reads asymmetrically. Notes are set as editorial signal rows instead of
 * cards, so the work stays dense, scannable, and motion-led.
 */
export default function Work() {
  return (
    <SectionShell id="work" className="py-24 sm:py-32">
      <FieldLabel>Field Note 03 — Work</FieldLabel>
      <TypedSignal text="selected systems // newest first" className="mb-10" />

      <Reveal>
        <p className="display-md measure-tight text-ink">
          A handful of systems I designed, shipped, and left running on their
          own. Selected entries — newest first.
        </p>
      </Reveal>

      <ol className="mt-16 sm:mt-24">
        {projects.map((p, i) => {
          const index = String(i + 1).padStart(2, "0");
          const railRight = i % 2 === 1;

          return (
            <li key={p.title}>
              {i > 0 && <hr className="rule my-16 border-0 sm:my-24" />}

              <article className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-12">
                {/* ── narrow rail: index + year + stamp ── */}
                <div
                  className={[
                    "lg:col-span-4",
                    railRight ? "lg:order-2 lg:col-start-9" : "lg:order-1",
                  ].join(" ")}
                >
                  <Reveal>
                    <div className="flex items-baseline gap-4 lg:flex-col lg:items-start lg:gap-3">
                      <span
                        aria-hidden
                        className="font-display text-6xl font-bold leading-none tracking-tight text-rule sm:text-7xl"
                      >
                        {index}
                      </span>
                      <span className="font-mono text-sm tracking-wide text-muted">{p.year}</span>
                      <span className={`pstamp pstamp--${p.stamp.toLowerCase()}`}>{p.stamp}</span>
                    </div>
                  </Reveal>
                </div>

                {/* ── wide column: title, prose, outcome, stack, link, notes ── */}
                <div
                  className={[
                    "lg:col-span-8",
                    railRight ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-5",
                  ].join(" ")}
                >
                  <InkText as="h3" className="display-md text-ink" text={p.title} />

                  <Reveal delay={0.05}>
                    <p className="measure mt-5 text-base leading-relaxed text-muted">{p.blurb}</p>
                  </Reveal>

                  {p.outcome && (
                    <Reveal delay={0.08}>
                      <p className="measure mt-5 flex gap-3 text-signal">
                        <span aria-hidden className="mt-2.5 h-px w-6 shrink-0 bg-signal" />
                        <span className="font-display text-lg leading-snug font-medium">
                          {p.outcome}
                        </span>
                      </p>
                    </Reveal>
                  )}

                  <Reveal delay={0.1}>
                    <div className="mt-7 flex flex-wrap gap-2">
                      {p.stack.map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                    </div>
                  </Reveal>

                  {p.href && (
                    <Reveal delay={0.12}>
                      <p className="mt-7">
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-signal font-mono text-sm tracking-wide"
                        >
                          {p.hrefLabel || "View"} →
                        </a>
                      </p>
                    </Reveal>
                  )}

                  <Reveal delay={0.16}>
                    <dl className="mt-9 grid gap-x-8 gap-y-4 border-y border-rule py-6 sm:grid-cols-2">
                      {p.notes.map((note) => (
                        <div
                          key={note.tag}
                          className="grid gap-1 border-t border-rule/60 pt-3 first:border-t-0 first:pt-0 sm:first:border-t sm:first:pt-3"
                        >
                          <dt className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-signal">
                            {note.tag}
                          </dt>
                          <dd className="text-[0.92rem] leading-relaxed text-ink/80">
                            {note.text}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </Reveal>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </SectionShell>
  );
}
