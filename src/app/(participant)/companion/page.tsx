import { createClient } from "@/utils/supabase/server";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { redirect } from "next/navigation";
import { CompanionClient } from "./CompanionClient";

export default async function CompanionPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    redirect("/login");
  }

  const currentUserId = userData.user.id;

  return (
    <AppShell breadcrumb="My Companion">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <PageHeader 
          title="Your AI Guide" 
          description="A personal companion that understands your goals and is always here to talk." 
        />
        
        <CompanionClient currentUserId={currentUserId} />
      </div>
    </AppShell>
  );
}
