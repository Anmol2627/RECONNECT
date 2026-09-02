"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Sparkles, User, BrainCircuit } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { sendMessageToAI } from "./actions";
import { PlantGrowthIllustration } from "@/components/shared/illustrations";

type AIMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
};

export function CompanionClient({ currentUserId }: { currentUserId: string }) {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const supabase = createClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("ai_conversations")
        .select("*")
        .eq("user_id", currentUserId)
        .order("created_at", { ascending: true });
      
      if (data) {
        setMessages(data);
      }
    };

    fetchMessages();
  }, [currentUserId, supabase]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim() || isTyping) return;
    
    const text = draft;
    setDraft("");
    setIsTyping(true);
    
    // Optimistically append user message so it shows instantly
    const tempId = Date.now().toString();
    setMessages(prev => [...prev, { id: tempId, role: "user", content: text, created_at: new Date().toISOString() }]);

    try {
      const response = await sendMessageToAI(text);
      
      setMessages(prev => {
        // Remove the temporary user message
        const filtered = prev.filter(m => m.id !== tempId);
        
        // Add the real user message and AI response from the database
        const newMsgs = [...filtered];
        if (response?.userMsg) newMsgs.push(response.userMsg as AIMessage);
        if (response?.aiMsg) newMsgs.push(response.aiMsg as AIMessage);
        
        return newMsgs;
      });

      setIsTyping(false);
    } catch (err) {
      console.error(err);
      setIsTyping(false);
      setDraft(text);
      // Remove temporary message on failure
      setMessages(prev => prev.filter(m => m.id !== tempId));
      alert("Failed to send message to AI. Please try again.");
    }
  };

  return (
    <div className="flex h-[calc(100vh-250px)] min-h-[600px] gap-6 mt-4">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-card rounded-2xl border border-border shadow-sm overflow-hidden relative">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-background shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest text-cream shadow-sm">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-foreground">RECONNECT Guide</h3>
              <p className="text-[13px] text-forest flex items-center gap-1">
                 <BrainCircuit className="w-3.5 h-3.5" /> AI Companion
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6 relative z-0">
          {messages.length === 0 && !isTyping && (
            <div className="flex flex-col items-center justify-center h-full text-center max-w-sm mx-auto">
              <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mb-4">
                 <Sparkles className="w-8 h-8 text-forest" />
              </div>
              <h4 className="text-lg font-bold text-foreground mb-2">Hello! I'm your RECONNECT Guide.</h4>
              <p className="text-sm text-muted-foreground">
                I'm a personal AI companion aware of your goals. You can talk to me about your progress, ask for advice on your next steps, or just vent if you're having a hard day. How can I help you today?
              </p>
            </div>
          )}
          
          {messages.map(msg => {
            const isMe = msg.role === "user";
            return (
              <div key={msg.id} className={`flex items-end gap-3 ${isMe ? 'justify-end' : 'justify-start'}`}>
                {!isMe && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest text-cream shadow-sm">
                     <Sparkles className="w-4 h-4" />
                  </div>
                )}
                <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <div className={`px-5 py-3.5 rounded-2xl max-w-[450px] text-[14px] leading-relaxed shadow-sm ${
                    isMe ? 'bg-[#E7F2DF] text-forest rounded-br-sm' : 'bg-white border border-border text-foreground rounded-bl-sm whitespace-pre-wrap'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-end gap-3 justify-start">
               <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest text-cream shadow-sm">
                  <Sparkles className="w-4 h-4" />
               </div>
               <div className="px-5 py-3.5 rounded-2xl bg-white border border-border text-foreground rounded-bl-sm shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-forest rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-forest rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-forest rounded-full animate-bounce"></span>
               </div>
            </div>
          )}

          <div ref={messagesEndRef} />
          
          <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none overflow-hidden -z-10">
            <PlantGrowthIllustration className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[800px] opacity-10" />
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-background shrink-0 relative z-10">
          <form onSubmit={handleSend} className="flex items-center gap-3">
            <div className="flex-1 flex items-center bg-white border border-border rounded-xl px-4 py-1 focus-within:border-sage focus-within:ring-1 focus-within:ring-sage shadow-sm">
               <input
                 type="text"
                 value={draft}
                 onChange={(e) => setDraft(e.target.value)}
                 disabled={isTyping}
                 placeholder="Type your message..."
                 className="flex-1 bg-transparent py-2 text-[14px] focus:outline-none placeholder:text-muted-foreground disabled:opacity-50"
               />
            </div>
            <button
              type="submit"
              disabled={!draft.trim() || isTyping}
              className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl bg-forest text-white transition-colors hover:bg-forest-deep shadow-sm disabled:opacity-50"
            >
              <Send className="h-5 w-5 ml-0.5" />
            </button>
          </form>
          <div className="mt-3 flex items-center justify-center text-[11px] font-medium text-muted-foreground text-center px-4">
             AI responses are generated based on your goals and may occasionally make mistakes. 
          </div>
        </div>
      </div>
    </div>
  );
}
