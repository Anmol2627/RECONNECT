"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function joinCohort(cohortId: string) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) throw new Error("Must be logged in");

  await supabase.from("cohort_members").insert({
    cohort_id: cohortId,
    user_id: userData.user.id
  });

  revalidatePath("/cohorts");
}

export async function createCohortPost(cohortId: string, content: string) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) throw new Error("Must be logged in");

  await supabase.from("cohort_posts").insert({
    cohort_id: cohortId,
    user_id: userData.user.id,
    content
  });

  revalidatePath(`/cohorts/${cohortId}`);
}
