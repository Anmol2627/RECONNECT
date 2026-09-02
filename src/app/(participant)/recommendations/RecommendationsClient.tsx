"use client";

import { ArrowRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

import { AlternativeSupportCard } from "@/components/features/recommendations/AlternativeSupportCard";
import { BestMatchCard } from "@/components/features/recommendations/BestMatchCard";
import { JoinConfirmationModal } from "@/components/features/recommendations/JoinConfirmationModal";
import { RecommendationProgress } from "@/components/features/recommendations/RecommendationProgress";
import { SupportDetailsModal } from "@/components/features/recommendations/SupportDetailsModal";
import { SupportHelpCard } from "@/components/features/recommendations/SupportHelpCard";
import { useAppContext } from "@/context/AppContext";
import { type SupportOpportunity, type RecommendationResult } from "@/data/recommendations";
import { joinSessionAction } from "./actions";

export function RecommendationsClient({ steps, best, alternatives }: RecommendationResult) {
  const { state: { joinedSessions }, joinSession } = useAppContext();
  
  const joined = joinedSessions.includes(best.id);
  const [joinOpen, setJoinOpen] = useState(false);
  const [detailsFor, setDetailsFor] = useState<SupportOpportunity | null>(null);
  const alternativesRef = useRef<HTMLDivElement>(null);

  // Auto-open modal if returning from payment
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const sessionParam = searchParams.get("session");
      const openParam = searchParams.get("open");
      
      if (openParam === "true" && sessionParam) {
        if (best.id === sessionParam) {
          setDetailsFor(best);
        } else {
          const found = alternatives.find((o) => o.id === sessionParam);
          if (found) {
            setDetailsFor(found);
          }
        }
      }
    }
  }, [best, alternatives]);

  const confirmJoin = async () => {
    try {
      const result = await joinSessionAction(best.id);
      joinSession(best.id);
      
      if (result.meetingLink) {
        window.open(result.meetingLink, "_blank");
      }
    } catch (err) {
      console.error("Failed to join session", err);
    }
  };

  return (
    <>
      <RecommendationProgress steps={steps} />

      <header className="mt-8">
        <h2 className="font-serif text-[32px] leading-tight text-forest">
          We found something that may help ✨
        </h2>
        <p className="mt-2 text-[15px] text-muted-foreground">
          Based on your check-in and journey, this is the best next step for you right now.
        </p>
      </header>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,1fr)]">
        <div>
          <BestMatchCard
            recommendation={best}
            joined={joined}
            onJoin={() => setJoinOpen(true)}
            onTellMeMore={() => setDetailsFor(best)}
          />

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Not right for you?{" "}
            <button
              type="button"
              onClick={() =>
                alternativesRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
              }
              className="inline-flex items-center gap-1.5 font-medium text-terracotta hover:underline"
            >
              See other options
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </p>
        </div>

        <div className="space-y-6">
          <section
            ref={alternativesRef}
            aria-labelledby="alternatives-heading"
            tabIndex={-1}
            className="card-surface p-5"
          >
            <h2 id="alternatives-heading" className="font-serif text-xl text-forest">
              Other options you might consider
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              These may also support your goal.
            </p>

            <ul className="mt-4 space-y-3">
              {alternatives.map((option) => (
                <AlternativeSupportCard
                  key={option.id}
                  option={option}
                  onSelect={setDetailsFor}
                />
              ))}
            </ul>
          </section>

          <SupportHelpCard />
        </div>
      </div>

      <JoinConfirmationModal
        recommendation={best}
        open={joinOpen}
        joined={joined}
        onOpenChange={setJoinOpen}
        onConfirm={confirmJoin}
      />

      <SupportDetailsModal 
        option={detailsFor} 
        onOpenChange={(open) => {
          if (!open) setDetailsFor(null);
        }}
        joined={detailsFor ? joinedSessions.includes(detailsFor.id) : false}
        onJoin={async (id) => {
          try {
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
