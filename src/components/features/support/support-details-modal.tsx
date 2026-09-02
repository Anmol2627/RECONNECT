"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BadgeCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SupportOpportunity } from "@/data/support";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 border-b border-border py-2.5 last:border-b-0">
      <dt className="text-[13px] text-muted-foreground">{label}</dt>
      <dd className="text-right text-[13px] font-medium text-foreground">{value}</dd>
    </div>
  );
}

export function SupportDetailsModal({
  opportunity,
  onClose,
  joined,
  onJoin,
}: {
  opportunity: SupportOpportunity | null;
  onClose: () => void;
  joined?: boolean;
  onJoin?: (id: string) => Promise<void>;
}) {
  const router = useRouter();
  const [isJoining, setIsJoining] = useState(false);

  const isPaid = opportunity?.price && opportunity.price !== "Free" && opportunity.price !== "0" && opportunity.price !== "";
  // Assuming price is formatted like "$50", we need just the number
  const priceString = opportunity?.price?.replace(/[^0-9]/g, '');
  const priceValue = parseInt(priceString || "0", 10);

  const handleJoin = async () => {
    if (!opportunity || !onJoin) return;
    setIsJoining(true);
    
    if (isPaid && priceValue > 0) {
      try {
        const res = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: opportunity.title,
            price: priceValue,
            sessionId: opportunity.id,
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

    await onJoin(opportunity.id);
    setIsJoining(false);
  };

  return (
    <Dialog open={Boolean(opportunity)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="rounded-2xl border-border bg-card sm:max-w-lg">
        {opportunity && (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl font-normal">
                {opportunity.title}
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed">
                {opportunity.description}
              </DialogDescription>
            </DialogHeader>

            <p className="text-[13px] text-muted-foreground">
              Hosted by <span className="text-foreground">{opportunity.organizationName}</span>
              {opportunity.verified && (
                <span className="ml-2 inline-flex items-center gap-1 text-sage">
                  <BadgeCheck className="size-3.5" aria-hidden="true" />
                  Verified organization
                </span>
              )}
            </p>

            <dl className="mt-1 rounded-xl border border-border bg-muted/60 px-4 py-2">
              <DetailRow label="Type" value={opportunity.type} />
              {opportunity.date && <DetailRow label="Date" value={opportunity.date} />}
              {opportunity.time && <DetailRow label="Time" value={opportunity.time} />}
              {opportunity.availability && (
                <DetailRow label="Availability" value={opportunity.availability} />
              )}
              <DetailRow label="How it runs" value={opportunity.deliveryMode} />
              <DetailRow label="Cost" value={opportunity.price} />
              {opportunity.facilitator && (
                <DetailRow label="Facilitator" value={opportunity.facilitator} />
              )}
            </dl>

            <DialogFooter className="gap-2 sm:justify-end">
              <Button
                variant="outline"
                onClick={onClose}
                className="rounded-xl"
              >
                Close
              </Button>
              {joined ? (
                <div className="flex flex-col gap-3 w-full sm:w-auto">
                  <div className="flex h-10 items-center justify-center gap-2 rounded-xl border border-sage bg-sage/10 text-sm font-medium text-forest px-6">
                    <Check className="size-4" />
                    Joined
                  </div>
                  {opportunity.meetLink && (
                    <a
                      href={opportunity.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 items-center justify-center gap-2 rounded-xl bg-terracotta text-sm font-medium text-cream px-6 hover:bg-terracotta-hover transition-colors"
                    >
                      Open Google Meet
                    </a>
                  )}
                </div>
              ) : (
                <Button
                  className="w-full rounded-xl bg-forest text-cream hover:bg-forest-deep sm:w-auto"
                  onClick={handleJoin}
                  disabled={isJoining}
                >
                  {isJoining ? "Processing..." : isPaid ? `Pay ${opportunity.price} to Join` : "Request to Join"}
                </Button>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
