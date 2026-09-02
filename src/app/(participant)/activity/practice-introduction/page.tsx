"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Lightbulb, MessageCircle } from "lucide-react";

import { AppShell } from "@/components/layout/AppShell";
import { SurfaceCard, EyebrowLabel } from "@/components/shared/cards";

export default function PracticeIntroductionPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <Link 
          href="/journey" 
          className="inline-flex items-center gap-2 text-sm font-medium text-forest transition-colors hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
        >
          <ArrowLeft size={17} /> Back to My Journey
        </Link>
      </div>

      <header className="mb-8 max-w-3xl">
        <h1 className="font-display text-4xl leading-tight text-forest-deep sm:text-5xl">
          Practice Your Introduction
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
          Introducing yourself can be intimidating, but breaking it down into a simple 3-part format makes it much easier. Use this guide to craft your personal introduction.
        </p>
      </header>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <SurfaceCard>
            <EyebrowLabel tone="forest">The 3-Part Format</EyebrowLabel>
            <h2 className="font-display mt-2 text-2xl text-forest-deep">
              The "Past, Present, Future" Method
            </h2>
            
            <div className="mt-6 space-y-6">
              <div className="relative pl-6 border-l-2 border-sage">
                <h3 className="font-semibold text-forest-deep text-lg">1. Present (Who you are right now)</h3>
                <p className="mt-2 text-muted-foreground">
                  Start with your name and your current focus. Keep it simple and positive.
                </p>
                <div className="mt-3 bg-cream p-4 rounded-xl text-sm italic text-forest">
                  "Hi, I'm Alex. I'm currently focused on building my skills in customer service and administration."
                </div>
              </div>

              <div className="relative pl-6 border-l-2 border-sage">
                <h3 className="font-semibold text-forest-deep text-lg">2. Past (Your relevant experience)</h3>
                <p className="mt-2 text-muted-foreground">
                  Mention a strength or a skill you've developed. You do not need to over-explain your history. Focus on what makes you a hard worker or a fast learner.
                </p>
                <div className="mt-3 bg-cream p-4 rounded-xl text-sm italic text-forest">
                  "In my past experiences, I've learned how to stay calm under pressure and work well as part of a team."
                </div>
              </div>

              <div className="relative pl-6 border-l-2 border-terracotta">
                <h3 className="font-semibold text-forest-deep text-lg">3. Future (What you are looking for)</h3>
                <p className="mt-2 text-muted-foreground">
                  End by stating your goal for this conversation or your overall career goal.
                </p>
                <div className="mt-3 bg-peach/30 p-4 rounded-xl text-sm italic text-terracotta">
                  "I'm really excited to be here today because I'm looking for an opportunity to apply my teamwork skills in a full-time retail role."
                </div>
              </div>
            </div>
          </SurfaceCard>

          <SurfaceCard className="bg-forest text-cream">
            <h2 className="font-display text-2xl">Now, put it all together</h2>
            <p className="mt-3 text-cream/80">
              "Hi, I'm Alex. I'm currently focused on building my skills in customer service. In my past experiences, I've learned how to stay calm under pressure and work well as part of a team. I'm really excited to be here today because I'm looking for an opportunity to apply my teamwork skills in a full-time retail role."
            </p>
          </SurfaceCard>
        </div>

        {/* Sidebar / Tips Area */}
        <div className="space-y-6">
          <SurfaceCard className="bg-cream border-sage/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-sage/20 rounded-lg text-forest">
                <Lightbulb size={20} />
              </div>
              <h3 className="font-display text-xl text-forest-deep">Quick Tips</h3>
            </div>
            
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-muted-foreground">
                <CheckCircle2 size={18} className="text-sage shrink-0" />
                <span><strong>Keep it short:</strong> Aim for 30 seconds or less. People have short attention spans!</span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <CheckCircle2 size={18} className="text-sage shrink-0" />
                <span><strong>Smile:</strong> A genuine smile makes you seem approachable and confident, even if you are nervous.</span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <CheckCircle2 size={18} className="text-sage shrink-0" />
                <span><strong>Eye Contact:</strong> Look at the person you are speaking to. It shows respect and engagement.</span>
              </li>
            </ul>
          </SurfaceCard>

          <SurfaceCard>
            <div className="flex items-center gap-3 mb-3">
              <MessageCircle size={20} className="text-terracotta" />
              <h3 className="font-display text-xl text-forest-deep">Practice with AI</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Want to test out your introduction before using it in the real world? Send it to your RECONNECT Guide and ask for feedback!
            </p>
            <Link 
              href="/companion"
              className="inline-flex items-center justify-center w-full gap-2 rounded-xl px-5 py-3 text-sm font-semibold bg-terracotta text-cream transition-colors hover:bg-terracotta/90"
            >
              Go to My Companion
            </Link>
          </SurfaceCard>
        </div>
      </div>
    </AppShell>
  );
}
