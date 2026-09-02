"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function updateProfileAction(data: { firstName: string, lastName: string }) {
  const supabase = await createClient();
  const { data: userData, error: authError } = await supabase.auth.getUser();

  if (authError || !userData.user) {
    throw new Error("You must be logged in to update your profile.");
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      first_name: data.firstName.trim(),
      full_name: `${data.firstName.trim()} ${data.lastName.trim()}`,
    })
    .eq("id", userData.user.id);

  if (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to update profile.");
  }

  revalidatePath("/", "layout");
}
