import { machine } from "@/lib/content";
import { SectionShell, FieldLabel } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import Kinetic from "@/components/Kinetic";
import AgentTerminal from "@/components/AgentTerminal";

export default function Machine() {
  return (
    <SectionShell id="machine" inverted className="py-28 sm:py-36">
      <FieldLabel inverted>Field Note 02 — The Machine</FieldLabel>

      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Kinetic as="h2" className="display-lg" text={machine.title} />
          <div className="mt-9 space-y-6">
            {machine.body.map((p, i) => (
              <Reveal key={i} delay={0.06 * i} className="measure">
                <p className="text-lg leading-relaxed text-paper/80">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
            {machine.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-signal text-paper"
              >
                {l.label} <span aria-hidden>↗</span>
              </a>
            ))}
          </Reveal>
        </div>

        {/* live agent roster */}
        <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
          <div className="rounded-xl border border-paper/15 p-6">
            <p className="eyebrow mb-5 flex items-center gap-2 text-paper/50">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              agent roster — live
            </p>
            <AgentTerminal />
            <p className="mt-6 border-t border-paper/10 pt-4 font-mono text-xs text-paper/40">
              A2A over Google ADK · brokered by OpenClaw · running on a DigitalOcean VPS
            </p>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
