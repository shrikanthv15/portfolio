/**
 * KRATOS — a detailed companion robot (pure SVG; the engine + CSS drive it).
 * Design per research: chibi-credible proportions, single vermilion eye in a
 * dark visor (the "soul"), antenna, rim-light + spec highlight, warm-grey value
 * ramps, panel seams. Every articulable part is a named group so the engine /
 * CSS can pose it. Colors come from CSS vars (--k-*) so it's re-skinnable.
 *
 * Engine hooks (don't rename): `.pupil` (catchlight the engine moves toward the
 * cursor), `.eye-lid` (scaled to blink), `.ink-pose` host carries data-pose.
 */
export default function MascotSprite() {
  return (
    <svg className="ink-sprite" viewBox="0 0 120 140" width="120" height="140" fill="none" aria-hidden>
      <defs>
        <linearGradient id="kBody" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="var(--k-lit)" />
          <stop offset="0.55" stopColor="var(--k-mid)" />
          <stop offset="1" stopColor="var(--k-shadow)" />
        </linearGradient>
        <linearGradient id="kHead" x1="0.15" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="var(--k-lit)" />
          <stop offset="0.6" stopColor="var(--k-mid)" />
          <stop offset="1" stopColor="var(--k-shadow)" />
        </linearGradient>
        <radialGradient id="kEye" cx="0.4" cy="0.38" r="0.75">
          <stop offset="0" stopColor="#ff7a52" />
          <stop offset="0.55" stopColor="var(--k-accent)" />
          <stop offset="1" stopColor="#9e2c16" />
        </radialGradient>
        <clipPath id="kVisor">
          <rect x="38" y="40" width="44" height="26" rx="12" />
        </clipPath>
      </defs>

      {/* contact shadow */}
      <ellipse className="k-shadow" cx="60" cy="133" rx="26" ry="3.6" fill="var(--k-ink)" opacity="0.16" />

      {/* legs */}
      <g className="k-legs" stroke="var(--k-ink)" strokeWidth="2">
        <rect x="44" y="104" width="11" height="16" rx="5" fill="url(#kBody)" />
        <rect x="65" y="104" width="11" height="16" rx="5" fill="url(#kBody)" />
        <ellipse cx="49.5" cy="121" rx="8" ry="3.4" fill="var(--k-ink)" />
        <ellipse cx="70.5" cy="121" rx="8" ry="3.4" fill="var(--k-ink)" />
      </g>

      {/* arms (two-segment, resting) */}
      <g className="k-arm-l" stroke="var(--k-ink)" strokeWidth="2" strokeLinejoin="round">
        <path d="M40 78 q-10 4 -11 16" fill="none" strokeWidth="6" strokeLinecap="round" stroke="url(#kBody)" />
        <path d="M40 78 q-10 4 -11 16" fill="none" />
        <circle cx="29" cy="95" r="4.2" fill="url(#kBody)" />
      </g>
      <g className="k-arm-r" stroke="var(--k-ink)" strokeWidth="2" strokeLinejoin="round">
        <path d="M80 78 q10 4 11 16" fill="none" strokeWidth="6" strokeLinecap="round" stroke="url(#kBody)" />
        <path d="M80 78 q10 4 11 16" fill="none" />
        <circle cx="91" cy="95" r="4.2" fill="url(#kBody)" />
      </g>

      {/* torso / chassis */}
      <g className="k-torso">
        <rect x="36" y="66" width="48" height="44" rx="15" fill="url(#kBody)" stroke="var(--k-ink)" strokeWidth="2.5" />
        {/* chest seam + status dot (the only body accent) */}
        <path d="M48 78 h24" stroke="var(--k-ink)" strokeWidth="1.4" opacity="0.45" strokeLinecap="round" />
        <circle cx="60" cy="92" r="3.4" fill="var(--k-accent)" />
        <circle cx="60" cy="92" r="3.4" fill="none" stroke="var(--k-ink)" strokeWidth="1" opacity="0.4" />
        {/* rim light */}
        <path d="M40 70 q-2 8 0 18" stroke="var(--k-rim)" strokeWidth="1.6" opacity="0.45" fill="none" strokeLinecap="round" />
      </g>

      {/* head */}
      <g className="k-head">
        <rect x="30" y="16" width="60" height="52" rx="22" fill="url(#kHead)" stroke="var(--k-ink)" strokeWidth="2.5" />
        {/* rim light + spec */}
        <path d="M37 24 q-3 10 0 24" stroke="var(--k-rim)" strokeWidth="1.8" opacity="0.5" fill="none" strokeLinecap="round" />
        <ellipse className="k-spec" cx="46" cy="27" rx="6" ry="3.4" fill="var(--k-rim)" opacity="0.5" />

        {/* visor cavity */}
        <rect x="38" y="40" width="44" height="26" rx="12" fill="var(--k-ink)" />
        {/* scanline (clipped to visor) */}
        <g clipPath="url(#kVisor)">
          <rect className="k-scanline" x="38" y="40" width="44" height="2.4" fill="var(--k-accent)" opacity="0.5" />
        </g>

        {/* the eye — the soul */}
        <g className="eye-lid">
          <ellipse cx="60" cy="53" rx="10.5" ry="9" fill="url(#kEye)" />
          <g className="pupil">
            <circle cx="60" cy="53" r="3.2" fill="#7a1f10" opacity="0.65" />
            <circle cx="56.6" cy="49.6" r="2.4" fill="#fff6ee" opacity="0.92" />
          </g>
        </g>
      </g>

      {/* antenna */}
      <g className="k-antenna">
        <line x1="60" y1="16" x2="60" y2="6" stroke="var(--k-ink)" strokeWidth="2.4" strokeLinecap="round" />
        <circle className="k-antenna-tip" cx="60" cy="5" r="3.2" fill="var(--k-accent)" stroke="var(--k-ink)" strokeWidth="0.8" />
      </g>
    </svg>
  );
}
