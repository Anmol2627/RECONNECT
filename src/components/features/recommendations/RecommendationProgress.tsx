"use client";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export function RecommendationProgress({
  steps,
}: {
  steps: { label: string; state: "complete" | "active" }[];
}) {
  return (
    <section aria-label="Check-in progress" className="card-surface px-6 py-5 sm:px-10">
      <ol className="flex items-start justify-between gap-3">
        {steps.map((step, index) => {
          const isActive = step.state === "active";
          return (
            <li
              key={step.label}
              className="relative flex flex-1 flex-col items-center gap-2 text-center"
            >
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className="dotted-rule absolute left-[calc(-50%+22px)] right-[calc(50%+22px)] top-4 h-px"
                />
              )}
              <span
                className={cn(
                  "relative z-10 flex size-8 items-center justify-center rounded-full text-xs font-medium",
                  isActive
                    ? "bg-terracotta text-terracotta-foreground"
                    : "bg-forest text-forest-foreground",
                )}
              >
                {isActive ? index + 1 : <Check className="size-4" aria-hidden="true" />}
              </span>
              <span
                className={cn(
                  "text-xs sm:text-sm",
                  isActive ? "font-medium text-foreground" : "text-muted-foreground",
                )}
              >
                {step.label}
                <span className="sr-only">
                  {isActive ? " — current step" : " — completed"}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
