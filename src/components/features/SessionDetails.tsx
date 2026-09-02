"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bookmark,
  BookmarkCheck,
  CalendarDays,
  Clock,
  Heart,
  Leaf,
  MessageSquare,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Tag,
  Building2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GroupIllustration } from "../shared/GroupIllustration";
import type { SupportSession } from "@/data/sessions";
import { useAppContext } from "@/context/AppContext";

const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-terracotta px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-soft transition-colors hover:bg-terracotta-hover";
const outlineBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted";

type JoinState = "idle" | "requested";

export function SessionDetails({ session }: { session: SupportSession }) {
  const storageKey = `reconnect:saved:${session.id}`;
  const [saved, setSaved] = useState(false);
  const { state: { joinedSessions }, joinSession } = useAppContext();
  const [joinOpen, setJoinOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const isJoined = joinedSessions.includes(session.id);
  const [facilitatorOpen, setFacilitatorOpen] = useState(false);
  const [orgOpen, setOrgOpen] = useState(false);

  useEffect(() => {
    setSaved(window.localStorage.getItem(storageKey) === "true");
  }, [storageKey]);

  const toggleSaved = () => {
    setSaved((prev) => {
      const next = !prev;
      window.localStorage.setItem(storageKey, String(next));
      return next;
    });
  };

  const meta = [
    { icon: CalendarDays, label: "Next session", value: session.date },
    { icon: Clock, label: "Time", value: session.time },
    {
      icon: Users,
      label: "Participants",
      value: `${session.participantsJoined} / ${session.capacity} joined`,
    },
    { icon: Tag, label: "Cost", value: session.cost },
  ];

  const steps = [
    {
      icon: Users,
      title: "Join the group",
      body: "You'll be added to the group and get all the details.",
    },
    {
      icon: CalendarDays,
      title: "Attend sessions",
      body: "Participate in weekly sessions and activities.",
    },
    {
      icon: TrendingUp,
      title: "Grow together",
      body: "Build confidence, support others, and work toward your goals.",
    },
  ];

  const about = [
    { icon: Users, title: "Group Session", body: "Facilitated by a trained expert" },
    { icon: Target, title: "Focus", body: session.focus },
    { icon: ShieldCheck, title: "Who can join?", body: session.whoCanJoin },
    { icon: Heart, title: "What to expect", body: session.whatToExpect },
  ];

  return (
    <div className="rc-rise mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_352px]">
      <div className="flex min-w-0 flex-col gap-6">
        {/* HERO */}
        <section className="rc-card p-7">
          <Link
            href="/sessions"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-sage"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to all sessions
          </Link>

          <div className="mt-5 grid items-center gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
            <GroupIllustration className="mx-auto w-full max-w-[360px]" />

            <div>
              <span className="inline-block rounded-full bg-secondary px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.09em] text-secondary-foreground">
                {session.type}
              </span>
              <h2 className="mt-4 text-[2.35rem] leading-[1.15] text-forest">{session.title}</h2>
              <p className="mt-3 max-w-xl text-[0.97rem] leading-7 text-foreground/75">
                {session.description}
              </p>

              <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
                {meta.map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5">
                    <item.icon className="h-4.5 w-4.5 shrink-0 text-sage" aria-hidden="true" />
                    <div>
                      <dt className="text-xs text-muted-foreground">{item.label}</dt>
                      <dd className="text-sm font-medium text-foreground">{item.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* WHY THIS FITS */}
          <section className="mt-7 flex items-start gap-4 rounded-2xl bg-cream px-6 py-5">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
              <Leaf className="h-5 w-5 text-forest" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-forest">
                Why this session is a good fit for you
              </h3>
              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-foreground/75">
                {session.fitReason}
              </p>
            </div>
          </section>

          {/* ACTIONS */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {isJoined ? (
              <span className="inline-flex items-center gap-2 rounded-xl border border-sage bg-secondary px-6 py-3.5 text-sm font-medium text-forest">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                Request sent — awaiting confirmation
              </span>
            ) : (
              <button type="button" className={primaryBtn} onClick={() => setJoinOpen(true)}>
                Request to Join
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
            <button
              type="button"
              className={outlineBtn}
              onClick={toggleSaved}
              aria-pressed={saved}
            >
              {saved ? (
                <BookmarkCheck className="h-4 w-4 text-sage" aria-hidden="true" />
              ) : (
                <Bookmark className="h-4 w-4" aria-hidden="true" />
              )}
              {saved ? "Saved ✓" : "Save for Later"}
            </button>
          </div>
        </section>

        {/* STEPS */}
        <section className="rc-card p-7">
          <h3 className="text-xl text-forest">What happens after you join?</h3>
          <ol className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start">
            {steps.map((step, i) => (
              <li key={step.title} className="flex flex-1 items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-peach">
                  <step.icon className="h-5 w-5 text-forest" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-medium text-foreground">{step.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{step.body}</p>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight
                    className="mt-3.5 hidden h-4 w-4 shrink-0 text-border lg:block"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* BOTTOM BANNER */}
        <section className="flex items-center gap-5 rounded-2xl border border-border bg-peach/60 px-7 py-6">
          <Leaf className="h-8 w-8 shrink-0 text-sage" aria-hidden="true" />
          <div>
            <p className="font-serif text-xl text-forest">You're not alone in this journey.</p>
            <p className="mt-1 text-sm text-foreground/70">
              We're here to walk with you, every step of the way.
            </p>
          </div>
        </section>
      </div>

      {/* RIGHT COLUMN */}
      <div className="flex flex-col gap-6">
        <section className="rc-card p-6">
          <h3 className="text-lg text-forest">About this session</h3>
          <ul className="mt-5 flex flex-col gap-5">
            {about.map((item) => (
              <li key={item.title} className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream">
                  <item.icon className="h-[18px] w-[18px] text-sage" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="mt-0.5 text-sm leading-6 text-muted-foreground">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rc-card p-6">
          <h3 className="text-lg text-forest">Facilitated by</h3>
          <div className="mt-4 flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-secondary text-base font-semibold text-forest">
              {session.facilitator.initials}
            </span>
            <div>
              <p className="flex items-center gap-1.5 font-medium text-foreground">
                {session.facilitator.name}
                {session.facilitator.verified && (
                  <BadgeCheck
                    className="h-4 w-4 text-sage"
                    aria-label="Verified facilitator"
                  />
                )}
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">{session.facilitator.role}</p>
              <p className="text-sm text-muted-foreground">{session.facilitator.experience}</p>
            </div>
          </div>
          <button
            type="button"
            className={`${outlineBtn} mt-5 w-full py-2.5`}
            onClick={() => setFacilitatorOpen(true)}
          >
            View profile
          </button>
        </section>

        <section className="rc-card p-6">
          <h3 className="text-lg text-forest">Hosted by</h3>
          <div className="mt-4 flex items-start gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream">
              <Building2 className="h-5 w-5 text-sage" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">{session.organizationName}</p>
              {session.verified && (
                <p className="mt-0.5 flex items-center gap-1.5 text-sm text-sage">
                  <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                  Verified provider on RECONNECT
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            className={`${outlineBtn} mt-5 w-full py-2.5`}
            onClick={() => setOrgOpen(true)}
          >
            View organisation
          </button>
        </section>

        <section className="rc-card p-6">
          <h3 className="text-lg text-forest">Have questions?</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            We're here to help you understand more about this session.
          </p>
          <Link href="/messages" className={`${outlineBtn} mt-5 w-full py-2.5`}>
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            Message support
          </Link>
        </section>
      </div>

      {/* JOIN MODAL */}
      <Dialog
        open={joinOpen}
        onOpenChange={(open) => {
          setJoinOpen(open);
          if (!open) setConfirmed(false);
        }}
      >
        <DialogContent className="rounded-2xl sm:max-w-md">
          {confirmed ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl font-normal">
                  Request sent 🌿
                </DialogTitle>
                <DialogDescription>
                  You'll be notified when your place is confirmed.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Link href="/journey" className={`${primaryBtn} w-full`}>
                  Back to My Journey
                </Link>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl font-normal">
                  Request to join this group?
                </DialogTitle>
                <DialogDescription>
                  You're requesting a place in the {session.title}.
                </DialogDescription>
              </DialogHeader>
              <ul className="rounded-2xl bg-cream px-5 py-4 text-sm text-foreground/80">
                <li className="flex items-center gap-2.5 py-1">
                  <CalendarDays className="h-4 w-4 text-sage" aria-hidden="true" />
                  Thursday, 16 May
                </li>
                <li className="flex items-center gap-2.5 py-1">
                  <Clock className="h-4 w-4 text-sage" aria-hidden="true" />
                  {session.time}
                </li>
                <li className="flex items-center gap-2.5 py-1">
                  <Tag className="h-4 w-4 text-sage" aria-hidden="true" />
                  Free group session
                </li>
              </ul>
              <DialogFooter className="gap-3 sm:justify-start">
                <button
                  type="button"
                  className={primaryBtn}
                  onClick={() => {
                    joinSession(session.id);
                    setConfirmed(true);
                  }}
                >
                  Request to Join
                </button>
                <button
                  type="button"
                  className={outlineBtn}
                  onClick={() => setJoinOpen(false)}
                >
                  Maybe later
                </button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* FACILITATOR MODAL */}
      <Dialog open={facilitatorOpen} onOpenChange={setFacilitatorOpen}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl font-normal">
              {session.facilitator.name}
            </DialogTitle>
            <DialogDescription>
              {session.facilitator.role} · {session.facilitator.experience}
            </DialogDescription>
          </DialogHeader>
          <div>
            <p className="text-sm font-medium text-foreground">Focus areas</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {session.facilitator.focusAreas.map((area) => (
                <li
                  key={area}
                  className="rounded-full bg-secondary px-3 py-1.5 text-xs text-secondary-foreground"
                >
                  {area}
                </li>
              ))}
            </ul>
            {session.facilitator.verified && (
              <p className="mt-5 flex items-center gap-1.5 text-sm text-sage">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                Verified facilitator
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* ORGANISATION MODAL */}
      <Dialog open={orgOpen} onOpenChange={setOrgOpen}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl font-normal">
              {session.organizationName}
            </DialogTitle>
            <DialogDescription>{session.organizationDescription}</DialogDescription>
          </DialogHeader>
          <p className="flex items-center gap-1.5 text-sm text-sage">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
            Verified organisation
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
