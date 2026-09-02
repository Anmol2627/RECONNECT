"use client";
/**
 * Hand-drawn style SVG illustrations used across RECONNECT.
 * Purely decorative: every instance is aria-hidden.
 */

type Props = { className?: string };

export function PlantGrowthIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 320 220" fill="none" className={className} aria-hidden="true" focusable="false">
      <circle cx="238" cy="52" r="34" fill="var(--peach)" />
      <circle cx="196" cy="92" r="5" fill="var(--peach)" />
      <circle cx="272" cy="104" r="4" fill="var(--peach)" />
      <circle cx="150" cy="46" r="5" fill="var(--sage)" opacity="0.8" />
      <path
        d="M20 196c40-30 84-30 122-6 34 21 82 22 158-12v42H20z"
        fill="var(--sage-light)"
      />
      <path
        d="M56 200c46-38 108-40 158-14 26 14 62 16 86 8v18H56z"
        fill="var(--sage)"
        opacity="0.55"
      />
      <path d="M160 190V96" stroke="var(--forest)" strokeWidth="5" strokeLinecap="round" />
      <path
        d="M160 138c-6-30-30-46-58-46 2 32 26 52 58 52z"
        fill="var(--sage)"
      />
      <path
        d="M160 116c8-32 34-48 64-48-2 34-30 54-64 54z"
        fill="var(--forest)"
        opacity="0.85"
      />
      <path
        d="M160 96c0-24 12-42 30-52 6 24-6 46-30 56z"
        fill="var(--sage)"
        opacity="0.9"
      />
    </svg>
  );
}

export function NotesIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 220 170" fill="none" className={className} aria-hidden="true" focusable="false">
      <rect x="34" y="28" width="118" height="126" rx="12" fill="var(--peach)" opacity="0.75" />
      <rect x="46" y="18" width="118" height="126" rx="12" fill="#fff" stroke="var(--border)" strokeWidth="2" />
      <g stroke="var(--terracotta)" strokeWidth="5" strokeLinecap="round" opacity="0.75">
        <path d="M66 50h68" />
        <path d="M66 72h78" />
        <path d="M66 94h54" />
        <path d="M66 116h40" />
      </g>
      <path d="M160 132l38-70 16 9-38 70-19 7z" fill="var(--terracotta)" opacity="0.9" />
      <path d="M157 148l4-16 15 8z" fill="var(--forest-deep)" opacity="0.7" />
      <path d="M28 122c-14-8-20-24-16-40 18 2 30 16 30 34" fill="var(--sage)" opacity="0.85" />
      <path d="M40 118c10-12 26-16 40-10-8 16-26 22-42 16" fill="var(--sage-light)" />
    </svg>
  );
}

export function CalmPersonIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 160 150" fill="none" className={className} aria-hidden="true" focusable="false">
      <circle cx="92" cy="60" r="46" fill="var(--peach)" opacity="0.5" />
      <circle cx="80" cy="46" r="15" fill="var(--forest)" />
      <path d="M80 66c-22 0-36 18-36 40h72c0-22-14-40-36-40z" fill="var(--forest)" />
      <path d="M40 108c8-10 22-14 34-10-8 10-22 14-34 10z" fill="var(--sage)" opacity="0.8" />
      <path d="M120 108c-8-10-22-14-34-10 8 10 22 14 34 10z" fill="var(--sage)" opacity="0.8" />
      <path
        d="M80 84c-4-5-12-4-12 3 0 5 7 9 12 13 5-4 12-8 12-13 0-7-8-8-12-3z"
        fill="var(--cream)"
      />
      <rect x="30" y="118" width="100" height="8" rx="4" fill="var(--sage-light)" />
    </svg>
  );
}

