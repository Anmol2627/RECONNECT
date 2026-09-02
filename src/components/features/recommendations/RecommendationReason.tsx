"use client";
import { Leaf } from "lucide-react";

import type { RecommendationReason as Reason } from "@/data/recommendations";

export function RecommendationReason({ reason }: { reason: Reason }) {
  return (
    <section
      aria-labelledby="why-heading"
      className="rounded-2xl border border-border bg-sage-soft/50 p-5"
    >
      <div className="flex gap-3.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sage-soft">
          <Leaf className="size-[18px] text-sage" aria-hidden="true" />
        </span>
        <div>
          <h3 id="why-heading" className="font-sans text-[15px] font-semibold text-forest">
            Why we think this could help
          </h3>
          <p className="mt-1.5 max-w-[52ch] text-sm leading-relaxed text-foreground/80">
            {reason.text}
          </p>
          <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <div className="flex gap-1.5">
              <dt>Your goal:</dt>
              <dd className="text-forest">{reason.goal}</dd>
            </div>
            <div className="flex gap-1.5">
              <dt>What's in the way:</dt>
              <dd className="text-forest">{reason.barrier}</dd>
            </div>
            <div className="flex gap-1.5">
              <dt>Support need:</dt>
              <dd className="text-forest">{reason.supportNeed}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
