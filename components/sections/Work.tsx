import { SectionShell, FieldLabel, Tag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/content";

/**
 * Field Note 03 — Work.
 *
 * Each project is set as a journal entry rather than a uniform card:
 * a big muted index numeral and the meta live in a narrow left rail,
 * the prose runs in a wide column. Entries alternate their rail side on
 * larger screens so the page reads asymmetrically, like turning pages of
 * a field notebook. Hairline rules and generous vertical space separate them.
 */
export default function Work() {
  return (
    <SectionShell id="work" className="py-24 sm:py-32">
      <FieldLabel>Field Note 03 — Work</FieldLabel>

      <Reveal>
        <p className="display-md measure-tight text-ink">
          A handful of systems I designed, shipped, and left running on their
          own. Selected entries — newest first.
        </p>
      </Reveal>

      <ol className="mt-16 sm:mt-24">
        {projects.map((p, i) => {
          const index = String(i + 1).padStart(2, "0");
          // Alternate the rail to the right on every other entry (lg+).
          const railRight = i % 2 === 1;

          return (
            <li key={p.title}>
              {/* hairline between entries, never above the first */}
              {i > 0 && <hr className="rule my-16 border-0 sm:my-24" />}

              <Reveal delay={i * 0.05}>
                <article className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-12">
                  {/* ── narrow rail: index + year ── */}
                  <div
                    className={[
                      "lg:col-span-4",
                      railRight ? "lg:order-2 lg:col-start-9" : "lg:order-1",
                    ].join(" ")}
                  >
                    <div className="flex items-baseline gap-4 lg:flex-col lg:items-start lg:gap-3">
                      <span
                        aria-hidden
                        className="font-display text-6xl font-extrabold leading-none tracking-tight text-rule sm:text-7xl"
                      >
                        {index}
                      </span>
                      <span className="font-mono text-sm tracking-wide text-muted">
                        {p.year}
                      </span>
                    </div>
                  </div>

                  {/* ── wide column: title, prose, outcome, stack, link ── */}
                  <div
                    className={[
                      "lg:col-span-7",
                      railRight
                        ? "lg:order-1 lg:col-start-1"
                        : "lg:order-2 lg:col-start-6",
                    ].join(" ")}
                  >
                    <h3 className="display-md text-ink">{p.title}</h3>

                    <p className="measure mt-5 text-base leading-relaxed text-muted">
                      {p.blurb}
                    </p>

                    {p.outcome && (
                      <p className="measure mt-5 flex gap-3 text-signal">
                        <span
                          aria-hidden
                          className="mt-2.5 h-px w-6 shrink-0 bg-signal"
                        />
                        <span className="font-display text-lg leading-snug font-medium">
                          {p.outcome}
                        </span>
                      </p>
                    )}

                    <div className="mt-7 flex flex-wrap gap-2">
                      {p.stack.map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                    </div>

                    {p.href && (
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
                    )}
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </SectionShell>
  );
}
