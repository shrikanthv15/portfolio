/**
 * Inkling — the SVG doodle character (pure markup, no logic). The engine in
 * Mascot.tsx drives it: it translates `.pupil` groups to track the cursor,
 * scales `.eye` groups to blink, and toggles `data-pose` on the root for poses.
 * Re-skin the character entirely by editing this one file.
 */
export default function MascotSprite() {
  return (
    <svg
      className="ink-sprite"
      viewBox="0 0 60 60"
      width="60"
      height="60"
      fill="none"
      aria-hidden
    >
      {/* soft contact shadow */}
      <ellipse className="ink-shadow" cx="30" cy="55" rx="15" ry="3.2" fill="#1b1a17" opacity="0.14" />

      {/* legs */}
      <g className="ink-legs" stroke="#1b1a17" strokeWidth="3" strokeLinecap="round">
        <line x1="24" y1="48" x2="22" y2="55" />
        <line x1="36" y1="48" x2="38" y2="55" />
      </g>

      {/* held pencil (the "noting things down" tell) — vermilion */}
      <g className="ink-pencil">
        <line x1="44" y1="34" x2="55" y2="26" stroke="#d64324" strokeWidth="3" strokeLinecap="round" />
        <path d="M55 26 l2.6 -1.9 -1 3.1 z" fill="#1b1a17" />
      </g>

      {/* body — a hand-drawn ink blob */}
      <path
        className="ink-body"
        d="M30 9
           C18 9 12 18 12 30
           C12 43 19 51 30 51
           C41 51 48 43 48 30
           C48 18 42 9 30 9 Z"
        fill="#1b1a17"
      />

      {/* antenna tuft */}
      <path className="ink-tuft" d="M30 9 C29 4 31 3 33 2" stroke="#d64324" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="33" cy="2" r="2.1" fill="#d64324" />

      {/* left arm (rests / waves via pose) */}
      <line className="ink-arm-l" x1="16" y1="33" x2="9" y2="38" stroke="#1b1a17" strokeWidth="3" strokeLinecap="round" />

      {/* eyes — white sclera + ink pupils the engine moves. Outer <g> holds the
          SVG position; inner .eye-lid is what blink scales (so CSS can't clobber
          the translate). */}
      <g transform="translate(23 28)">
        <g className="eye-lid">
          <circle r="6.2" fill="#f4f1e9" />
          <g className="pupil">
            <circle r="3" fill="#1b1a17" />
            <circle cx="1.1" cy="-1.1" r="0.9" fill="#f4f1e9" />
          </g>
        </g>
      </g>
      <g transform="translate(38 28)">
        <g className="eye-lid">
          <circle r="6.2" fill="#f4f1e9" />
          <g className="pupil">
            <circle r="3" fill="#1b1a17" />
            <circle cx="1.1" cy="-1.1" r="0.9" fill="#f4f1e9" />
          </g>
        </g>
      </g>

      {/* mouth — tiny, friendly */}
      <path className="ink-mouth" d="M27 40 q3 2.6 6 0" stroke="#f4f1e9" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}
