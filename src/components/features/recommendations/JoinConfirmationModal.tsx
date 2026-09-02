"use client";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Recommendation } from "@/data/recommendations";

export function JoinConfirmationModal({
  recommendation,
  open,
  joined,
  onOpenChange,
  onConfirm,
}: {
  recommendation: Recommendation;
  open: boolean;
  joined: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl border-border bg-card">
        {joined ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl text-forest">You're in! 🌿</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                We've added the session to your journey.
              </DialogDescription>
            </DialogHeader>
            <Button asChild variant="terracotta" size="lg" className="w-full">
              <Link href="/journey">
                View My Journey
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl text-forest">
                Join {recommendation.title}?
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                You're joining a free facilitated group session focused on workplace confidence.
              </DialogDescription>
            </DialogHeader>

            <ul className="space-y-2.5 rounded-2xl border border-border bg-cream/70 p-4 text-sm text-foreground">
              <li className="flex items-center gap-2.5">
                <CalendarDays className="size-4 text-sage" aria-hidden="true" />
                {recommendation.date}
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="size-4 text-sage" aria-hidden="true" />
                {recommendation.time}
              </li>
              <li className="flex items-center gap-2.5">
                <Users className="size-4 text-sage" aria-hidden="true" />
                {recommendation.spots} spots remaining
              </li>
            </ul>

            <div className="flex flex-col gap-2.5 sm:flex-row">
              <Button variant="terracotta" size="lg" className="flex-1" onClick={onConfirm}>
                Confirm &amp; Join
              </Button>
              <Button
                variant="forestOutline"
                size="lg"
                className="flex-1"
                onClick={() => onOpenChange(false)}
              >
                Maybe later
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
