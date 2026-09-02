import { createClient } from "@/utils/supabase/server";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { redirect } from "next/navigation";
import { MessagesClient } from "./MessagesClient";

export default async function MessagesPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    redirect("/login");
  }

  const currentUserId = userData.user.id;
  const currentUserMeta = userData.user.user_metadata;

  // Fetch the current participant's profile to get their assigned advisor
  const { data: profile } = await supabase
    .from("profiles")
    .select("advisor_id")
    .eq("id", currentUserId)
    .single();

  let assignedAdvisor: any = null;
  if (profile?.advisor_id) {
    const { data: adv } = await supabase
      .from("profiles")
      .select("id, full_name, role")
      .eq("id", profile.advisor_id)
      .single();
    if (adv) assignedAdvisor = adv;
  }

  // We want to fetch users they can chat with. 
  // We'll fetch all Organizations so they don't lose chat history.
  const { data: orgs } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("role", "organization");

  // If the current user is an org, they should see participants who have messaged them.
  const { data: participants } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("role", "participant");

  const availableUsers = currentUserMeta.role === "organization" 
    ? (participants || []) 
    : (orgs || []);

  const currentUser = {
    id: currentUserId,
    full_name: currentUserMeta.full_name || "User"
  };

  return (
    <AppShell searchPlaceholder="Search messages...">
      <div>
        <PageHeader 
          title="Messages" 
          subtitle="Stay connected with the people supporting your journey." 
        />
        
        <MessagesClient currentUser={currentUser} availableUsers={availableUsers} />
      </div>
    </AppShell>
  );
}
