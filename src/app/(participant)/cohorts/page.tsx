import { createClient } from "@/utils/supabase/server";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Users2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { JoinCohortButton } from "./JoinCohortButton";

export default async function CohortsPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  // Fetch all cohorts
  const { data: cohorts } = await supabase.from("cohorts").select("*").order("created_at");

  // Fetch user's joined cohorts
  let joinedCohortIds: string[] = [];
  if (userData?.user) {
    const { data: members } = await supabase
      .from("cohort_members")
      .select("cohort_id")
      .eq("user_id", userData.user.id);
    joinedCohortIds = members?.map((m) => m.cohort_id) || [];
  }

  return (
    <AppShell breadcrumb="Cohorts">
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
        <PageHeader 
          title="Community Cohorts" 
          description="Join peer support groups to share your journey, ask questions, and learn together."
        />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {cohorts?.map((cohort) => {
            const isJoined = joinedCohortIds.includes(cohort.id);

            return (
              <div key={cohort.id} className="flex flex-col rounded-3xl bg-cream p-6 shadow-sm ring-1 ring-border sm:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/10">
                  <Users2 className="h-6 w-6 text-forest" />
                </div>
                <h3 className="font-display text-xl text-forest-deep">{cohort.name}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{cohort.description}</p>
                
                <div className="mt-6 pt-6 border-t border-border">
                  {isJoined ? (
                    <Link 
                      href={`/cohorts/${cohort.id}`}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-forest-deep"
                    >
                      Enter Cohort <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <JoinCohortButton cohortId={cohort.id} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