export function SmallSproutIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 150 120" fill="none" className={className} aria-hidden="true" focusable="false">
      <path d="M6 104c30-24 62-24 92-4 16 11 34 12 50 6v14H6z" fill="var(--sage-light)" />
      <path d="M75 104V58" stroke="var(--forest)" strokeWidth="4" strokeLinecap="round" />
      <path d="M75 82c-6-20-22-30-42-30 2 22 20 34 42 34z" fill="var(--sage)" />
      <path d="M75 70c6-22 24-32 46-32-2 24-22 36-46 36z" fill="var(--forest)" opacity="0.8" />
      <circle cx="122" cy="30" r="14" fill="var(--peach)" />
    </svg>
  );
}

export function HandsHeartIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 140 120" fill="none" className={className} aria-hidden="true" focusable="false">
      <path
        d="M70 52c-8-13-30-10-30 8 0 14 18 25 30 34 12-9 30-20 30-34 0-18-22-21-30-8z"
        fill="var(--terracotta)"
      />
      <path
        d="M18 74c-6 14 4 30 22 34h60c18-4 28-20 22-34-4-8-14-8-18 2-4 10-14 16-34 16s-30-6-34-16c-4-10-14-10-18-2z"
        fill="var(--peach)"
      />
      <path d="M36 108h68" stroke="var(--terracotta)" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function SproutLogo({ className }: Props) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true" focusable="false">
      <path d="M16 28V13" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M16 17c-3-8-9-11-14-11 1 9 7 13 14 13z" fill="currentColor" opacity="0.65" />
      <path d="M16 14c2-8 8-12 14-12-1 9-7 14-14 14z" fill="currentColor" />
    </svg>
  );
}

export function BotanicalIllustration({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 180 140" aria-hidden="true" className={className} {...props}>
      <path d="M35 128c13-28 14-57 10-86" fill="none" stroke="currentColor" strokeWidth="3" className="text-reconnect-sage" />
      <path d="M44 76c-19-3-27-14-29-27 17 0 28 8 29 27ZM45 54c-1-20 7-31 18-39 6 16 1 30-18 39ZM45 96c16-5 26-2 37 8-14 8-26 6-37-8Z" className="fill-reconnect-sage-soft stroke-reconnect-sage" strokeWidth="2" />
      <path d="M117 128c-8-29-4-67 12-101" fill="none" stroke="currentColor" strokeWidth="3" className="text-reconnect-sage" />
      <path d="M124 66c-15-10-18-23-15-37 14 6 20 18 15 37ZM127 94c12-11 24-12 36-7-7 14-19 17-36 7ZM133 48c11-9 19-9 28-5-6 11-14 14-28 5Z" className="fill-reconnect-peach stroke-reconnect-sage" strokeWidth="2" />
      <path d="M20 129h143" fill="none" stroke="currentColor" strokeWidth="2" className="text-reconnect-border" />
    </svg>
  );
}

