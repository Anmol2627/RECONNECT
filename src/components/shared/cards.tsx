"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MessagesSquare, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  mockCheckIn,
  mockEncouragement,
  mockJourney,
  mockNextStep,
  mockSupportBanner,
  mockUpcomingSession,
} from "@/data/mock";
import {
  CalmPersonIllustration,
  HandsHeartIllustration,
  NotesIllustration,
  PlantGrowthIllustration,
  SmallSproutIllustration,
} from "./illustrations";

/* ---------- primitives ---------- */

export function SurfaceCard({
  className,
  children,
  as: As = "section",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "section" | "div" | "article";
}) {
  return (
    <As
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]",
        className,
      )}
    >
      {children}
    </As>
  );
}

export function EyebrowLabel({
  children,
  tone = "forest",
}: {
  children: React.ReactNode;
  tone?: "forest" | "terracotta";
}) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.14em]",
        tone === "forest" ? "text-forest" : "text-terracotta",
      )}
    >
      {children}
    </p>
  );
}

const ctaBase =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const primaryCta = cn(ctaBase, "bg-terracotta text-cream hover:bg-terracotta/90");
export const outlineCta = cn(
  ctaBase,
  "border border-terracotta text-terracotta hover:bg-peach/60",
);

/* ---------- journey focus ---------- */

type JourneyFocusCardProps = {
  focusTitle?: string;
  focusDescription?: string;
  progress?: number;
};

export function JourneyFocusCard({ focusTitle, focusDescription, progress = 0 }: JourneyFocusCardProps) {
  const title = focusTitle || "Set your first focus";
  const description = focusDescription || "Take your first check-in to establish your current focus and goals.";

  return (
    <SurfaceCard className="bg-cream">
      <div className="flex items-start gap-6">
        <div className="min-w-0 flex-1">
          <EyebrowLabel>Current focus</EyebrowLabel>
          <h2 className="font-display mt-2 text-3xl leading-tight text-forest md:text-[2.35rem]">
            {title}
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            {description}
          </p>

          <div className="mt-7 flex items-baseline gap-2">
            <span className="font-display text-4xl text-forest">{progress}%</span>
            <span className="text-sm text-muted-foreground">complete</span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${title} progress: ${progress}% complete`}
            className="mt-3 h-2.5 w-full max-w-md overflow-hidden rounded-full bg-peach/70"
          >
            <div
              className="h-full rounded-full bg-forest transition-[width] duration-700 ease-out motion-reduce:transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <PlantGrowthIllustration className="hidden h-44 w-auto shrink-0 sm:block" />
      </div>
    </SurfaceCard>
  );
}

/* ---------- next step ---------- */

export function NextStepCard() {
  const [open, setOpen] = useState(false);

  return (
    <SurfaceCard>
      <EyebrowLabel tone="terracotta">Your next step</EyebrowLabel>

      <div className="mt-5 flex items-start gap-5">
        <span
          aria-hidden="true"
          className="grid size-16 shrink-0 place-items-center rounded-2xl bg-peach text-terracotta"
        >
          <MessagesSquare className="size-7" strokeWidth={1.6} />
        </span>

        <div className="min-w-0 flex-1">
          <h2 className="font-display text-2xl leading-snug text-forest-deep">
            {mockNextStep.title}
          </h2>
          <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            {mockNextStep.description}
          </p>
          <button type="button" className={cn(primaryCta, "mt-6")} onClick={() => setOpen(true)}>
            Start now
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>

        <NotesIllustration className="hidden h-36 w-auto shrink-0 lg:block" />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-3xl bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-normal text-forest">
              {mockNextStep.title}
            </DialogTitle>
            <DialogDescription className="text-[15px] leading-relaxed">
              {mockNextStep.modalDescription}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link href="/activity/practice-introduction" className={primaryCta} onClick={() => setOpen(false)}>
              Begin activity
            </Link>
            <DialogClose className="inline-flex items-center rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Maybe later
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </SurfaceCard>
  );
}

/* ---------- coming up ---------- */

type UpcomingSession = {
  title: string;
  dateLabel: string;
  timeLabel: string;
  description: string;
  status: string;
};

export function UpcomingSupportCard({ session }: { session?: UpcomingSession }) {
  const displaySession = session || mockUpcomingSession; // Fallback to mock for now if none provided

  return (
    <SurfaceCard>
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-xl text-forest-deep">Coming up</h2>
        <Link
          href="/sessions"
          className="inline-flex items-center gap-1.5 rounded-lg text-sm font-medium text-terracotta hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          View all
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <Link
        href="/sessions"
        className="mt-5 flex gap-4 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span
          aria-hidden="true"
          className="grid size-12 shrink-0 place-items-center rounded-xl bg-sage-light text-forest"
        >
          <Users className="size-6" strokeWidth={1.6} />
        </span>
        <span className="min-w-0">
          <span className="block font-display text-lg leading-snug text-forest-deep">
            {displaySession.title}
          </span>
          <span className="mt-1 block text-sm font-medium text-foreground/80">
            {displaySession.dateLabel} &nbsp;•&nbsp; {displaySession.timeLabel}
          </span>
          <span className="mt-2 block text-[14px] leading-relaxed text-muted-foreground">
            {displaySession.description}
          </span>
          <span className="mt-3 inline-block rounded-md bg-sage-light px-2.5 py-1 text-xs font-semibold text-forest">
            {displaySession.status}
          </span>
        </span>
      </Link>
    </SurfaceCard>
  );
}

/* ---------- check-in ---------- */

type CheckInCardProps = {
  title?: string;
  description?: string;
  buttonText?: string;
};

export function CheckInCard({ title, description, buttonText }: CheckInCardProps) {
  const displayTitle = title || "Weekly Check-In";
  const displayDesc = description || "Ready for your next check-in? Take a moment to reflect on your progress and update your current goals.";
  const displayBtn = buttonText || "Check-In Now";

  return (
    <SurfaceCard>
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-xl leading-snug text-forest-deep">
            {displayTitle}
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
            {displayDesc}
          </p>
          <Link href="/check-in" className={cn(outlineCta, "mt-5")}>
            {displayBtn}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <CalmPersonIllustration className="hidden h-28 w-auto shrink-0 sm:block" />
      </div>
    </SurfaceCard>
  );
}

/* ---------- encouragement ---------- */

export function EncouragementCard() {
  return (
    <SurfaceCard className="bg-cream">
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-xl text-forest-deep">
            {mockEncouragement.title} <span aria-hidden="true">🌿</span>
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
            {mockEncouragement.description}
          </p>
        </div>
        <SmallSproutIllustration className="hidden h-24 w-auto shrink-0 sm:block" />
      </div>
    </SurfaceCard>
  );
}

/* ---------- support banner ---------- */

export function SupportBanner() {
  return (
    <SurfaceCard className="bg-peach/60">
      <div className="flex flex-wrap items-center gap-6">
        <HandsHeartIllustration className="hidden h-20 w-auto shrink-0 sm:block" />
        <div className="min-w-[240px] flex-1">
          <h2 className="font-display text-xl text-forest-deep">{mockSupportBanner.title}</h2>
          <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
            {mockSupportBanner.description}
          </p>
        </div>
        <Link href="/support" className={outlineCta}>
          Explore Support Hub
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </SurfaceCard>
  );
}
