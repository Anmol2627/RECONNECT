"use client";
import { ArrowRight } from "lucide-react";

export function CheckInActions({
  onSkip,
  onNext,
}: {
  onSkip: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        onClick={onSkip}
        className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-card px-6 text-sm text-muted-foreground transition-colors hover:bg-cream hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
      >
        Skip for now
      </button>
      <button
        type="button"
        onClick={onNext}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-terracotta px-7 text-sm font-medium text-primary-foreground transition-colors hover:bg-terracotta/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
      >
        Next: Find Support
        <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );
}
