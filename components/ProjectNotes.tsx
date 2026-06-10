"use client";

import { Reveal } from "@/components/Reveal";
import type { ProjectNote } from "@/lib/content";

const TILTS = [-2.6, 1.9, -1.3, 2.5, -2.1, 1.2];

/**
 * The handwritten notes that spill out of a project entry — quick glances
 * (tech stack / architecture / what it does / what it is / fun fact) on small
 * tilted paper notes with a pencil resting beside them. Notes straighten and
 * lift on hover. Reveal handles scroll-in + reduced-motion.
 */
export default function ProjectNotes({ notes }: { notes: ProjectNote[] }) {
  return (
    <div className="pnotes" aria-label="Quick notes about this project">
      {notes.map((n, i) => (
        <Reveal key={n.tag} delay={i * 0.07} y={18} className="pnote-wrap">
          <article
            className="pnote"
            style={{ ["--n-tilt" as string]: `${TILTS[i % TILTS.length]}deg` }}
          >
            <span aria-hidden className="pnote__tape" />
            <span className="pnote__tag">{n.tag}</span>
            <p className="pnote__text">{n.text}</p>
          </article>
        </Reveal>
      ))}
      {/* pencil resting on the notes */}
      <svg className="pnotes__pencil" viewBox="0 0 120 18" aria-hidden width="120" height="18">
        <g transform="rotate(-4 60 9)">
          <rect x="14" y="6" width="86" height="7" rx="1.6" fill="#e8b84b" stroke="#1b1a17" strokeWidth="1" />
          <rect x="14" y="6" width="86" height="2.4" fill="#f4d27a" />
          <path d="M14 9.5 L4 9.5 L14 6 L14 13 Z" fill="#e8d6b0" stroke="#1b1a17" strokeWidth="1" strokeLinejoin="round" />
          <path d="M7 9.5 L4 9.5 L7 8 Z" fill="#1b1a17" />
          <rect x="100" y="6" width="8" height="7" rx="1.4" fill="#d64324" stroke="#1b1a17" strokeWidth="1" />
          <rect x="108" y="6.6" width="4" height="5.8" rx="1.8" fill="#cfc8b8" stroke="#1b1a17" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}
