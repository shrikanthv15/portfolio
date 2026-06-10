import { SectionShell, FieldLabel } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import ProjectCards from "@/components/ProjectCards";

/**
 * Field Note 03 — Work: the card file.
 *
 * Six index cards dealt out of the journal's card file — each one a shipped
 * system. Fronts carry the hook; flip a card for the detail, outcome, and
 * link. The deal-out, tilt, and 3D flip live in ProjectCards; content lives
 * in lib/content.ts (projectCards).
 */
export default function Work() {
  return (
    <SectionShell id="work" className="py-24 sm:py-32">
      <FieldLabel>Field Note 03 — Work</FieldLabel>

      <Reveal>
        <p className="display-md measure-tight text-ink">
          The card file — six systems I designed, shipped, and left running on
          their own.
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="mt-4 font-mono text-sm text-muted">
          <span className="text-signal">▸</span> pull a card · flip it for the verso
        </p>
      </Reveal>

      <ProjectCards />
    </SectionShell>
  );
}
