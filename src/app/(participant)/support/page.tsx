import { AppShell } from "@/components/layout/AppShell";
import { SupportHubClient } from "./SupportHubClient";
import { createClient } from "@/utils/supabase/server";
import { supportOpportunities as mockOpportunities, type SupportOpportunity } from "@/data/support";

export default async function SupportHubPage() {
  const supabase = await createClient();
  const { data: opportunities, error } = await supabase.from("support_opportunities").select("*");

  let mergedOpportunities: SupportOpportunity[] = [...mockOpportunities];

  if (opportunities && !error) {
    const dbOpportunities: SupportOpportunity[] = opportunities.map(row => {
      const meta = row.metadata || {};
      return {
        id: row.id,
        title: row.title,
        type: row.type,
        category: meta.category || (meta.badge === "Support" ? "peer-support" : "Free Sessions"),
        description: row.description,
        organizationName: row.provider_name,
        verified: true,
        date: row.date,
        time: row.time,
        availability: `${row.spots} spots left`,
        meetLink: row.meeting_link,
        price: meta.priceType === "Paid" ? `$${meta.price}` : "Free",
        priceType: meta.priceType || "Free",
        tone: meta.tone || "mist",
        details: meta.details || {
          whoItsFor: "Anyone",
          whatYouDo: "Participate in this session",
          whatToExpect: "A welcoming environment",
          duration: "60 mins",
          facilitator: row.provider_name
        }
      };
    });

    // Merge the real sessions at the top, followed by all mock items for demo purposes
    mergedOpportunities = [...dbOpportunities, ...mockOpportunities];
  }

  return (
    <AppShell breadcrumb="Support Hub">
      <SupportHubClient opportunities={mergedOpportunities} />
    </AppShell>
  );
}
