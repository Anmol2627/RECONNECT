/**
 * Mock data layer for RECONNECT.
 *
 * Shapes here mirror the future backend tables (participants, journeys,
 * next_steps, sessions) so they can be swapped for real queries later
 * without touching the presentation components.
 */

export type Participant = {
  id: string;
  firstName: string;
  fullName: string;
  initials: string;
};

export type Journey = {
  id: string;
  focusTitle: string;
  focusDescription: string;
  progress: number;
};

export type NextStep = {
  id: string;
  title: string;
  description: string;
  modalDescription: string;
};

export type UpcomingSession = {
  id: string;
  title: string;
  dateLabel: string;
  timeLabel: string;
  description: string;
  status: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  description: string;
};

export const mockParticipant: Participant = {
  id: "participant-1",
  firstName: "Aarav",
  fullName: "Aarav Shah",
  initials: "AS",
};

export const mockJourney: Journey = {
  id: "journey-1",
  focusTitle: "Employment Readiness",
  focusDescription:
    "You're building the skills and confidence needed for your next step.",
  progress: 62,
};

export const mockNextStep: NextStep = {
  id: "next-step-1",
  title: "Practice your self-introduction",
  description:
    "A quick activity to help you speak confidently in workplace conversations.",
  modalDescription:
    "A short activity to help you feel more confident in workplace conversations.",
};

export const mockUpcomingSession: UpcomingSession = {
  id: "session-1",
  title: "Confidence Building Session",
  dateLabel: "Thursday, 16 May",
  timeLabel: "4:00 PM",
  description:
    "A supportive group session to build confidence in workplace interactions.",
  status: "Upcoming",
};

export const mockCheckIn = {
  title: "How are you feeling today?",
  description: "A quick check-in helps us suggest the right support for you.",
};

export const mockEncouragement = {
  title: "You're doing great!",
  description: "Every small step brings you closer to your goals.",
};

export const mockSupportBanner = {
  title: "Remember, you're not alone.",
  description: "We're here to support you at every step of your journey.",
};

export const mockNotifications: NotificationItem[] = [
  {
    id: "notification-1",
    title: "1 upcoming session",
    description: "Confidence Building Session · Thursday, 4:00 PM",
  },
  {
    id: "notification-2",
    title: "1 new support message",
    description: "Your support worker replied to you.",
  },
];

export function greetingFor(date: Date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
