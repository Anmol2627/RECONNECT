"use client";
import Link from "next/link";
import { HeartHandshake, Headphones } from "lucide-react";

export function SupportHelpCard() {
  return (
    <section
      aria-labelledby="support-help-heading"
      className="rounded-2xl border border-border bg-peach/60 p-5"
    >
      <div className="flex gap-3.5">
        <HeartHandshake className="size-7 shrink-0 text-terracotta" aria-hidden="true" />
        <div>
          <h2 id="support-help-heading" className="font-serif text-lg text-forest">
            We're here for you
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/75">
            If you need help choosing or want to talk to someone, we're just a click away.
          </p>
          <Link
            href="/messages"
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-terracotta/40 bg-card px-4 py-2.5 text-sm font-medium text-terracotta transition-colors hover:bg-terracotta/10"
          >
            <Headphones className="size-4" aria-hidden="true" />
            Talk to Support
          </Link>
        </div>
      </div>
    </section>
  );
}
