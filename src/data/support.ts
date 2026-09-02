/**
 * Mock support data for the Support Hub.
 * Shape mirrors the future Supabase schema so the UI can switch to live data
 * without changes to components.
 */

export type SupportCategory = "Free Sessions" | "Peer Groups" | "Programs" | "Courses";

export type SupportAreaId =
  | "confidence-communication"
  | "employment-readiness"
  | "daily-living-wellbeing"
  | "education-skills";

export type SupportOpportunity = {
  id: string;
  title: string;
  description: string;
  type: string;
  category: SupportCategory;
  supportArea: SupportAreaId;
  organizationId: string;
  organizationName: string;
  verified: boolean;
  date?: string;
  time?: string;
  availability?: string;
  price: "Free" | "Paid";
  deliveryMode: "In person" | "Online" | "Self-guided";
  facilitator?: string;
  suggested?: boolean;
  meetLink?: string;
};

export type SupportArea = {
  id: SupportAreaId;
  label: string;
  icon: "heart" | "briefcase" | "leaf" | "book";
  tone: "sage" | "peach" | "lilac" | "terracotta";
};

export const supportAreas: SupportArea[] = [
  { id: "confidence-communication", label: "Confidence & Communication", icon: "heart", tone: "sage" },
  { id: "employment-readiness", label: "Employment Readiness", icon: "briefcase", tone: "peach" },
  { id: "daily-living-wellbeing", label: "Daily Living & Wellbeing", icon: "leaf", tone: "lilac" },
  { id: "education-skills", label: "Education & Skills", icon: "book", tone: "terracotta" },
];

export const supportCategories = [
  {
    id: "free-sessions",
    title: "Free Sessions",
    description: "Join guided group sessions led by experts. Learn and connect with others.",
    action: "View all sessions",
    to: "/sessions",
    icon: "users" as const,
    tone: "sage" as const,
  },
  {
    id: "peer-groups",
    title: "Peer Groups",
    description: "Connect with others working towards similar goals. Share, learn and grow together.",
    action: "Explore groups",
    to: "/groups",
    icon: "userRound" as const,
    tone: "peach" as const,
  },
  {
    id: "programs",
    title: "Programs",
    description: "Explore rehabilitation and support programs designed to help you progress.",
    action: "View programs",
    to: "/programs",
    icon: "clipboard" as const,
    tone: "lilac" as const,
  },
  {
    id: "courses",
    title: "Courses",
    description: "Build new skills with structured courses from trusted organizations.",
    action: "Browse courses",
    to: "/courses",
    icon: "graduation" as const,
    tone: "terracotta" as const,
  },
];

export const supportOpportunities: SupportOpportunity[] = [
  {
    id: "employment-confidence-cohort",
    title: "Employment Confidence Cohort",
    description:
      "A supportive session to help you build confidence in workplace interactions.",
    type: "Group Session",
    category: "Free Sessions",
    supportArea: "confidence-communication",
    organizationId: "pathways",
    organizationName: "Pathways Rehabilitation Centre",
    verified: true,
    date: "Thursday, 16 May",
    time: "4:00 PM",
    availability: "8 spots left",
    price: "Free",
    deliveryMode: "In person",
    facilitator: "Meera Iyer, Employment Facilitator",
    suggested: true,
  },
  {
    id: "interview-practice-activity",
    title: "Interview Practice Activity",
    description:
      "Practise answering common interview questions at your own pace, with gentle prompts.",
    type: "Self-guided",
    category: "Courses",
    supportArea: "employment-readiness",
    organizationId: "bridge-forward",
    organizationName: "Bridge Forward Centre",
    verified: true,
    availability: "Open to join",
    price: "Free",
    deliveryMode: "Self-guided",
    suggested: true,
  },
  {
    id: "digital-skills-foundation",
    title: "Digital Skills Foundation Course",
    description:
      "Learn everyday digital skills, from email to online forms, in short guided modules.",
    type: "Course",
    category: "Courses",
    supportArea: "education-skills",
    organizationId: "hopeworks",
    organizationName: "HopeWorks Foundation",
    verified: true,
    date: "Starts Monday, 20 May",
    time: "6:00 PM",
    availability: "Rolling intake",
    price: "Paid",
    deliveryMode: "Online",
    suggested: true,
  },
  {
    id: "daily-routine-support-group",
    title: "Daily Routine Support Group",
    description:
      "A calm weekly group focused on building routines that feel manageable for you.",
    type: "Peer Group",
    category: "Peer Groups",
    supportArea: "daily-living-wellbeing",
    organizationId: "hopeworks",
    organizationName: "HopeWorks Foundation",
    verified: true,
    date: "Tuesdays",
    time: "11:00 AM",
    availability: "5 spots left",
    price: "Free",
    deliveryMode: "In person",
    suggested: true,
  },
  {
    id: "confidence-peer-circle",
    title: "Confidence Peer Circle",
    description:
      "A small circle where people share what helps them speak up in everyday situations.",
    type: "Peer Group",
    category: "Peer Groups",
    supportArea: "confidence-communication",
    organizationId: "bridge-forward",
    organizationName: "Bridge Forward Centre",
    verified: true,
    date: "Fridays",
    time: "2:00 PM",
    availability: "Open to join",
    price: "Free",
    deliveryMode: "Online",
  },
  {
    id: "one-to-one-mentoring",
    title: "One-to-one Mentoring Conversations",
    description:
      "Private sessions with a mentor to talk through what you would like support with next.",
    type: "One-to-one support",
    category: "Programs",
    supportArea: "employment-readiness",
    organizationId: "pathways",
    organizationName: "Pathways Rehabilitation Centre",
    verified: true,
    date: "By arrangement",
    availability: "Waiting list open",
    price: "Free",
    deliveryMode: "In person",
  },
];

export function filterOpportunities(
  opportunities: SupportOpportunity[],
  { area, query }: { area: SupportAreaId | null; query: string },
) {
  const trimmed = query.trim().toLowerCase();

  return opportunities.filter((opportunity) => {
    const matchesArea = !area || opportunity.supportArea === area;
    const matchesQuery =
      !trimmed ||
      [
        opportunity.title,
        opportunity.category,
        opportunity.type,
        opportunity.organizationName,
        supportAreas.find((a) => a.id === opportunity.supportArea)?.label ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(trimmed);

    return matchesArea && matchesQuery;
  });
}
