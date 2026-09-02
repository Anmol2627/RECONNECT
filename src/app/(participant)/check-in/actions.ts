"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function saveCheckInAction(data: { feeling: string, barriers: string[], notes: string }) {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    throw new Error("You must be logged in to save a check-in");
  }

  // Map to the schema fields
  const goal = data.feeling;
  const barrier = data.barriers.join(", ");
  const support_need = data.notes || "None";

  const { error } = await supabase.from("check_ins").insert({
    user_id: userData.user.id,
    goal,
    barrier,
    support_need,
  });

  if (error) {
    console.error("Error inserting check-in:", error);
    throw new Error("Failed to save check-in");
  }

  revalidatePath("/", "layout");
}
