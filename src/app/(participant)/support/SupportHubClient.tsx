"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { ArrowRight, SearchX } from "lucide-react";
import { SupportCategoryCard } from "@/components/features/support/support-category-card";
import { SupportOpportunityCard } from "@/components/features/support/support-opportunity-card";
import { SupportAreaFilter } from "@/components/features/support/support-area-filter";
import { SupportDetailsModal } from "@/components/features/support/support-details-modal";
import { SupportBanner } from "@/components/features/support/support-banner";
import { useAppContext } from "@/context/AppContext";
import {
  filterOpportunities,
  supportAreas,
  supportCategories,
  type SupportAreaId,
  type SupportOpportunity,
} from "@/data/support";
import { joinSessionAction } from "./actions"; // Wait, I need to create actions or reuse the one from recommendations

export function SupportHubClient({ opportunities }: { opportunities: SupportOpportunity[] }) {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState<SupportAreaId | null>(null);
  const [selected, setSelected] = useState<SupportOpportunity | null>(null);
  
  const { state: { joinedSessions }, joinSession } = useAppContext();

  // If redirected back from payment, auto-open the session modal
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const sessionParam = searchParams.get("session");
      const openParam = searchParams.get("open");
      
      if (openParam === "true" && sessionParam) {
        const found = opportunities.find(o => o.id === sessionParam);
        if (found) {
          setSelected(found);
        }
      }
    }
  }, [opportunities]);

  const results = useMemo(
    () => filterOpportunities(opportunities, { area, query }),
    [opportunities, area, query],
  );

  const activeAreaLabel = supportAreas.find((a) => a.id === area)?.label;

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-4">
        <div>
          <h2 className="font-serif text-2xl text-foreground">Support Hub</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Explore different ways to get the support you need.
          </p>
        </div>
        <div className="relative w-full sm:w-80">
          <label htmlFor="support-search" className="sr-only">
            Search for sessions, groups, courses...
          </label>
          <SearchX
            className="pointer-events-none absolute left-3 top-1/2 hidden size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            id="support-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for sessions, groups, courses..."
            className="w-full rounded-xl border border-border bg-card px-4 py-2 text-sm focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {supportCategories.map((category) => (
          <SupportCategoryCard
            key={category.id}
            title={category.title}
            description={category.description}
            action={category.action}
            to={category.to}
            icon={category.icon}
            tone={category.tone}
          />
        ))}
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section aria-labelledby="recommended-heading">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="recommended-heading" className="text-lg text-foreground">
                Recommended for you
              </h2>
              {activeAreaLabel && (
                <p className="mt-1 text-[13px] text-muted-foreground">
                  Showing support for {activeAreaLabel}
                </p>
              )}
            </div>
            <Link
              href="/sessions"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-terracotta hover:underline"
            >
              View all
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-4 space-y-4">
            {results.length > 0 ? (
              results.map((opportunity, index) => (
                <SupportOpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  featured={index === 0}
                  onViewDetails={setSelected}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
                <SearchX
                  className="mx-auto size-6 text-muted-foreground"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <p className="mt-3 text-sm font-medium text-foreground">
                  We couldn't find anything matching that.
                </p>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  Try another search or explore support areas.
                </p>
              </div>
            )}
          </div>
        </section>

        <SupportAreaFilter areas={supportAreas} selected={area} onSelect={setArea} />
      </div>

      <div className="mt-6">
        <SupportBanner />
      </div>

      <SupportDetailsModal 
        opportunity={selected} 
        onClose={() => setSelected(null)} 
        joined={selected ? joinedSessions.includes(selected.id) : false}
        onJoin={async (id) => {
          try {
            // Reusing the action from recommendations module
            const { joinSessionAction } = await import("@/app/(participant)/recommendations/actions");
            const result = await joinSessionAction(id);
            joinSession(id);
            if (result.meetingLink) {
              window.open(result.meetingLink, "_blank");
            }
          } catch (err) {
            console.error("Failed to join session", err);
          }
        }}
      />
    </>
  );
}
