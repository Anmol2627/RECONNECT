import { AppShell } from "@/components/layout/AppShell";
import { RecommendationsClient } from "./RecommendationsClient";
import { getRecommendation, type Recommendation, type SupportOpportunity } from "@/data/recommendations";
import { createClient } from "@/utils/supabase/server";

export default async function RecommendationPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  let recommendationData = getRecommendation(); // Fallback to mock

  if (userData?.user) {
    // 1. Fetch latest check-in
    const { data: checkInData } = await supabase
      .from("check_ins")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    // 2. Fetch support opportunities
    const { data: opportunities, error } = await supabase
      .from("support_opportunities")
      .select("*");

    // 3. Match algorithm (if we have DB data with tags)
    if (opportunities && opportunities.length > 0 && !error && opportunities[0].tags) {
      const userBarrier = checkInData?.barrier || "";
      
      let bestMatchIdx = 0;
      let maxScore = -1;

      // Simple scoring based on tags array containing the barrier string
      opportunities.forEach((opp, idx) => {
        let score = 0;
        if (opp.tags && opp.tags.some((t: string) => userBarrier.includes(t))) {
          score += 10;
        }
        if (score > maxScore) {
          maxScore = score;
          bestMatchIdx = idx;
        }
      });

      const bestOpp = opportunities[bestMatchIdx];
      const altOpps = opportunities.filter((_, idx) => idx !== bestMatchIdx);

      // Map DB row to Recommendation type
      const mapToSupportOpportunity = (row: any): SupportOpportunity => {
        const meta = row.metadata || {};
        return {
          id: row.id,
          title: row.title,
          type: row.type,
          badge: meta.badge || "Support",
          description: row.description,
          icon: meta.icon || "laptop",
          tone: meta.tone || "mist",
          details: meta.details || {
            whoItsFor: "Anyone",
            whatYouDo: "Participate in this session",
            whatToExpect: "A welcoming environment",
            duration: "60 mins",
            facilitator: row.provider_name
          }
        };
      };

      const bestRec: Recommendation = {
        ...mapToSupportOpportunity(bestOpp),
        date: bestOpp.date,
        time: bestOpp.time,
        spots: bestOpp.spots || 20,
        price: "Free",
        provider: {
          name: bestOpp.provider_name,
          verified: true,
          external: false,
        },
        reason: {
          goal: checkInData?.goal || "Progress",
          barrier: userBarrier || "Challenges",
          supportNeed: checkInData?.support_need || "Support",
          text: `This matches your recent focus on overcoming ${userBarrier || "challenges"}.`
        }
      };

      recommendationData = {
        steps: recommendationData.steps,
        best: bestRec,
        alternatives: altOpps.map(mapToSupportOpportunity),
      };
    }
  }

  return (
    <AppShell breadcrumb="Recommendations">
      <RecommendationsClient {...recommendationData} />
    </AppShell>
  );
}
