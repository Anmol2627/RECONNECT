import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { OnboardingClient } from "./OnboardingClient";

export const metadata = {
  title: "Welcome | RECONNECT",
};

export default async function OnboardingPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    redirect("/login");
  }

  const fullName = data.user.user_metadata.full_name || "there";

  return (
    <div className="flex min-h-screen items-center justify-center bg-sand p-4">
      <OnboardingClient userName={fullName} userId={data.user.id} />
    </div>
  );
}
