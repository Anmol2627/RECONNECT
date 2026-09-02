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

  // We want to fetch users they can chat with. 
  // For the MVP demo, we will just fetch all Organizations.
  // In a real app, this would be based on connections or past messages.
  const { data: orgs } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("role", "organization");

  // If the current user is an org, they should see participants who have messaged them.
  // For simplicity, let's just fetch all participants.
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
