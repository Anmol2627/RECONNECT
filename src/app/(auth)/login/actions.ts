"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: authData, error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/login?error=" + error.message);
  }

  const user = authData.user;
  const role = user?.user_metadata?.role;

  if (role === "organization") {
    revalidatePath("/", "layout");
    redirect("/org/dashboard");
  }

  // Check if participant has completed onboarding (they will have at least 1 check-in)
  const { data: checkIns } = await supabase
    .from("check_ins")
    .select("id")
    .eq("user_id", user.id)
    .limit(1);

  revalidatePath("/", "layout");

  if (!checkIns || checkIns.length === 0) {
    redirect("/onboarding");
  } else {
    redirect("/journey");
  }
}
