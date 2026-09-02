"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { SessionDetails } from "@/components/features/SessionDetails";
import { employmentConfidenceCohort } from "@/data/sessions";


function SessionDetailsPage() {
  const session = employmentConfidenceCohort;
  return (
    <AppShell>
      <nav aria-label="Breadcrumb" className="mt-3">
        <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <li>
            <Link href="/sessions" className="transition-colors hover:text-foreground">
              Sessions &amp; Groups
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li aria-current="page" className="font-medium text-foreground">
            {session.title}
          </li>
        </ol>
      </nav>
      <SessionDetails session={session} />
    </AppShell>
  );
}

export default SessionDetailsPage;
