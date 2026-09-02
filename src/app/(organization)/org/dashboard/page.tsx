import { createClient } from "@/utils/supabase/server";
import { CreateSessionModal } from "@/components/features/org/CreateSessionModal";
import { Users, Calendar, Laptop, Download, Bell, ChevronDown, ArrowRight, TrendingUp, Leaf, BookOpen } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { EngagementChart, GoalsChart, ParticipantProgressStepper } from "@/components/features/org/OrgDashboardCharts";

export default async function OrgDashboardPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    redirect("/login");
  }

  // Fetch sessions created by this org
  const { data: sessions } = await supabase
    .from("support_opportunities")
    .select("*")
    .eq("org_id", userData.user.id)
    .order("created_at", { ascending: false });

  // Fetch RSVPs for these sessions
  const sessionIds = sessions?.map((s) => s.id) || [];
  const { data: rsvps } = await supabase
    .from("user_sessions")
    .select("session_id, profiles(full_name, email)")
    .in("session_id", sessionIds.length > 0 ? sessionIds : ["00000000-0000-0000-0000-000000000000"]);

  const rsvpsBySession = (rsvps || []).reduce((acc: any, rsvp: any) => {
    if (!acc[rsvp.session_id]) acc[rsvp.session_id] = [];
    acc[rsvp.session_id].push(rsvp.profiles);
    return acc;
  }, {});

  const orgName = userData.user.user_metadata.full_name || "Organization";
  const firstName = orgName.split(" ")[0] || "there";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      {/* Top Header */}
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-[#183626]">
            Good morning, {firstName} <span className="inline-block animate-wave">👋</span>
          </h1>
          <p className="mt-1 text-sm text-[#5C6BC0] md:text-[#8E9E8E]">
            Here's what's happening with your organization today.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 rounded-lg border border-[#EFEFEF] bg-white px-3 py-2 text-xs text-[#183626] md:flex">
            <Calendar className="h-4 w-4 text-[#8E9E8E]" />
            May 10 – May 16, 2025
            <ChevronDown className="ml-2 h-4 w-4 text-[#8E9E8E]" />
          </div>
          <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#EFEFEF] bg-white text-[#183626] hover:bg-gray-50">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#E57B5C] ring-2 ring-white"></span>
          </button>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4F7F4] text-sm font-bold text-[#183626]">
            {firstName.substring(0, 2).toUpperCase()}
          </div>
        </div>
      </header>

      {/* Stats Row */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Active Participants", value: "128", change: "+ 12%", icon: Users, color: "text-[#284835]", bg: "bg-[#F4F7F4]" },
          { label: "Sessions Conducted", value: "18", change: "+ 20%", icon: Calendar, color: "text-[#5C6BC0]", bg: "bg-[#F0F2FA]" },
          { label: "Programs Enrolled", value: "42", change: "+ 8%", icon: TrendingUp, color: "text-[#E57B5C]", bg: "bg-[#FDF4F1]" },
          { label: "Avg. Engagement", value: "78%", change: "+ 9%", icon: TrendingUp, color: "text-[#3D8B96]", bg: "bg-[#EFF6F7]" },
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl border border-[#EFEFEF] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#183626]">{stat.label}</div>
                <div className="font-display text-3xl text-[#183626]">{stat.value}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[11px] font-medium text-[#8E9E8E]">
              <span className="text-[#284835] flex items-center">{stat.change}</span>
              <span>vs May 3 – May 9</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column (2 cols wide) */}
        <div className="space-y-8 lg:col-span-2">
          {/* Progress Overview */}
          <section className="rounded-2xl border border-[#EFEFEF] bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg text-[#183626]">Participant Progress Overview</h2>
                <p className="text-xs text-[#8E9E8E]">Distribution of participants across journey stages</p>
              </div>
              <div className="flex items-center gap-1 rounded-lg border border-[#EFEFEF] px-3 py-1.5 text-xs font-semibold text-[#183626]">
                All Journeys <ChevronDown className="h-4 w-4 text-[#8E9E8E]" />
              </div>
            </div>
            <ParticipantProgressStepper />
            <div className="mt-8 text-center">
              <Link href="/org/dashboard" className="inline-flex items-center gap-1 text-xs font-semibold text-[#284835] hover:underline">
                View full journey analytics <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </section>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Engagement Over Time */}
            <section className="rounded-2xl border border-[#EFEFEF] bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-lg text-[#183626]">Engagement Over Time</h2>
                <span className="rounded bg-[#284835] px-2 py-1 text-[10px] font-bold text-white">78%</span>
              </div>
              <EngagementChart />
              <div className="mt-4 flex items-center justify-center gap-6 text-[10px] text-[#8E9E8E]">
                <div className="flex items-center gap-1.5">
                  <div className="h-1 w-4 rounded bg-[#284835]"></div> Your Organization
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-1 w-4 rounded border border-dashed border-[#C0CCC0] bg-transparent"></div> Platform Average
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link href="/org/dashboard" className="inline-flex items-center gap-1 text-xs font-semibold text-[#284835] hover:underline">
                  View detailed report <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </section>

            {/* Top Goals */}
            <section className="rounded-2xl border border-[#EFEFEF] bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="font-display text-lg text-[#183626]">Top Goals Being Worked On</h2>
              </div>
              <GoalsChart />
              <div className="mt-8 text-center">
                <Link href="/org/dashboard" className="inline-flex items-center gap-1 text-xs font-semibold text-[#284835] hover:underline">
                  View all goals <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </section>
          </div>
        </div>

        {/* Right Column (1 col wide) */}
        <div className="space-y-8">
          {/* Upcoming Sessions (REAL DATA) */}
          <section className="rounded-2xl border border-[#EFEFEF] bg-[#FCFDFC] p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-lg text-[#183626]">Upcoming Sessions</h2>
              <Link href="/org/dashboard" className="text-xs font-semibold text-[#284835] hover:underline">View all</Link>
            </div>
            
            <div className="space-y-4">
              {sessions && sessions.length > 0 ? (
                sessions.slice(0, 3).map((session) => {
                  const attendees = rsvpsBySession[session.id] || [];
                  const icon = session.metadata?.icon || "users";
                  const tone = session.metadata?.tone || "sage";
                  
                  const iconBg = tone === "sage" ? "bg-[#F4F7F4] text-[#284835]" 
                               : tone === "terracotta" ? "bg-[#FDF4F1] text-[#E57B5C]" 
                               : "bg-[#F0F2FA] text-[#5C6BC0]";

                  return (
                    <div key={session.id} className="flex gap-4">
                      <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
                        {icon === "laptop" ? <Laptop className="h-5 w-5" /> : <Users className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-bold text-[#183626] text-sm">{session.title}</h3>
                          <div className="text-right">
                            <div className="text-[10px] font-semibold text-[#183626]">{session.date === "Tomorrow" ? "Tomorrow" : "Upcoming"}</div>
                            <div className="text-[10px] text-[#8E9E8E]">{session.time}</div>
                          </div>
                        </div>
                        <p className="mt-1 text-xs text-[#8E9E8E]">By {session.provider_name}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="rounded bg-[#F4F7F4] px-2 py-1 text-[10px] font-bold text-[#284835]">
                            {attendees.length} joined
                          </span>
                          <span className="text-[10px] text-[#8E9E8E]">{session.spots - attendees.length} spots left</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-4 text-center text-sm text-[#8E9E8E]">
                  No upcoming sessions.
                </div>
              )}
            </div>

            <div className="mt-6 text-center">
              <CreateSessionModal />
            </div>
          </section>

          {/* Recommendations Insights */}
          <section className="rounded-2xl border border-[#EFEFEF] bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="font-display text-lg text-[#183626]">Recommendations Insights</h2>
              <p className="text-xs text-[#8E9E8E]">AI-powered insights from RECONNECT</p>
            </div>
            
            <div className="space-y-3">
              {[
                { title: "High demand for confidence building", desc: "Consider adding more group sessions.", bg: "bg-[#F4F7F4]", color: "text-[#284835]", icon: TrendingUp },
                { title: "12 participants could benefit from peer support groups.", desc: "", bg: "bg-[#FDF4F1]", color: "text-[#E57B5C]", icon: Users },
                { title: "Digital skills programs have shown the highest completion rate.", desc: "", bg: "bg-[#F0F2FA]", color: "text-[#5C6BC0]", icon: BookOpen },
              ].map((item, i) => (
                <div key={i} className="flex cursor-pointer items-start gap-3 rounded-xl p-3 transition-colors hover:bg-gray-50">
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${item.bg}`}>
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold text-[#183626]">{item.title}</h4>
                    {item.desc && <p className="mt-0.5 text-[10px] text-[#8E9E8E]">{item.desc}</p>}
                  </div>
                  <ArrowRight className="mt-1 h-3 w-3 text-[#C0CCC0]" />
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <Link href="/org/dashboard" className="inline-flex items-center gap-1 text-xs font-semibold text-[#284835] hover:underline">
                View all insights <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </section>
        </div>
      </div>

      {/* Banner */}
      <section className="mt-8 flex flex-col justify-between rounded-2xl bg-[#F4F7F4] p-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-[#E5F0E5] sm:flex">
            <Leaf className="h-6 w-6 text-[#284835]" />
          </div>
          <div>
            <h2 className="font-display text-lg text-[#183626]">Stronger support. Bigger impact.</h2>
            <p className="text-sm text-[#8E9E8E]">You're making a real difference in people's lives.</p>
          </div>
        </div>
        <button className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#284835] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#1E3E2B] sm:mt-0">
          Export Impact Report <Download className="h-4 w-4" />
        </button>
      </section>

    </div>
  );
}
