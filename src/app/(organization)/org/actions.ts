"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function createSessionAction(formData: FormData) {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    throw new Error("You must be logged in as an organization.");
  }

  // Double check role
  const role = userData.user.user_metadata.role;
  if (role !== "organization") {
    throw new Error("Only organizations can create sessions.");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as string || "Facilitated Group";
  const priceType = formData.get("priceType") as string || "Free";
  const price = formData.get("price") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const meetingLink = formData.get("meetingLink") as string;
  const tagStr = formData.get("tags") as string;

  const tags = tagStr.split(",").map(t => t.trim()).filter(Boolean);
  
  const categoryMap: Record<string, string> = {
    "Group Session": "Free Sessions", // Default
    "Course": "Courses",
    "Program": "Programs"
  };

  const { error } = await supabase.from("support_opportunities").insert({
    org_id: userData.user.id,
    title,
    type: type,
    description,
    provider_name: userData.user.user_metadata.full_name,
    date,
    time,
    spots: 25,
    tags,
    meeting_link: meetingLink,
    metadata: {
      category: categoryMap[type] || "Free Sessions",
      priceType,
      price: priceType === "Paid" ? parseInt(price) || 0 : 0,
      badge: "New",
      icon: type === "Course" ? "laptop" : type === "Program" ? "mentor" : "users",
      tone: type === "Course" ? "terracotta" : type === "Program" ? "peach" : "sage",
      details: {
        whoItsFor: "Anyone looking for support",
        whatYouDo: "A guided experience with our facilitators.",
        whatToExpect: "Safe space and community",
        duration: "60 mins"
      }
    }
  });

  if (error) {
    console.error("Error creating session:", error);
    throw new Error("Failed to create session.");
  }

  revalidatePath("/org/dashboard");
  return { success: true };
}
