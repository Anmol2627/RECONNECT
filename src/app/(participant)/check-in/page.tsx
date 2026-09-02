import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/layout/AppShell";
import { CheckInForm } from "@/components/features/check-in/CheckInForm";
import { ActivityTracker } from "@/components/features/check-in/ActivityTracker";
import { createClient } from "@/utils/supabase/server";

export default async function CheckInPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    redirect("/login");
  }

  // Fetch all historical check-ins for the user to generate the heatmap
  const { data: checkIns } = await supabase
    .from("check_ins")
    .select("created_at")
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false });

  // Map to ISO strings for the component
  const checkInDates = (checkIns || []).map(ci => ci.created_at);

  return (
    <AppShell>
      <nav aria-label="Breadcrumb" className="mt-3 mb-6">
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

      <ActivityTracker checkInDates={checkInDates} />

      <CheckInForm />
    </AppShell>
  );
}
