/**
 * Mock recommendation layer.
 *
 * Future: replace `getRecommendation()` with a call to a real matching service
 * (participant journey + latest check-in + available support opportunities ->
 * current support need -> ranked opportunities -> best match + alternatives).
 */

export type SupportKind = "Facilitated Group" | "Activity" | "Course" | "1:1 Support";

export interface Provider {
  name: string;
  verified: boolean;
  external: boolean;
}

export interface SupportOpportunity {
  id: string;
  title: string;
  type: SupportKind;
  badge: string;
  description: string;
  icon: "users" | "message" | "laptop" | "mentor";
  tone: "sage" | "peach" | "mist";
  details: {
    whoItsFor: string;
    whatYouDo: string;
    whatToExpect: string;
    duration: string;
    facilitator: string;
    meetLink?: string;
  };
}

export interface RecommendationReason {
  goal: string;
  barrier: string;
  supportNeed: string;
  text: string;
}

export interface Recommendation extends SupportOpportunity {
  date: string;
  time: string;
  spots: number;
  price: string;
  provider: Provider;
  reason: RecommendationReason;
}

export interface RecommendationResult {
  steps: { label: string; state: "complete" | "active" }[];
  best: Recommendation;
  alternatives: SupportOpportunity[];
}

const bestMatch: Recommendation = {
  id: "employment-confidence-cohort",
  title: "Employment Confidence Cohort",
  type: "Facilitated Group",
  badge: "Best match",
  description:
    "A free, supportive group session where you can practice workplace communication and build confidence with others who are on a similar journey.",
  icon: "users",
  tone: "sage",
  date: "Thursday, 16 May",
  time: "4:00 PM",
  spots: 8,
  price: "Free",
  provider: {
    name: "Pathways Rehabilitation Centre",
    verified: true,
    external: true,
  },
  reason: {
    goal: "Employment Readiness",
    barrier: "Low confidence",
    supportNeed: "Confidence-building",
    text: "You mentioned that low confidence is making employment preparation difficult. This session focuses on building confidence in workplace interactions.",
  },
  details: {
    whoItsFor:
      "People working towards employment who find interviews, workplaces or group settings difficult right now.",
    whatYouDo:
      "Short guided conversation practice, small-group exercises and gentle feedback. You can listen first and join in when you're ready.",
    whatToExpect:
      "A small group of 8-10 people, no pressure to share personal history, and a facilitator who keeps the space calm and respectful.",
    duration: "90 minutes, weekly for 4 weeks",
    facilitator: "Meera Iyer, employment support facilitator",
  },
};

const alternatives: SupportOpportunity[] = [
  {
    id: "interview-practice-activity",
    title: "Interview Practice Activity",
    type: "Activity",
    badge: "Self-guided",
    description: "Practice answering common interview questions on your own.",
    icon: "message",
    tone: "peach",
    details: {
      whoItsFor: "Anyone who prefers to prepare privately before joining a group.",
      whatYouDo: "Work through 12 common interview questions with prompts and example answers.",
      whatToExpect: "Fully self-paced. Nothing is shared with anyone unless you choose to.",
      duration: "About 25 minutes",
      facilitator: "Self-guided",
    },
  },
  {
    id: "digital-skills-course",
    title: "Digital Skills Foundation Course",
    type: "Course",
    badge: "Paid Course",
    description: "Build essential digital skills that can boost your employment opportunities.",
    icon: "laptop",
    tone: "mist",
    details: {
      whoItsFor: "People who want stronger everyday computer and online skills for work.",
      whatYouDo: "Six short modules covering email, documents, online safety and job portals.",
      whatToExpect: "Structured lessons with practice tasks and a certificate at the end.",
      duration: "6 weeks, about 2 hours a week",
      facilitator: "Northside Learning Trust",
    },
  },
  {
    id: "one-to-one-support",
    title: "One-to-One Support",
    type: "1:1 Support",
    badge: "1:1 Support",
    description: "Talk privately with a mentor about your challenges and next steps.",
    icon: "mentor",
    tone: "sage",
    details: {
      whoItsFor: "Anyone who would rather talk things through privately first.",
      whatYouDo: "A private conversation about what's getting in the way and what could help.",
      whatToExpect: "Confidential, unhurried, and led by what you want to talk about.",
      duration: "45 minutes",
      facilitator: "Your assigned support mentor",
    },
  },
];

export function getRecommendation(): RecommendationResult {
  return {
    steps: [
      { label: "How are you?", state: "complete" },
      { label: "What's getting in the way?", state: "complete" },
      { label: "Your recommendation", state: "active" },
    ],
    best: bestMatch,
    alternatives,
  };
}
