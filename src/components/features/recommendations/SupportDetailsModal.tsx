"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { SupportOpportunity } from "@/data/recommendations";

export function SupportDetailsModal({
  option,
  onOpenChange,
  joined,
  onJoin,
}: {
  option: SupportOpportunity | null;
  onOpenChange: (open: boolean) => void;
  joined?: boolean;
  onJoin?: (id: string) => Promise<void>;
}) {
  const [isJoining, setIsJoining] = useState(false);

  const rows = option
    ? [
        { label: "Who it's for", value: option.details.whoItsFor },
        { label: "What you'll do", value: option.details.whatYouDo },
        { label: "What to expect", value: option.details.whatToExpect },
        { label: "Duration", value: option.details.duration },
        { label: "Facilitator", value: option.details.facilitator },
      ]
    : [];

  const handleJoin = async () => {
    if (!option || !onJoin) return;
    setIsJoining(true);
    await onJoin(option.id);
    setIsJoining(false);
  };

  return (
    <Dialog open={option !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-2xl border-border bg-card">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-forest">About this session</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {option ? `${option.title} · ${option.type}` : ""}
          </DialogDescription>
        </DialogHeader>

        <dl className="space-y-4">
          {rows.map((row) => (
            <div key={row.label}>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                {row.label}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-foreground/85">{row.value}</dd>
            </div>
          ))}
        </dl>
        
        <DialogFooter className="mt-4 sm:justify-end">
          {joined ? (
             <div className="flex h-10 w-full items-center justify-center gap-2 rounded-full border border-sage bg-sage/10 text-sm font-medium text-forest sm:w-auto sm:px-6">
               <Check className="size-4" />
               Joined
             </div>
          ) : (
            <Button
              className="w-full rounded-full bg-forest text-cream hover:bg-forest-deep sm:w-auto"
              onClick={handleJoin}
              disabled={isJoining}
            >
              {isJoining ? "Joining..." : "Join Session"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
