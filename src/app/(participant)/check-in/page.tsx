"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { AppShell } from "@/components/layout/AppShell";
import { CheckInForm } from "@/components/features/check-in/CheckInForm";


function CheckInPage() {
  return (
    <AppShell>
      <nav aria-label="Breadcrumb" className="mt-3">
        <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <li>
            <Link href="/journey" className="transition-colors hover:text-foreground">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li aria-current="page" className="font-medium text-foreground">
            Check-In
          </li>
        </ol>
      </nav>

      <CheckInForm />
    </AppShell>
  );
}

export default CheckInPage;
