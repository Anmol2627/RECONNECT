"use client";

import { useState } from "react";
import { Video, Clock, Save } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export function AdvisorSettingsCard({ 
  initialLink, 
  initialTime 
}: { 
  initialLink: string; 
  initialTime: string;
}) {
  const [link, setLink] = useState(initialLink || "");
  const [time, setTime] = useState(initialTime || "");
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const handleSave = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from("profiles")
        .update({ meet_link: link, meet_time: time })
        .eq("id", user.id);
    }
    setSaving(false);
  };

  return (
    <section className="rounded-2xl border border-[#EFEFEF] bg-white p-6 shadow-sm mt-8">
      <div className="mb-6">
        <h2 className="font-display text-lg text-[#183626]">Daily Session Settings</h2>
        <p className="text-xs text-[#8E9E8E]">Set your Google Meet link and time for your assigned participants.</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-[#183626] flex items-center gap-2 mb-1">
            <Video className="w-4 h-4 text-[#5C6BC0]" /> Meeting Link
          </label>
          <input 
            type="text" 
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://meet.google.com/xxx-xxxx-xxx"
            className="w-full text-sm rounded-lg border border-[#EFEFEF] p-2.5 focus:outline-none focus:ring-1 focus:ring-[#284835]"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-[#183626] flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-[#E57B5C]" /> Daily Time
          </label>
          <input 
            type="text" 
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="e.g. 10:00 AM EST"
            className="w-full text-sm rounded-lg border border-[#EFEFEF] p-2.5 focus:outline-none focus:ring-1 focus:ring-[#284835]"
          />
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="w-full mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#284835] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#1E3E2B]"
        >
          <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </section>
  );
}
