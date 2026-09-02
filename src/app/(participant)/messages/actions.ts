"use server";

import { createClient } from "@/utils/supabase/server";

export async function sendMessage(receiverId: string, content: string) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) throw new Error("Must be logged in");

  const { data, error } = await supabase.from("messages").insert({
    sender_id: userData.user.id,
    receiver_id: receiverId,
    content
  }).select().single();

  if (error) {
    console.error("Error sending message:", error);
    throw new Error("Failed to send message");
  }

  return data;
}
