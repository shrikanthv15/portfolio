import { profile } from "@/lib/content";
import { SectionShell, FieldLabel } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export default function Colophon() {
  return (
    <SectionShell id="contact" className="py-28 sm:py-36">
      <FieldLabel>Colophon — Get in touch</FieldLabel>

      <Reveal>
        <h2 className="display-lg max-w-[16ch]">
          Let&apos;s build something that{" "}
          <span className="text-signal">runs itself.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-lg">
        <a href={`mailto:${profile.email}`} className="link-signal">
          {profile.email}
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-signal">
          GitHub <span aria-hidden>↗</span>
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link-signal">
          LinkedIn <span aria-hidden>↗</span>
        </a>
        <a href={profile.resumeUrl} className="link-signal">
          Résumé <span aria-hidden>↓</span>
        </a>
      </Reveal>

      <div className="rule mt-24 flex flex-wrap items-end justify-between gap-6 pt-8 font-mono text-sm text-muted">
        <p className="max-w-md leading-relaxed">
          Set in Bricolage Grotesque &amp; Geist Mono. Built with Next.js, deployed on
          Vercel. Agents helped build this — that&apos;s the point. See Field Note 02.
        </p>
        <p className="text-muted/70">
          psst — type <span className="text-signal">kratos</span>
        </p>
      </div>
    </SectionShell>
  );
}
