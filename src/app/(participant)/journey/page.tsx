import { AppShell } from "@/components/layout/AppShell";
import {
  CheckInCard,
  EncouragementCard,
  JourneyFocusCard,
  NextStepCard,
  SupportBanner,
  UpcomingSupportCard,
  AdvisorCard,
} from "@/components/shared/cards";
import { Greeting } from "@/components/shared/Greeting";
import { createClient } from "@/utils/supabase/server";

export default async function JourneyScreen() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  let firstName = "";
  let latestCheckIn: any = null;
  let upcomingSession: any = null;
  let advisorInfo: any = null;

  if (userData?.user) {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("first_name, advisor_id")
      .eq("id", userData.user.id)
      .single();
    
    if (profileData) {
      firstName = profileData.first_name;
    }

    const { data: checkInData } = await supabase
      .from("check_ins")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
      
    if (checkInData) {
      latestCheckIn = checkInData;
    }

    const { data: sessionData } = await supabase
      .from("support_opportunities")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(1)
      .single();

    if (sessionData) {
      upcomingSession = {
        title: sessionData.title,
        dateLabel: sessionData.date,
        timeLabel: sessionData.time,
        description: sessionData.description,
        status: "Upcoming",
      };
    }
    
    if (profileData?.advisor_id) {
      const { data: advData } = await supabase
        .from("profiles")
        .select("full_name, meet_link, meet_time")
        .eq("id", profileData.advisor_id)
        .single();
      if (advData) {
        advisorInfo = advData;
      }
    }
  }

  return (
    <AppShell>
      <div className="rc-enter flex flex-col gap-6">
        <header>
          <Greeting firstName={firstName} />
          <p className="mt-2 text-[15px] text-muted-foreground">
            Let's continue your journey toward a stronger tomorrow.
          </p>
        </header>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.9fr_1fr]">
          <div className="flex flex-col gap-6">
            {advisorInfo && (
              <AdvisorCard advisorInfo={advisorInfo} />
            )}
            <JourneyFocusCard 
              focusTitle={latestCheckIn ? latestCheckIn.goal : undefined}
              focusDescription={latestCheckIn ? `You are currently focusing on overcoming: ${latestCheckIn.barrier}` : undefined}
              progress={latestCheckIn ? 15 : 0}
            />
            <NextStepCard />
          </div>
          <div className="flex flex-col gap-6">
            <UpcomingSupportCard session={upcomingSession || undefined} />
            <CheckInCard 
              title={latestCheckIn ? "Update Check-in" : undefined}
              description={latestCheckIn ? `Last checked in on ${new Date(latestCheckIn.created_at).toLocaleDateString()}` : undefined}
              buttonText={latestCheckIn ? "Check-in Again" : undefined}
            />
            <EncouragementCard />
          </div>
        </div>

        <SupportBanner />
      </div>
    </AppShell>
  );
}
