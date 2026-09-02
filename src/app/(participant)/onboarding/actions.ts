"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function completeOnboarding(data: { goals: string[], barriers: string[] }) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    throw new Error("You must be logged in to complete onboarding");
  }

  const goal = data.goals.join(", ");
  const barrier = data.barriers.join(", ");
  
  await supabase.from("check_ins").insert({
    user_id: userData.user.id,
    goal,
    barrier,
    support_need: "Onboarding Initial Check-in",
  });

  // Intelligent Routing: Assign an advisor
  // First try to find an org whose specialty matches their first barrier or goal
  const primaryNeed = data.barriers[0] || data.goals[0] || "";
  let { data: orgs } = await supabase
    .from("profiles")
    .select("id")
    .eq("role", "organization")
    .ilike("specialty", `%${primaryNeed}%`)
    .limit(1);

  // If no exact specialty match found, just pick any available org (fallback)
  if (!orgs || orgs.length === 0) {
    const { data: fallbackOrgs } = await supabase
      .from("profiles")
      .select("id")
      .eq("role", "organization")
      .limit(1);
    orgs = fallbackOrgs;
  }

  // Assign the advisor to the user's profile
  if (orgs && orgs.length > 0) {
    await supabase
      .from("profiles")
      .update({ advisor_id: orgs[0].id })
      .eq("id", userData.user.id);
  }

  // Redirect to their journey dashboard after onboarding
  redirect("/journey");
}
