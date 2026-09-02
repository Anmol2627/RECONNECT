"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function register(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string || "participant";
  
  let fullName = "";
  if (role === "organization") {
    fullName = formData.get("orgName") as string;
  } else {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    fullName = `${firstName} ${lastName}`.trim();
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
      data: {
        full_name: fullName,
        role: role,
      },
    },
  });

  if (error) {
    redirect("/register?error=" + error.message);
  }

  // If email confirmation is disabled, Supabase returns a session immediately
  if (data.session) {
    if (role === "organization") {
      redirect("/org/dashboard");
    } else {
      redirect("/onboarding");
    }
  }

  redirect("/verify-email");
}
