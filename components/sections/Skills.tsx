import { Fragment } from "react";
import { SectionShell, FieldLabel } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { skills } from "@/lib/content";

/**
 * Field Note 06 — Toolkit.
 *
 * Set as the back-of-book index of a printed field journal rather than a card
 * grid or logo cloud. Each group is an offset two-column entry: the group name
 * as a mono uppercase label in a narrow left rail, the tools running as one
 * flowing, middot-separated line of large display type on the right. A few
 * load-bearing terms are inked in vermilion so the eye catches the signal
 * without the page dissolving into identical pills. Hairline rules and a lot
 * of air do the rest — the typography is the design.
 */

// Terms set in vermilion — the tools the rest of the portfolio is built on.
// A deliberate, fixed subset (no randomness — this is a Server Component).
const SIGNAL = new Set<string>([
  "TypeScript",
  "Python",
  "LangGraph",
  "Temporal.io",
  "OpenClaw",
  "MCP",
  "A2A Communication",
  "Next.js",
  "PyTorch",
  "Supabase",
]);

export default function Skills() {
  return (
    <SectionShell id="skills" className="py-24 sm:py-32">
      <FieldLabel>Field Note 06 — Toolkit</FieldLabel>

      <Reveal>
        <p className="display-md measure-tight text-ink">
          The instruments, indexed. What I reach for when a system has to ship
          and keep running without me.
        </p>
      </Reveal>

      <dl className="mt-16 sm:mt-24">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={i * 0.05}>
            {/* hairline between entries, never above the first */}
            {i > 0 && <hr className="rule my-10 border-0 sm:my-14" />}

            <div className="grid grid-cols-1 gap-x-12 gap-y-4 lg:grid-cols-12">
              {/* ── left rail: group name + count ── */}
              <dt className="lg:col-span-3">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  {group.group}
                </span>
                <span
                  aria-hidden
                  className="ml-3 font-mono text-xs tabular-nums text-rule lg:ml-0 lg:mt-2 lg:block"
                >
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </dt>

              {/* ── flowing index line ── */}
              <dd className="lg:col-span-9 lg:col-start-4">
                <p className="font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl">
                  {group.items.map((item, j) => (
                    <Fragment key={item}>
                      {j > 0 && (
                        <span aria-hidden className="mx-2.5 text-rule">
                          ·
                        </span>
                      )}
                      <span
                        className={
                          SIGNAL.has(item)
                            ? "text-signal"
                            : "text-ink transition-colors duration-300 hover:text-archival"
                        }
                      >
                        {item}
                      </span>
                    </Fragment>
                  ))}
                </p>
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </SectionShell>
  );
}
