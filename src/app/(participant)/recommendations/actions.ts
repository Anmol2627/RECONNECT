"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function joinSessionAction(sessionId: string) {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    throw new Error("You must be logged in to join a session.");
  }

  // Insert into user_sessions, ignoring if already exists
  const { error: insertError } = await supabase
    .from("user_sessions")
    .upsert(
      {
        user_id: userData.user.id,
        session_id: sessionId,
        status: "joined",
      },
      { onConflict: "user_id, session_id" }
    );

  if (insertError) {
    console.error("Error joining session:", insertError);
    throw new Error("Failed to join session.");
  }

  // Fetch the meeting link
  const { data: sessionData } = await supabase
    .from("support_opportunities")
    .select("meeting_link")
    .eq("id", sessionId)
    .single();

  if (sessionData?.meeting_link) {
    return { success: true, meetingLink: sessionData.meeting_link };
  } else {
    return { success: true, meetingLink: null };
  }
}
