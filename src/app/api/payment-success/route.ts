import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const checkoutSessionId = searchParams.get("session_id");
  const supportSessionId = searchParams.get("support_session_id");
  const returnUrl = searchParams.get("return_url") || "/journey";

  if (!checkoutSessionId || !supportSessionId) {
    return NextResponse.redirect(new URL(`${returnUrl}?error=missing_params`, req.url));
  }

  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.redirect(new URL(`${returnUrl}?error=unauthorized`, req.url));
    }

    // Check if already RSVP'd
    const { data: existing } = await supabase
      .from("support_session_participants")
      .select("*")
      .eq("session_id", supportSessionId)
      .eq("participant_id", user.id)
      .single();

    if (!existing) {
      // Insert into participants table
      const { error: insertError } = await supabase.from("support_session_participants").insert({
        session_id: supportSessionId,
        participant_id: user.id,
        status: "confirmed",
      });

      if (insertError) {
        console.error("Error inserting participant:", insertError);
        return NextResponse.redirect(new URL(`${returnUrl}?error=db_error`, req.url));
      }
    }

    // Redirect to the return url with payment success query params
    return NextResponse.redirect(new URL(`${returnUrl}?payment=success&session=${supportSessionId}&open=true`, req.url));
  } catch (err: any) {
    console.error("Payment success error:", err);
    return NextResponse.redirect(new URL(`${returnUrl}?payment=error`, req.url));
  }
}
