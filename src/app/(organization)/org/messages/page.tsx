import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { MessagesClient } from "@/app/(participant)/messages/MessagesClient";

export default async function OrgMessagesPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    redirect("/login");
  }

  const currentUserId = userData.user.id;
  const currentUserMeta = userData.user.user_metadata;

  // Fetch all participants (restored to show chat history for MVP)
  const { data: participants } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("role", "participant");

  const availableUsers = participants || [];

  const currentUser = {
    id: currentUserId,
    full_name: currentUserMeta.full_name || "User"
  };

  return (
    <div className="p-8">
      <div>
        <h1 className="font-display text-3xl text-[#183626]">Messages</h1>
        <p className="mt-2 text-sm text-[#8E9E8E]">
          Stay connected with the participants you support.
        </p>
      </div>
      <div className="mt-4 rounded-3xl bg-white shadow-sm ring-1 ring-black/5 p-4">
        <MessagesClient currentUser={currentUser} availableUsers={availableUsers} />
      </div>
    </div>
  );
}
