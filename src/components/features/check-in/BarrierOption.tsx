"use client";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import type { BarrierOptionData } from "@/components/features/check-in/data";

export function BarrierOption({
  option,
  selected,
  onToggle,
}: {
  option: BarrierOptionData;
  selected: boolean;
  onToggle: () => void;
}) {
  const Icon = option.icon;

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      onClick={onToggle}
      className={cn(
        "flex min-h-14 w-full items-center gap-3 rounded-xl border bg-card px-4 py-3 text-left transition-all duration-200",
        "hover:border-sage/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2",
        selected ? "border-terracotta bg-terracotta-soft" : "border-border",
      )}
    >
      <Icon
        aria-hidden="true"
        className={cn(
          "h-[18px] w-[18px] shrink-0 transition-colors",
          selected ? "text-terracotta" : "text-sage",
        )}
        strokeWidth={selected ? 2 : 1.6}
      />
      <span className="flex-1 text-sm text-foreground">{option.label}</span>
      <span
        aria-hidden="true"
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border transition-colors",
          selected ? "border-terracotta bg-terracotta" : "border-border bg-card",
        )}
      >
        {selected && <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />}
      </span>
    </button>
  );
}
