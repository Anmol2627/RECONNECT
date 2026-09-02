"use client";


import { AppShell } from "@/components/layout/AppShell";
import { SurfaceCard } from "@/components/shared/cards";

type SearchParams = { q: string };

import { useSearchParams } from "next/navigation";

function SearchScreen() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  return (
    <AppShell>
      <SurfaceCard className="bg-cream rc-enter">
        <h1 className="font-display text-3xl text-forest">Search</h1>
        <p className="mt-3 text-[15px] text-muted-foreground">
          {q
            ? `No results yet for "${q}". Search will be available soon.`
            : "Type in the search field above to look for sessions, courses and resources."}
        </p>
      </SurfaceCard>
    </AppShell>
  );
}

export default SearchScreen;
