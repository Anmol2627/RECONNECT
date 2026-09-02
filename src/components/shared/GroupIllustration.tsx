"use client";
interface GroupIllustrationProps {
  className?: string;
  /** Accessible description of the scene. */
  title?: string;
}

/**
 * RECONNECT group illustration.
 * Flat editorial vector scene: two participants and one facilitator seated
 * together in a supportive conversation, with botanical accents.
 * Reusable across Peer Groups, Group Sessions, Support Hub and Recommendations.
 */
export function GroupIllustration({
  className,
  title = "Three people sitting together in a supportive group conversation",
}: GroupIllustrationProps) {
  return (
    <svg
      viewBox="0 0 400 330"
      role="img"
      aria-label={title}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>

      {/* soft organic backdrop */}
      <ellipse cx="200" cy="176" rx="186" ry="146" fill="#F1F0E6" />
      <path
        d="M40 210c26-58 92-92 160-92s134 34 160 92c-30 62-96 96-160 96S70 272 40 210Z"
        fill="#F8F5ED"
      />

      {/* botanical: left branch */}
      <g stroke="#A8BC9C" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M46 262c14-26 20-52 18-78" />
        <path d="M52 236c-14-4-22-14-24-28 14 0 24 8 28 20" />
        <path d="M58 212c10-10 12-22 8-34-12 6-18 16-16 28" />
      </g>
      <g fill="#C6D6B8">
        <ellipse cx="36" cy="216" rx="14" ry="8" transform="rotate(-24 36 216)" />
        <ellipse cx="66" cy="190" rx="13" ry="7.5" transform="rotate(28 66 190)" />
      </g>

      {/* botanical: right potted plant */}
      <g>
        <path
          d="M352 236c-2-24 4-42 18-56-2 22-6 40-14 56Z"
          fill="#C6D6B8"
        />
        <path d="M348 240c-14-14-20-30-18-48 14 12 20 28 20 48Z" fill="#A8BC9C" />
        <path d="M352 252c10-14 22-22 36-24-6 14-18 24-34 28Z" fill="#C6D6B8" />
        <path
          d="M332 250h44l-5 32a8 8 0 0 1-8 7h-18a8 8 0 0 1-8-7l-5-32Z"
          fill="#F7E8D5"
        />
        <rect x="329" y="243" width="50" height="10" rx="5" fill="#EBD8BE" />
      </g>

      {/* speech bubble */}
      <g>
        <rect x="146" y="34" width="96" height="52" rx="20" fill="#FFFFFF" />
        <path d="M186 84l4 18 16-16-20-2Z" fill="#FFFFFF" />
        <circle cx="172" cy="60" r="5" fill="#C6D6B8" />
        <circle cx="194" cy="60" r="5" fill="#A8BC9C" />
        <circle cx="216" cy="60" r="5" fill="#E3B18A" />
      </g>

      {/* ground shadow */}
      <ellipse cx="200" cy="288" rx="146" ry="18" fill="#EDE9DA" />

      {/* small round table */}
      <g>
        <rect x="176" y="248" width="10" height="34" rx="5" fill="#D9C7A8" />
        <ellipse cx="181" cy="284" rx="30" ry="7" fill="#D9C7A8" />
        <ellipse cx="181" cy="246" rx="46" ry="14" fill="#F7E8D5" />
        <ellipse cx="181" cy="243" rx="46" ry="14" fill="#EBD8BE" />
        {/* two cups */}
        <path d="M164 232h16l-2 10a5 5 0 0 1-5 4h-2a5 5 0 0 1-5-4l-2-10Z" fill="#FFFFFF" />
        <path d="M192 234h13l-1.6 8a4 4 0 0 1-4 3.4h-1.8a4 4 0 0 1-4-3.4L192 234Z" fill="#FFFFFF" />
      </g>

      {/* LEFT participant (seated, turned inward) */}
      <g>
        {/* chair */}
        <path d="M56 214h56a10 10 0 0 1 10 10v58H46v-58a10 10 0 0 1 10-10Z" fill="#DCE4D2" />
        <rect x="52" y="270" width="10" height="26" rx="5" fill="#C6D6B8" />
        <rect x="106" y="270" width="10" height="26" rx="5" fill="#C6D6B8" />
        {/* legs */}
        <path d="M96 250h44a10 10 0 0 1 0 20H96Z" fill="#5F7A57" />
        <path d="M132 258h20a9 9 0 0 1 0 18h-20Z" fill="#3F5A3A" />
        {/* torso */}
        <path
          d="M70 186c0-19 13-32 30-32s30 13 30 32v40c0 8-6 14-14 14H84c-8 0-14-6-14-14v-40Z"
          fill="#5F7A57"
        />
        {/* arm reaching toward the circle */}
        <path
          d="M126 196c14 8 24 20 28 34"
          stroke="#5F7A57"
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="156" cy="234" r="9" fill="#E8C1A0" />
        {/* neck + head */}
        <rect x="92" y="140" width="16" height="20" rx="8" fill="#E8C1A0" />
        <circle cx="100" cy="130" r="23" fill="#E8C1A0" />
        {/* hair */}
        <path
          d="M77 130c0-15 10-26 23-26s23 11 23 26c0 6-2 10-4 12 2-16-6-22-19-22s-19 8-19 22c-2-3-4-6-4-12Z"
          fill="#3B3630"
        />
        <path d="M73 128c-4 20 0 36 8 42 2-14 0-30-2-42Z" fill="#3B3630" />
      </g>

      {/* RIGHT participant (seated, turned inward) */}
      <g>
        <path d="M288 214h56a10 10 0 0 1 10 10v58H278v-58a10 10 0 0 1 10-10Z" fill="#DCE4D2" />
        <rect x="284" y="270" width="10" height="26" rx="5" fill="#C6D6B8" />
        <rect x="338" y="270" width="10" height="26" rx="5" fill="#C6D6B8" />
        <path d="M260 250h44a10 10 0 0 0 0-20h-44Z" fill="#D89A4E" />
        <path d="M248 258h20a9 9 0 0 0 0-18h-20Z" fill="#B9762F" />
        <path
          d="M270 186c0-19 13-32 30-32s30 13 30 32v40c0 8-6 14-14 14h-32c-8 0-14-6-14-14v-40Z"
          fill="#D89A4E"
        />
        <path
          d="M274 196c-14 8-24 20-28 34"
          stroke="#D89A4E"
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="244" cy="234" r="9" fill="#C98F62" />
        <rect x="292" y="140" width="16" height="20" rx="8" fill="#C98F62" />
        <circle cx="300" cy="130" r="23" fill="#C98F62" />
        <path
          d="M277 130c0-15 10-26 23-26s23 11 23 26c0 5-1 9-3 12 1-17-7-23-20-23s-21 7-20 23c-2-3-3-7-3-12Z"
          fill="#2F2A26"
        />
        <circle cx="322" cy="120" r="12" fill="#2F2A26" />
      </g>

      {/* CENTER facilitator (seated, facing viewer) */}
      <g>
        <path d="M170 226h60a10 10 0 0 1 10 10v46h-80v-46a10 10 0 0 1 10-10Z" fill="#CBD9BF" />
        <rect x="170" y="272" width="10" height="24" rx="5" fill="#B4C8A6" />
        <rect x="220" y="272" width="10" height="24" rx="5" fill="#B4C8A6" />
        <path
          d="M172 176c0-18 13-30 28-30s28 12 28 30v44c0 8-6 14-14 14h-28c-8 0-14-6-14-14v-44Z"
          fill="#31472F"
        />
        {/* open, welcoming arms */}
        <path
          d="M176 190c-12 8-18 20-18 34"
          stroke="#31472F"
          strokeWidth="15"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M224 190c12 8 18 20 18 34"
          stroke="#31472F"
          strokeWidth="15"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="158" cy="228" r="8.5" fill="#E8C1A0" />
        <circle cx="242" cy="228" r="8.5" fill="#E8C1A0" />
        <rect x="192" y="132" width="16" height="20" rx="8" fill="#E8C1A0" />
        <circle cx="200" cy="122" r="23" fill="#E8C1A0" />
        <path
          d="M177 122c0-15 10-26 23-26s23 11 23 26c0 4-1 8-2 10-2-14-9-20-21-20s-19 6-21 20c-1-2-2-6-2-10Z"
          fill="#4A342A"
        />
        {/* small collar detail */}
        <path d="M192 152l8 10 8-10 6 4-14 16-14-16 6-4Z" fill="#E7EEE2" />
      </g>

      {/* foreground leaves */}
      <g fill="#B4C8A6">
        <ellipse cx="98" cy="298" rx="18" ry="7" transform="rotate(-12 98 298)" />
        <ellipse cx="300" cy="300" rx="16" ry="6.5" transform="rotate(10 300 300)" />
      </g>
    </svg>
  );
}
