"use client";
/**
 * Minimal vector illustrations in the RECONNECT language:
 * flat shapes, botanical motifs, no realistic figures.
 */

type IllustrationProps = { className?: string };

function Person({
  x,
  bodyClass,
  headClass,
}: {
  x: number;
  bodyClass: string;
  headClass: string;
}) {
  return (
    <g>
      <circle cx={x} cy={26} r={9} className={headClass} />
      <path d={`M${x - 15} 64c0-9 6.7-16 15-16s15 7 15 16v6h-30z`} className={bodyClass} />
    </g>
  );
}

function Sprig({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M0 34V6" className="stroke-sage" strokeWidth="2" strokeLinecap="round" />
      <path d="M0 14c-9-1-12-8-12-8s9-2 12 8z" className="fill-sage/60" />
      <path d="M0 24c9-1 12-8 12-8s-9-2-12 8z" className="fill-sage/40" />
    </g>
  );
}

export function GroupSessionIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 220 80" className={className} role="img" aria-label="A small group in conversation">
      <ellipse cx="110" cy="74" rx="86" ry="6" className="fill-sage/15" />
      <Person x={52} bodyClass="fill-forest/85" headClass="fill-foreground/80" />
      <Person x={110} bodyClass="fill-sage" headClass="fill-foreground/80" />
      <Person x={166} bodyClass="fill-forest/60" headClass="fill-foreground/80" />
      <Sprig x={202} y={36} scale={0.9} />
    </svg>
  );
}

export function PeerGroupIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 220 80" className={className} role="img" aria-label="Three people talking around a table">
      <Person x={54} bodyClass="fill-terracotta/70" headClass="fill-foreground/80" />
      <Person x={112} bodyClass="fill-forest/80" headClass="fill-foreground/80" />
      <Person x={168} bodyClass="fill-peach" headClass="fill-foreground/80" />
      <rect x="26" y="62" width="170" height="7" rx="3.5" className="fill-sage/35" />
      <Sprig x={206} y={38} scale={0.8} />
    </svg>
  );
}

export function ProgramIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 220 80" className={className} role="img" aria-label="A checklist beside leaves">
      <ellipse cx="110" cy="74" rx="76" ry="6" className="fill-sage/15" />
      <rect x="78" y="10" width="64" height="60" rx="7" className="fill-cream stroke-border" strokeWidth="1.5" />
      <rect x="98" y="5" width="24" height="9" rx="4.5" className="fill-sage/60" />
      {[24, 38, 52].map((y) => (
        <g key={y}>
          <rect x="88" y={y - 5} width="10" height="10" rx="3" className="fill-sage/25" />
          <path
            d={`M90.5 ${y} l2.5 2.5 l5 -5.5`}
            className="stroke-forest"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
          <rect x="104" y={y - 2} width="28" height="4" rx="2" className="fill-foreground/15" />
        </g>
      ))}
      <Sprig x={158} y={34} />
      <Sprig x={58} y={40} scale={0.7} />
    </svg>
  );
}

export function CoursesIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 220 80" className={className} role="img" aria-label="A stack of books with a small plant">
      <ellipse cx="110" cy="74" rx="76" ry="6" className="fill-sage/15" />
      <rect x="52" y="56" width="104" height="13" rx="4" className="fill-peach" />
      <rect x="60" y="43" width="92" height="13" rx="4" className="fill-terracotta/45" />
      <rect x="68" y="30" width="78" height="13" rx="4" className="fill-sage/45" />
      <rect x="160" y="46" width="26" height="23" rx="4" className="fill-terracotta/25" />
      <Sprig x={173} y={16} scale={0.9} />
    </svg>
  );
}

export function SupportBannerIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 90" className={className} role="img" aria-label="A potted plant on a saucer">
      <path d="M42 58h36l-5 24H47z" className="fill-terracotta/30" />
      <rect x="36" y="52" width="48" height="8" rx="4" className="fill-terracotta/45" />
      <Sprig x={60} y={18} scale={1.1} />
      <path d="M60 30c-12-2-16-11-16-11s12-3 16 11z" className="fill-sage/50" />
      <path d="M60 42c12-2 16-11 16-11s-12-3-16 11z" className="fill-sage/35" />
    </svg>
  );
}
