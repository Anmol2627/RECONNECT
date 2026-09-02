"use client";
import { ArrowRight, BadgeCheck, CalendarDays, Clock, Tag, Users } from "lucide-react";
import type { SupportOpportunity } from "@/data/support";
import { GroupSessionIllustration } from "./illustrations";

export function SupportOpportunityCard({
  opportunity,
  featured = false,
  onViewDetails,
}: {
  opportunity: SupportOpportunity;
  featured?: boolean;
  onViewDetails: (opportunity: SupportOpportunity) => void;
}) {
  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-lift">
      <div className="flex gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sage-soft text-forest">
          <Users className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </span>

        <div className="min-w-0 flex-1">
          {opportunity.suggested && (
            <span className="inline-flex rounded-full bg-cream px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
              Suggested for you
            </span>
          )}
          <h3 className="mt-2 text-lg leading-snug text-foreground">{opportunity.title}</h3>

          <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-muted-foreground">
            <span>{opportunity.type}</span>
            {opportunity.date && (
              <>
                <span aria-hidden="true">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-3.5" aria-hidden="true" />
                  {opportunity.date}
                </span>
              </>
            )}
            {opportunity.time && (
              <>
                <span aria-hidden="true">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5" aria-hidden="true" />
                  {opportunity.time}
                </span>
              </>
            )}
          </p>

          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {opportunity.description}
          </p>

          <p className="mt-3 text-[13px] text-muted-foreground">
            Hosted by <span className="text-foreground">{opportunity.organizationName}</span>
            {opportunity.verified && (
              <span className="ml-2 inline-flex items-center gap-1 text-sage">
                <BadgeCheck className="size-3.5" aria-hidden="true" />
                Verified organization
              </span>
            )}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {opportunity.availability && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1.5 text-xs text-muted-foreground">
                <Users className="size-3.5" aria-hidden="true" />
                {opportunity.availability}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1.5 text-xs text-muted-foreground">
              <Tag className="size-3.5" aria-hidden="true" />
              {opportunity.price}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1.5 text-xs text-muted-foreground">
              {opportunity.deliveryMode}
            </span>
          </div>
        </div>

        {featured && (
          <GroupSessionIllustration className="hidden h-28 w-56 shrink-0 self-center xl:block" />
        )}
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={() => onViewDetails(opportunity)}
          className="inline-flex items-center gap-2 rounded-xl bg-terracotta px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-terracotta/90"
        >
          View details
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
