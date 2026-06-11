import { about, profile } from "@/lib/content";
import { SectionShell, FieldLabel } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import TypedSignal from "@/components/TypedSignal";

export default function About() {
  const facts: [string, string][] = [
    ["Now", "AI Engineer"],
    ["Based", profile.location],
    ["Studying", "MS Data Science · UMD (4.0)"],
    ["Obsessed with", "agents that ship while I sleep"],
  ];

  return (
    <SectionShell id="who" className="py-24 sm:py-32">
      <FieldLabel>Field Note 01 — Who</FieldLabel>
      <TypedSignal text="profile loaded // production AI engineer" className="mb-10" />

      <div className="grid gap-12 lg:grid-cols-12">
        {/* main column */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="dropcap text-2xl leading-relaxed sm:text-[1.7rem] sm:leading-[1.5]">
              {about.body[0]}
            </p>
          </Reveal>
          {about.body.slice(1).map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.08} className="measure mt-6">
              <p className="text-lg text-muted">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.3} className="mt-8">
            <p className="font-display text-xl">— {profile.shortName}</p>
          </Reveal>
        </div>

        {/* field-note sidebar */}
        <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
          <dl className="rule space-y-4 pt-6 font-mono text-sm">
            {facts.map(([k, v]) => (
              <div key={k} className="flex flex-col gap-0.5">
                <dt className="eyebrow">{k}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </SectionShell>
  );
}
