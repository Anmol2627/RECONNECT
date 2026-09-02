"use client";
import { ChevronRight, Laptop, MessageCircle, UserRound, Users } from "lucide-react";

import type { SupportOpportunity } from "@/data/recommendations";
import { cn } from "@/lib/utils";

const icons = {
  users: Users,
  message: MessageCircle,
  laptop: Laptop,
  mentor: UserRound,
};

const tones = {
  sage: "bg-sage-soft text-forest",
  peach: "bg-peach text-terracotta",
  mist: "bg-mist text-forest",
};

export function AlternativeSupportCard({
  option,
  onSelect,
}: {
  option: SupportOpportunity;
  onSelect: (option: SupportOpportunity) => void;
}) {
  const Icon = icons[option.icon];

  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(option)}
        className="flex w-full items-start gap-3.5 rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:border-sage hover:bg-cream/60"
      >
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-full",
            tones[option.tone],
          )}
        >
          <Icon className="size-[18px]" aria-hidden="true" />
        </span>

        <span className="flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-[15px] font-semibold text-forest">{option.title}</span>
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] text-muted-foreground">
              {option.badge}
            </span>
          </span>
          <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">
            {option.description}
          </span>
        </span>

        <ChevronRight className="mt-2 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      </button>
    </li>
  );
}
