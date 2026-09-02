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

  // Redirect to their journey dashboard after onboarding
  redirect("/journey");
}