export function CourseIllustration({ type, className }: { type: "communication" | "digital" | "resume"; className?: string }) {
  if (type === "digital") {
    return (
      <svg viewBox="0 0 270 150" aria-hidden="true" className={className}>
        <path d="M17 132h235" className="stroke-reconnect-border" strokeWidth="2" />
        <path d="M69 111h112l-12-61H81l-12 61Z" className="fill-reconnect-cream stroke-reconnect-forest" strokeWidth="4" strokeLinejoin="round" />
        <path d="M57 112h136l-8 13H65l-8-13Z" className="fill-reconnect-sage-soft stroke-reconnect-forest" strokeWidth="3" />
        <rect x="93" y="62" width="65" height="37" rx="3" className="fill-reconnect-lavender stroke-reconnect-sage" strokeWidth="3" />
        <circle cx="111" cy="79" r="7" className="fill-reconnect-peach" />
        <path d="M126 73h21M126 82h17" className="stroke-reconnect-sage" strokeWidth="3" strokeLinecap="round" />
        <path d="M44 128V94M44 94c-9-4-15-12-14-23 12 1 18 9 14 23Zm0 7V81M44 98c10-9 18-10 26-5-4 11-13 15-26 5Z" className="fill-reconnect-sage-soft stroke-reconnect-sage" strokeWidth="2" />
        <path d="M195 123h32l-4-24h-24l-4 24Z" className="fill-reconnect-peach stroke-reconnect-sage" strokeWidth="2" />
        <path d="M201 99c-4-15 0-25 9-31 7 12 4 23-9 31Z" className="fill-reconnect-sage stroke-reconnect-sage" strokeWidth="2" />
      </svg>
    );
  }

  if (type === "resume") {
    return (
      <svg viewBox="0 0 270 150" aria-hidden="true" className={className}>
        <path d="M28 132h219" className="stroke-reconnect-border" strokeWidth="2" />
        <rect x="92" y="28" width="96" height="103" rx="7" className="fill-reconnect-cream stroke-reconnect-sage" strokeWidth="4" />
        <path d="M121 28v-7c0-4 3-7 7-7h24c4 0 7 3 7 7v7" className="fill-reconnect-sage-soft stroke-reconnect-sage" strokeWidth="4" />
        <circle cx="119" cy="55" r="11" className="fill-reconnect-lavender stroke-reconnect-sage" strokeWidth="2" />
        <path d="M138 51h34M138 59h25M108 79h67M108 95h67M108 111h48" className="stroke-reconnect-sage" strokeWidth="3" strokeLinecap="round" />
        <path d="m69 125 18-17 11 12-18 17H68l1-12Z" className="fill-reconnect-peach stroke-reconnect-terracotta" strokeWidth="3" />
        <path d="m72 134 18-17" className="stroke-reconnect-terracotta" strokeWidth="2" />
        <path d="M208 129c3-22 0-40-9-57M201 93c-11-7-16-16-14-27 12 3 17 12 14 27ZM201 111c10-10 20-12 29-8-5 12-15 16-29 8Z" className="fill-reconnect-sage-soft stroke-reconnect-sage" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 270 150" aria-hidden="true" className={className}>
      <path d="M23 131h224" className="stroke-reconnect-border" strokeWidth="2" />
      <path d="M47 112c3-28 9-46 26-55 17-9 32 2 31 20-1 17-11 31-29 38l-8 8H47Z" className="fill-reconnect-sage-soft stroke-reconnect-forest" strokeWidth="3" />
      <circle cx="82" cy="59" r="12" className="fill-reconnect-peach stroke-reconnect-forest" strokeWidth="3" />
      <path d="M65 97c11-7 21-8 31-2" className="stroke-reconnect-forest" strokeWidth="3" strokeLinecap="round" />
      <path d="M170 116c-16-5-26-20-25-38 1-18 16-27 32-20 15 7 23 24 18 43l-5 15h-20Z" className="fill-reconnect-sage stroke-reconnect-forest" strokeWidth="3" />
      <circle cx="170" cy="59" r="12" className="fill-reconnect-cream stroke-reconnect-forest" strokeWidth="3" />
      <path d="M154 98c9-7 20-7 30-1" className="stroke-reconnect-forest" strokeWidth="3" strokeLinecap="round" />
      <path d="M108 36h48c8 0 15 6 15 14v14c0 8-7 14-15 14h-28l-13 12 2-12h-9c-8 0-15-6-15-14V50c0-8 7-14 15-14Z" className="fill-reconnect-cream stroke-reconnect-sage" strokeWidth="3" />
      <circle cx="122" cy="56" r="3" className="fill-reconnect-terracotta" />
      <circle cx="134" cy="56" r="3" className="fill-reconnect-terracotta" />
      <circle cx="146" cy="56" r="3" className="fill-reconnect-terracotta" />
      <path d="M211 127c-3-22 0-39 10-57M218 95c-12-5-18-13-18-24 12 1 19 9 18 24Zm1 17c12-9 22-8 29-2-8 10-17 12-29 2Z" className="fill-reconnect-peach stroke-reconnect-sage" strokeWidth="2" />
    </svg>
  );
}
