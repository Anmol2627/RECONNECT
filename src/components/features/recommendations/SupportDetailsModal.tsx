"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
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

  const isPaid = option?.metadata?.priceType === "Paid";
  const price = option?.metadata?.price;

  const handleJoin = async () => {
    if (!option || !onJoin) return;
    setIsJoining(true);

    if (isPaid && price) {
      try {
        const res = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: option.title,
            price: price,
            sessionId: option.id,
            returnUrl: window.location.pathname
          })
        });
        const { url, error } = await res.json();
        if (error) throw new Error(error);
        
        if (url) {
          window.location.href = url;
          return;
        }
      } catch (e: any) {
        console.error("Stripe error", e);
        alert("Payment gateway failed to load: " + e.message);
        setIsJoining(false);
        return;
      }
    }

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
            {isPaid && price ? ` · ₹${price}` : ""}
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
             <div className="flex flex-col gap-3 w-full sm:w-auto">
               <div className="flex h-10 items-center justify-center gap-2 rounded-full border border-sage bg-sage/10 text-sm font-medium text-forest px-6">
                 <Check className="size-4" />
                 Joined
               </div>
               {option?.details?.meetLink && (
                 <a
                   href={option.details.meetLink}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex h-10 items-center justify-center gap-2 rounded-full bg-terracotta text-sm font-medium text-cream px-6 hover:bg-terracotta-hover transition-colors"
                 >
                   Open Google Meet
                 </a>
               )}
             </div>
          ) : (
            <Button
              className="w-full rounded-full bg-forest text-cream hover:bg-forest-deep sm:w-auto"
              onClick={handleJoin}
              disabled={isJoining}
            >
              {isJoining ? "Processing..." : isPaid ? `Pay ₹${price} to Join` : "Join Session"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
