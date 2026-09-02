"use client";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import type { FeelingOptionData } from "@/components/features/check-in/data";

const toneStyles: Record<FeelingOptionData["tone"], string> = {
  sage: "bg-sage-light text-forest",
  gold: "bg-peach text-terracotta",
  rose: "bg-rose text-forest",
};

export function FeelingOption({
  option,
  selected,
  onSelect,
}: {
  option: FeelingOptionData;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = option.icon;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "group flex flex-col items-center gap-3 rounded-2xl border bg-card p-6 text-center transition-all duration-200",
        "hover:border-sage/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2",
        selected ? "border-terracotta bg-terracotta-soft shadow-sm" : "border-border",
      )}
    >
      <span
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-[1.03]",
          toneStyles[option.tone],
        )}
      >
        <Icon className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <span className="text-base text-foreground">{option.title}</span>
      <span className="text-sm text-muted-foreground">{option.description}</span>
      <span
        aria-hidden="true"
        className={cn(
          "mt-1 flex h-5 w-5 items-center justify-center rounded-full border transition-colors",
          selected ? "border-terracotta bg-terracotta" : "border-border bg-card",
        )}
      >
        {selected && <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />}
      </span>
    </button>
  );
}
