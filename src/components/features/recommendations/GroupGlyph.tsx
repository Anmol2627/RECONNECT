"use client";
/** Minimal flat-vector group motif: three people connected by soft lines. */
export function GroupGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 140"
      role="img"
      aria-label="Illustration of three people in a supportive group"
      className={className}
    >
      <circle cx="100" cy="70" r="62" fill="var(--sage-soft)" opacity="0.7" />
      <g stroke="var(--sage)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7">
        <path d="M62 84 L100 52" />
        <path d="M138 84 L100 52" />
        <path d="M62 84 L138 84" strokeDasharray="4 6" />
      </g>
      {[
        { x: 100, y: 46 },
        { x: 60, y: 88 },
        { x: 140, y: 88 },
      ].map((p) => (
        <g key={`${p.x}-${p.y}`} fill="var(--forest)">
          <circle cx={p.x} cy={p.y - 9} r="7.5" />
          <path
            d={`M${p.x - 13} ${p.y + 14} a13 13 0 0 1 26 0 z`}
            fill="var(--forest)"
          />
        </g>
      ))}
      <path
        d="M150 34 q10 -12 22 -6 q-4 14 -22 6 z"
        fill="var(--peach)"
      />
      <circle cx="46" cy="40" r="4" fill="var(--peach)" />
    </svg>
  );
}
