"use client";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { SupportBannerIllustration } from "./illustrations";

export function SupportBanner() {
  return (
    <section className="flex flex-col items-start gap-5 rounded-2xl border border-border bg-peach/60 p-6 sm:flex-row sm:items-center">
      <SupportBannerIllustration className="h-20 w-24 shrink-0" />
      <div className="flex-1">
        <h2 className="text-lg text-foreground">Not sure where to start?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Answer a few questions and we&apos;ll help you find the right support.
        </p>
      </div>
      <Link
        href="/check-in"
        className="inline-flex items-center gap-2 rounded-xl border border-terracotta/30 bg-card px-4 py-3 text-sm font-medium text-terracotta transition-colors hover:bg-terracotta-soft"
      >
        <Sparkles className="size-4" strokeWidth={1.75} aria-hidden="true" />
        Get help finding support
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </section>
  );
}
