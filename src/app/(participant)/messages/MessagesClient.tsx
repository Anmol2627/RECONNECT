"use client";

import { useState, useEffect, useRef } from "react";
import { Send, User, ShieldAlert, Paperclip, Smile, MoreVertical, Search, Lock, CheckCheck } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { sendMessage } from "./actions";
import { PlantGrowthIllustration } from "@/components/shared/illustrations";

type Message = {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
};

type ChatUser = {
  id: string;
  full_name: string;
  role: string;
};

export function MessagesClient({ 
  currentUser, 
  availableUsers 
}: { 
  currentUser: { id: string, full_name: string }, 
  availableUsers: ChatUser[] 
}) {
  const [activeChat, setActiveChat] = useState<string>(availableUsers[0]?.id || "");
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const supabase = createClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch messages when activeChat changes
  useEffect(() => {
    if (!activeChat) return;

    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .or(`and(sender_id.eq.${currentUser.id},receiver_id.eq.${activeChat}),and(sender_id.eq.${activeChat},receiver_id.eq.${currentUser.id})`)
        .order("created_at", { ascending: true });
      
      if (data) setMessages(data);
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel("messages_channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const newMsg = payload.new as Message;
          // Only append if it's relevant to the current active chat
          if (
            (newMsg.sender_id === currentUser.id && newMsg.receiver_id === activeChat) ||
            (newMsg.sender_id === activeChat && newMsg.receiver_id === currentUser.id)
          ) {
            setMessages((prev) => {
              if (prev.some(m => m.id === newMsg.id)) return prev;
              return [...prev, newMsg];
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeChat, currentUser.id, supabase]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim() || !activeChat) return;
    
    const text = draft;
    setDraft(""); // Optimistic clear
    try {
      const newMsg = await sendMessage(activeChat, text);
      if (newMsg) {
        setMessages((prev) => {
          // Prevent duplicates if Realtime already appended it
          if (prev.some(m => m.id === newMsg.id)) return prev;
          return [...prev, newMsg];
        });
      }
    } catch (err) {
      console.error(err);
      setDraft(text); // Revert on failure
    }
  };

  const activeChatData = availableUsers.find(u => u.id === activeChat);

  return (
    <div className="flex h-[calc(100vh-250px)] min-h-[600px] gap-6 mt-4">
      {/* Sidebar */}
      <div className="w-1/3 flex flex-col gap-4 border-r border-border pr-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search contacts..." 
            className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage"
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
          {availableUsers.length > 0 ? availableUsers.map(user => (
            <button
              key={user.id}
              onClick={() => setActiveChat(user.id)}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-colors text-left relative ${
                activeChat === user.id ? 'bg-sage-soft border border-sage/50' : 'hover:bg-cream border border-transparent bg-card shadow-sm'
              }`}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-forest">
                <User className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                   <p className="text-[14px] font-semibold text-foreground truncate">{user.full_name}</p>
                </div>
                <p className="text-[12px] text-forest/80 font-medium truncate mt-0.5 capitalize">{user.role}</p>
              </div>
            </button>
          )) : (
            <div className="text-center text-muted-foreground text-sm py-8">No contacts available.</div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-card rounded-2xl border border-border shadow-sm overflow-hidden relative">
        {activeChatData ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border bg-background shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream text-forest">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-foreground">{activeChatData.full_name}</h3>
                  <p className="text-[13px] text-muted-foreground capitalize">{activeChatData.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                 <button className="flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground">
                   <ShieldAlert className="w-4 h-4" /> Report / Support
                 </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6 relative z-0">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground mt-10">
                  No messages yet. Send a message to start the conversation!
                </div>
              )}
              
              {messages.map(msg => {
                const isMe = msg.sender_id === currentUser.id;
                return (
                  <div key={msg.id} className={`flex items-end gap-3 ${isMe ? 'justify-end' : 'justify-start'}`}>
                    {!isMe && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream text-forest">
                         <User className="w-4 h-4" />
                      </div>
                    )}
                    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      <div className={`px-5 py-3.5 rounded-2xl max-w-[320px] sm:max-w-[400px] text-[14px] leading-relaxed shadow-sm ${
                        isMe ? 'bg-[#E7F2DF] text-forest rounded-br-sm' : 'bg-white border border-border text-foreground rounded-bl-sm'
                      }`}>
                        {msg.content}
                      </div>
                      <div className="flex items-center gap-1 mt-1.5 px-1">
                         <span className="text-[11px] font-medium text-muted-foreground">
                           {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                         </span>
                         {isMe && <CheckCheck className="w-3.5 h-3.5 text-sage" />}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
              
              <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none overflow-hidden -z-10">
                <PlantGrowthIllustration className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[800px] opacity-10" />
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-background shrink-0 relative z-10">
              <form onSubmit={handleSend} className="flex items-center gap-3">
                <div className="flex-1 flex items-center bg-white border border-border rounded-xl px-2 py-1 focus-within:border-sage focus-within:ring-1 focus-within:ring-sage shadow-sm">
                   <button type="button" className="p-2 text-muted-foreground hover:text-foreground">
                      <Paperclip className="w-5 h-5" />
                   </button>
                   <input
                     type="text"
                     value={draft}
                     onChange={(e) => setDraft(e.target.value)}
                     placeholder="Write a message..."
                     className="flex-1 bg-transparent px-2 py-2 text-[14px] focus:outline-none placeholder:text-muted-foreground"
                   />
                   <button type="button" className="p-2 text-muted-foreground hover:text-foreground">
                      <Smile className="w-5 h-5" />
                   </button>
                </div>
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl bg-forest text-white transition-colors hover:bg-forest-deep shadow-sm disabled:opacity-50"
                >
                  <Send className="h-5 w-5 ml-0.5" />
                </button>
              </form>
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                 <Lock className="w-3 h-3" /> Messages are private and secure. Let's keep this a safe space for everyone.
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
