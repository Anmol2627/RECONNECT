"use client";
import { useState, type ReactNode } from "react";
import { X, LayoutDashboard, Heart, Sparkles, Users2, Calendar, BookOpen, MessageSquare } from "lucide-react";

import { ParticipantSidebar } from "./ParticipantSidebar";
import { TopBar } from "./TopBar";
import { Suspense } from "react";
import { PaymentSuccessHandler } from "./PaymentSuccessHandler";

type AppShellProps = {
  children: ReactNode;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
};

export function AppShell({
  children,
  searchPlaceholder,
  searchValue,
  onSearchChange
}: AppShellProps) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="flex min-h-dvh w-full bg-background">
      <Suspense fallback={null}>
        <PaymentSuccessHandler />
      </Suspense>
      <aside className="sticky top-0 hidden h-dvh lg:block">
        <ParticipantSidebar />
      </aside>

      {navOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setNavOpen(false)}
            className="absolute inset-0 bg-forest-deep/50"
          />
          <div className="relative h-full w-[264px]">
            <ParticipantSidebar />
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setNavOpen(false)}
              className="absolute right-2 top-3 grid size-9 place-items-center rounded-lg text-sidebar-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <main className="mx-auto w-full max-w-[1180px] px-6 py-8 md:px-10 md:py-10">
          <TopBar
            onOpenNav={() => setNavOpen(true)}
            searchPlaceholder={searchPlaceholder}
            searchValue={searchValue}
            onSearchChange={onSearchChange}
          />
          <div className="mt-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
