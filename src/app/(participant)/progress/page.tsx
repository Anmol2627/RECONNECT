"use client";

import { CheckCircle2, TrendingUp, BookOpen, Users, BookmarkCheck } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { useAppContext } from "@/context/AppContext";

import { PageHeader } from "@/components/ui/PageHeader";



function ProgressPage() {
  const { state } = useAppContext();
  
  const completedCourses = Object.keys(state.courseProgress).length;
  const joinedSessions = state.joinedSessions.length;
  const savedResources = state.savedResources.length;

  return (
    <AppShell searchPlaceholder="Search progress...">
      <div className="max-w-[1180px]">
        <PageHeader 
          title="My Progress" 
          subtitle="See how far you've come on your journey." 
        />

        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-6">
            {/* Main Progress Card */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-14 w-14 rounded-full bg-sage-soft flex items-center justify-center shrink-0">
                  <TrendingUp className="h-6 w-6 text-forest" />
                </div>
                <div>
                  <h3 className="text-[18px] font-semibold text-foreground">Employment Readiness</h3>
                  <p className="text-[13px] text-muted-foreground mt-0.5">Current Focus Area</p>
                </div>
              </div>
              
              <div className="mb-3 flex items-end justify-between">
                <span className="text-[36px] font-serif text-forest leading-none">62%</span>
                <span className="text-[14px] font-medium text-sage">On track</span>
              </div>
              <div className="h-3 w-full rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-sage rounded-full" style={{ width: "62%" }}></div>
              </div>
              
              <p className="mt-8 text-[14px] leading-relaxed text-muted-foreground border-t border-border pt-6">
                You've been making steady progress over the last two weeks. Keep up the momentum by completing your next module in Workplace Communication Basics.
              </p>
            </div>

            {/* Milestones */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
              <h3 className="text-[17px] font-semibold text-foreground mb-6">Recent Milestones</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="h-5 w-5 text-sage shrink-0" fill="currentColor" stroke="white" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-[14px]">Completed Check-In</p>
                    <p className="text-[13px] text-muted-foreground mt-0.5">Shared how you're feeling and identified barriers.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="h-5 w-5 text-sage shrink-0" fill="currentColor" stroke="white" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-[14px]">Started a new course</p>
                    <p className="text-[13px] text-muted-foreground mt-0.5">Workplace Communication Basics.</p>
                  </div>
                </li>
                {joinedSessions > 0 && (
                  <li className="flex items-start gap-4">
                    <div className="mt-1">
                      <CheckCircle2 className="h-5 w-5 text-sage shrink-0" fill="currentColor" stroke="white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-[14px]">Requested to join a session</p>
                      <p className="text-[13px] text-muted-foreground mt-0.5">Taking steps to connect with others.</p>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Stats Cards */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex items-center gap-5">
              <div className="h-14 w-14 rounded-full bg-cream flex items-center justify-center shrink-0">
                <BookOpen className="h-6 w-6 text-terracotta" />
              </div>
              <div>
                <p className="text-[28px] font-serif text-forest leading-none">{completedCourses}</p>
                <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mt-1">Courses Started</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex items-center gap-5">
              <div className="h-14 w-14 rounded-full bg-[#E6F3E6] flex items-center justify-center shrink-0">
                <Users className="h-6 w-6 text-forest" />
              </div>
              <div>
                <p className="text-[28px] font-serif text-forest leading-none">{joinedSessions > 0 ? joinedSessions : 0}</p>
                <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mt-1">Sessions Joined</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex items-center gap-5">
              <div className="h-14 w-14 rounded-full bg-[#F3E5F5] flex items-center justify-center shrink-0">
                <BookmarkCheck className="h-6 w-6 text-[#8E24AA]" />
              </div>
              <div>
                <p className="text-[28px] font-serif text-forest leading-none">{savedResources}</p>
                <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mt-1">Resources Saved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default ProgressPage;
