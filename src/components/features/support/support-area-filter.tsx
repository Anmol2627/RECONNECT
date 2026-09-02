"use client";
import { ArrowRight, BookOpen, Briefcase, Heart, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SupportArea, SupportAreaId } from "@/data/support";

const icons = {
  heart: Heart,
  briefcase: Briefcase,
  leaf: Leaf,
  book: BookOpen,
} as const;

const tones = {
  sage: "bg-sage-soft/70 text-forest",
  peach: "bg-peach/70 text-forest",
  lilac: "bg-lilac-soft/70 text-forest",
  terracotta: "bg-terracotta-soft/80 text-terracotta",
} as const;

export function SupportAreaFilter({
  areas,
  selected,
  onSelect,
}: {
  areas: SupportArea[];
  selected: SupportAreaId | null;
  onSelect: (id: SupportAreaId | null) => void;
}) {
  return (
    <section
      aria-labelledby="support-area-heading"
      className="rounded-2xl border border-border bg-card p-5 shadow-soft"
    >
      <h2 id="support-area-heading" className="text-lg text-foreground">
        Filter by support area
      </h2>
      <p className="mt-1 text-[13px] text-muted-foreground">Choose what you want support with.</p>

      <ul className="mt-4 space-y-2.5">
        {areas.map((area) => {
          const Icon = icons[area.icon];
          const isSelected = selected === area.id;
          return (
            <li key={area.id}>
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSelect(isSelected ? null : area.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm transition-all",
                  tones[area.tone],
                  isSelected
                    ? "ring-2 ring-forest/70 ring-offset-1 ring-offset-card font-semibold"
                    : "hover:brightness-[0.98]",
                )}
              >
                <Icon className="size-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                <span className="flex-1">{area.label}</span>
                {isSelected && <span className="text-xs font-medium">Selected</span>}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => onSelect(null)}
        className="mt-3 flex w-full items-center justify-between rounded-xl border border-border px-3.5 py-3 text-sm text-foreground transition-colors hover:bg-cream"
      >
        View all areas
        <ArrowRight className="size-4" aria-hidden="true" />
      </button>
    </section>
  );
}
