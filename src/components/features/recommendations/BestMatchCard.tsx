"use client";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Check, Star } from "lucide-react";

import { GroupGlyph } from "./GroupGlyph";
import { RecommendationMetadata } from "./RecommendationMetadata";
import { RecommendationReason } from "./RecommendationReason";
import { Button } from "@/components/ui/button";
import type { Recommendation } from "@/data/recommendations";

export function BestMatchCard({
  recommendation,
  joined,
  onJoin,
  onTellMeMore,
}: {
  recommendation: Recommendation;
  joined: boolean;
  onJoin: () => void;
  onTellMeMore: () => void;
}) {
  return (
    <article className="card-surface animate-in fade-in duration-500 bg-cream p-6 sm:p-8">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-soft px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-forest">
            {joined ? (
              <Check className="size-3.5" aria-hidden="true" />
            ) : (
              <Star className="size-3.5 text-terracotta" aria-hidden="true" />
            )}
            {joined ? "Joined" : "Best match"}
          </span>

          <h2 className="mt-4 font-serif text-[34px] leading-tight text-forest">
            {recommendation.title}
          </h2>

          <p className="mt-1.5 text-xs uppercase tracking-[0.14em] text-sage">
            {recommendation.type}
          </p>

          <p className="mt-3 max-w-[54ch] text-[15px] leading-relaxed text-foreground/80">
            {recommendation.description}
          </p>
        </div>

        <GroupGlyph className="hidden h-[150px] w-[210px] shrink-0 md:block" />
      </div>

      <div className="mt-6">
        <RecommendationMetadata
          date={recommendation.date}
          time={recommendation.time}
          spots={recommendation.spots}
          price={recommendation.price}
        />
      </div>

      <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
        <span>Hosted by</span>
        <span className="font-medium text-forest">{recommendation.provider.name}</span>
        {recommendation.provider.verified && (
          <span className="inline-flex items-center gap-1 text-sage">
            <BadgeCheck className="size-3.5" aria-hidden="true" />
            Verified organization
          </span>
        )}
      </p>

      <div className="mt-6">
        <RecommendationReason reason={recommendation.reason} />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {joined ? (
          <>
            <span className="inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-sage-soft px-7 text-[15px] font-medium text-forest">
              <Check className="size-4" aria-hidden="true" />
              Added to My Journey
            </span>
            <Button asChild variant="forestOutline" size="xl" className="flex-1">
              <Link href="/journey">
                View My Journey
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </>
        ) : (
          <>
            <Button variant="terracotta" size="xl" className="flex-1 justify-between" onClick={onJoin}>
              <span className="flex-1 text-center">I'd like to join</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button variant="forestOutline" size="xl" className="flex-1" onClick={onTellMeMore}>
              Tell me more
            </Button>
          </>
        )}
      </div>
    </article>
  );
}
