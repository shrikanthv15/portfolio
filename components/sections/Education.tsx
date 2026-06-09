import { SectionShell, FieldLabel } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import Kinetic from "@/components/Kinetic";
import { education, achievements } from "@/lib/content";

/**
 * Field Note 05 — Foundations.
 * The schooling as a printed-CV ledger: hairline-ruled rows, offset two
 * columns (mono metadata left, expressive degree right), then a compact
 * mono achievements list. Asymmetric and quiet — not a card grid.
 */
export default function Education() {
  return (
    <SectionShell id="education" className="py-24 sm:py-32">
      <FieldLabel>FIELD NOTE 05 — FOUNDATIONS</FieldLabel>

      <Kinetic as="h2" className="display-lg max-w-[18ch]">
        Where the <span className="text-signal">groundwork</span> was laid.
      </Kinetic>

      {/* The ledger */}
      <div className="mt-14 sm:mt-20">
        {education.map((entry, i) => (
          <Reveal key={entry.school} delay={i * 0.05}>
            <article className="rule grid grid-cols-1 gap-3 py-8 sm:grid-cols-12 sm:gap-8 sm:py-10">
              {/* left rail — printed metadata */}
              <div className="font-mono text-[0.78rem] leading-relaxed text-muted sm:col-span-4 sm:pt-2">
                <div className="tabular-nums">{entry.period}</div>
                <div className="mt-1">{entry.place}</div>
                {entry.gpa ? (
                  <div className="mt-3 tabular-nums">
                    <span className="text-muted/70">GPA </span>
                    <span className="text-signal">{entry.gpa}</span>
                  </div>
                ) : null}
              </div>

              {/* right — the credential */}
              <div className="sm:col-span-8">
                <h3 className="display-md text-balance">{entry.degree}</h3>
                <p className="measure mt-2 text-[1.05rem] text-ink/80">
                  {entry.school}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
        <div className="rule" aria-hidden />
      </div>

      {/* Achievements — a quiet mono list, marked not pilled */}
      <Reveal delay={education.length * 0.05} className="mt-16 sm:mt-24">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-12">
          <p className="eyebrow sm:col-span-4 sm:pt-1">Marginalia · Honors</p>
          <ul className="space-y-3 sm:col-span-8">
            {achievements.map((item) => (
              <li
                key={item}
                className="flex items-baseline gap-3 font-mono text-[0.85rem] leading-relaxed text-muted"
              >
                <span aria-hidden className="select-none text-signal">
                  ✦
                </span>
                <span className="text-ink/85">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </SectionShell>
  );
}
