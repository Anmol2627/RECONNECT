"use client";

import { useTransition } from "react";
import { joinCohort } from "./actions";
import { Users2 } from "lucide-react";

export function JoinCohortButton({ cohortId }: { cohortId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => joinCohort(cohortId))}
      disabled={isPending}
      className="flex w-full items-center justify-center gap-2 rounded-full border border-forest px-4 py-2.5 text-sm font-semibold text-forest transition-colors hover:bg-forest/5 disabled:opacity-50"
    >
      <Users2 className="h-4 w-4" />
      {isPending ? "Joining..." : "Join Cohort"}
    </button>
  );
}
