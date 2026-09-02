/**
 * Mock session data. Shaped so it can later be fetched from a `sessions`
 * table (Lovable Cloud) without changing the UI components.
 */
export interface SessionFacilitator {
  id: string;
  name: string;
  initials: string;
  role: string;
  experience: string;
  verified: boolean;
  focusAreas: string[];
}

export interface SupportSession {
  id: string;
  title: string;
  type: string;
  description: string;
  focus: string;
  whoCanJoin: string;
  whatToExpect: string;
  date: string;
  time: string;
  participantsJoined: number;
  capacity: number;
  cost: string;
  deliveryMode: string;
  location: string;
  status: "open" | "full" | "closed";
  organizationId: string;
  organizationName: string;
  organizationDescription: string;
  verified: boolean;
  fitReason: string;
  facilitator: SessionFacilitator;
}

export const employmentConfidenceCohort: SupportSession = {
  id: "employment-confidence-cohort",
  title: "Employment Confidence Cohort",
  type: "Free Group Session",
  description:
    "Practice workplace communication, build confidence, and prepare for your next opportunity with others on a similar journey.",
  focus: "Workplace confidence & communication",
  whoCanJoin: "Participants in Reintegration Preparation stage",
  whatToExpect:
    "Activities, discussions, and practice in a safe and supportive space.",
  date: "Thu, 16 May",
  time: "4:00 PM",
  participantsJoined: 6,
  capacity: 8,
  cost: "Free",
  deliveryMode: "In person",
  location: "Pathways Centre, Community Room 2",
  status: "open",
  organizationId: "pathways-rehabilitation-centre",
  organizationName: "Pathways Rehabilitation Centre",
  organizationDescription:
    "A community rehabilitation provider offering facilitated groups, counselling and reintegration programmes. Available through RECONNECT — you do not need to be registered with the organisation to join.",
  verified: true,
  fitReason:
    "You mentioned that low confidence is making employment preparation difficult. This session focuses on building confidence in workplace interactions.",
  facilitator: {
    id: "neha-mehta",
    name: "Neha Mehta",
    initials: "NM",
    role: "Rehabilitation Counsellor",
    experience: "5+ years of experience",
    verified: true,
    focusAreas: ["Employment confidence", "Communication", "Reintegration support"],
  },
};

export const sessions: SupportSession[] = [employmentConfidenceCohort];
