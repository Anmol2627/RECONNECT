"use server";

import { createClient } from "@/utils/supabase/server";

export async function sendMessageToAI(userMessage: string) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) throw new Error("Must be logged in");
  const userId = userData.user.id;

  // 1. Save user message to database
  const { data: userMsgData, error: userMsgError } = await supabase.from("ai_conversations").insert({
    user_id: userId,
    role: "user",
    content: userMessage
  }).select().single();

  if (userMsgError) {
    console.error("DB Error saving user message:", userMsgError);
    throw new Error("Failed to save message. Did you run the SQL schema?");
  }

  // 2. Fetch the user's latest check-in to provide context to the AI
  const { data: checkIns } = await supabase
    .from("check_ins")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1);

  const latestCheckIn = checkIns?.[0];

  // 3. Fetch recent conversation history
  const { data: history } = await supabase
    .from("ai_conversations")
    .select("role, content")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(10); // get last 10 messages

  // Reverse history so it's chronological for the AI
  const chronologicalHistory = (history || []).reverse().map(msg => ({
    role: msg.role,
    content: msg.content
  }));

  // 4. Construct System Prompt
  const systemPrompt = `You are a highly empathetic, supportive, and knowledgeable rehabilitation companion AI called "RECONNECT Guide". 
Your goal is to help individuals who are reintegrating into society (e.g., post-incarceration, recovering from addiction, or seeking to build independence).
Keep your responses concise, encouraging, and actionable. Don't be overly verbose. Use a warm, human tone.

User's current state based on their latest check-in:
- Primary Goal: ${latestCheckIn?.goal || "To improve their life and build a stable future."}
- Biggest Barrier: ${latestCheckIn?.barrier || "General life challenges."}
- Current Need: ${latestCheckIn?.support_need || "Support and guidance."}

Always tailor your advice to consider their barriers and goals. If they ask a general question, gently tie it back to their goals if appropriate.`;

  // 5. Call Groq API
  const groqApiKey = process.env.GROQ_API_KEY;
  
  if (!groqApiKey) {
    // Graceful fallback
    const fallbackResponse = "I'm your RECONNECT Guide! It looks like my brain isn't hooked up yet. Please add the GROQ_API_KEY to the .env.local file!";
    
    const { data: aiMsgData } = await supabase.from("ai_conversations").insert({
      user_id: userId,
      role: "assistant",
      content: fallbackResponse
    }).select().single();
    
    return { userMsg: userMsgData, aiMsg: aiMsgData };
  }

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: systemPrompt },
          ...chronologicalHistory
        ],
        temperature: 0.7,
        max_tokens: 500,
      })
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error("Groq API error body:", errorBody);
      throw new Error(`Groq API error: ${res.statusText}`);
    }

    const data = await res.json();
    const aiResponse = data.choices[0].message.content;

    // 6. Save AI response to database
    const { data: aiMsgData } = await supabase.from("ai_conversations").insert({
      user_id: userId,
      role: "assistant",
      content: aiResponse
    }).select().single();

    return { userMsg: userMsgData, aiMsg: aiMsgData };

  } catch (err) {
    console.error("Failed to generate AI response:", err);
    const { data: aiMsgData } = await supabase.from("ai_conversations").insert({
      user_id: userId,
      role: "assistant",
      content: "I'm sorry, I'm having trouble thinking right now. Please try again in a moment."
    }).select().single();

    return { userMsg: userMsgData, aiMsg: aiMsgData };
  }
}
