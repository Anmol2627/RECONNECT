"use client";
export function PlantIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 160"
      role="img"
      aria-label="Illustration of a potted plant beside a warm cup"
      className={className}
    >
      <ellipse cx="120" cy="70" rx="95" ry="60" fill="var(--cream)" />
      <path
        d="M118 96c0-26 10-44 30-54-3 30-14 45-30 54Z"
        fill="var(--sage)"
        opacity="0.75"
      />
      <path
        d="M116 96C104 78 86 68 74 44c28 6 42 26 42 52Z"
        fill="var(--sage)"
        opacity="0.5"
      />
      <path d="M117 100V60" stroke="var(--sage)" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M96 98h44l-6 34a6 6 0 0 1-6 5h-20a6 6 0 0 1-6-5l-6-34Z"
        fill="var(--peach)"
      />
      <rect x="92" y="92" width="52" height="10" rx="5" fill="var(--terracotta)" opacity="0.35" />
      <path
        d="M160 116h34v14a10 10 0 0 1-10 10h-14a10 10 0 0 1-10-10v-14Z"
        fill="var(--sage-light)"
      />
      <path
        d="M194 120h6a7 7 0 0 1 0 14h-6"
        stroke="var(--sage)"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M170 104c0-5 6-5 6-10M182 104c0-5 6-5 6-10"
        stroke="var(--sage)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
        fill="none"
      />
    </svg>
  );
}
