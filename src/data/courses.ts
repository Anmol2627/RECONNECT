export type CourseKind = "Self-guided course" | "Skill-building course" | "Structured program";
export type PriceType = "Free" | "Paid";

export type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  goal: string;
  type: CourseKind;
  providerId: string;
  providerName: string;
  verified: boolean;
  duration: string;
  difficulty: string;
  price: number;
  priceType: PriceType;
  progress: number;
  imageType: "communication" | "digital" | "resume";
  modules: string[];
};

export const courses: Course[] = [
  {
    id: "workplace-communication",
    title: "Workplace Communication Basics",
    description: "Learn how to communicate clearly and confidently in everyday workplace situations.",
    category: "Confidence & Communication",
    goal: "Employment Readiness",
    type: "Self-guided course",
    providerId: "pathways-rehabilitation",
    providerName: "Pathways Rehabilitation Centre",
    verified: true,
    duration: "2.5 hours",
    difficulty: "Beginner friendly",
    price: 0,
    priceType: "Free",
    progress: 60,
    imageType: "communication",
    modules: [
      "Speaking with confidence",
      "Workplace conversations",
      "Asking for help",
      "Handling difficult conversations",
    ],
  },
  {
    id: "digital-skills",
    title: "Digital Skills for Everyday Work",
    description: "Build essential digital skills to work with confidence and efficiency.",
    category: "Education & Skills",
    goal: "Learn New Skills",
    type: "Skill-building course",
    providerId: "pathways-rehabilitation",
    providerName: "Pathways Rehabilitation Centre",
    verified: true,
    duration: "3 hours",
    difficulty: "Beginner friendly",
    price: 25,
    priceType: "Paid",
    progress: 0,
    imageType: "digital",
    modules: ["Getting comfortable online", "Everyday tools", "Staying organized"],
  },
  {
    id: "resume-interview",
    title: "Resume & Interview Essentials",
    description: "Create a strong resume and prepare for interviews with confidence.",
    category: "Employment Readiness",
    goal: "Get Employment Ready",
    type: "Self-guided course",
    providerId: "hopeworks-foundation",
    providerName: "HopeWorks Foundation",
    verified: true,
    duration: "2 hours",
    difficulty: "Beginner friendly",
    price: 0,
    priceType: "Free",
    progress: 20,
    imageType: "resume",
    modules: ["Your experience on paper", "Interview preparation", "Making a plan"],
  },
  {
    id: "confidence-at-work",
    title: "Building Confidence at Work",
    description: "Practice small, practical steps that help you feel more at ease at work.",
    category: "Confidence & Communication",
    goal: "Build Confidence",
    type: "Self-guided course",
    providerId: "pathways-rehabilitation",
    providerName: "Pathways Rehabilitation Centre",
    verified: true,
    duration: "90 minutes",
    difficulty: "Gentle pace",
    price: 0,
    priceType: "Free",
    progress: 0,
    imageType: "communication",
    modules: ["Noticing your strengths", "Taking the next step"],
  },
  {
    id: "healthy-routines",
    title: "Healthy Routines for Everyday Life",
    description: "Explore simple routines that support energy, balance and wellbeing.",
    category: "Daily Living & Wellbeing",
    goal: "Improve Wellbeing",
    type: "Skill-building course",
    providerId: "wellbeing-collective",
    providerName: "The Wellbeing Collective",
    verified: true,
    duration: "2 hours",
    difficulty: "At your own pace",
    price: 0,
    priceType: "Free",
    progress: 0,
    imageType: "resume",
    modules: ["A routine that fits", "Making space for rest"],
  },
  {
    id: "workplace-tools",
    title: "Practical Tools for a New Role",
    description: "Get familiar with the everyday habits that make starting a new role easier.",
    category: "Employment Readiness",
    goal: "Get Employment Ready",
    type: "Skill-building course",
    providerId: "hopeworks-foundation",
    providerName: "HopeWorks Foundation",
    verified: true,
    duration: "2.5 hours",
    difficulty: "Beginner friendly",
    price: 0,
    priceType: "Free",
    progress: 0,
    imageType: "digital",
    modules: ["Preparing for day one", "Finding your rhythm"],
  },
];

export const programs = [
  {
    id: "employment-reintegration",
    title: "Employment Reintegration Pathway",
    description: "A structured program combining skill-building, confidence practice and guided support.",
    duration: "6 weeks",
    type: "Structured Program" as const,
    providerName: "HopeWorks Foundation",
    verified: true,
    includes: ["Courses", "Group sessions", "Activities", "Progress tracking"],
  },
];

export const goals = [
  { label: "Build Confidence", icon: "heart" as const },
  { label: "Get Employment Ready", icon: "briefcase" as const },
  { label: "Learn New Skills", icon: "monitor" as const },
  { label: "Improve Wellbeing", icon: "users" as const },
];