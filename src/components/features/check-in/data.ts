"use client";
import {
  ArrowLeftRight,
  Clock,
  Frown,
  GraduationCap,
  HandHeart,
  HeartPulse,
  Meh,
  MoreHorizontal,
  Smile,
  UserRound,
  Users,
} from "lucide-react";

export type FeelingId = "doing-well" | "difficulty" | "very-difficult";

export type FeelingOptionData = {
  id: FeelingId;
  title: string;
  description: string;
  icon: React.ElementType;
  tone: "sage" | "gold" | "rose";
};

export type BarrierId =
  | "low-confidence"
  | "lack-of-skills"
  | "accessing-support"
  | "schedule-time"
  | "socially-disconnected"
  | "different-support"
  | "health-wellbeing"
  | "something-else";

export type BarrierOptionData = {
  id: BarrierId;
  label: string;
  icon: React.ElementType;
};

export type CheckInData = {
  feeling: FeelingId | null;
  barriers: BarrierId[];
  notes: string;
  timestamp: number;
};

export const CHECK_IN_STORAGE_KEY = "reconnect.check-in";
export const NOTES_MAX_LENGTH = 300;

export const feelings: FeelingOptionData[] = [
  {
    id: "doing-well",
    title: "I'm doing well",
    description: "Things are going as expected.",
    icon: Smile,
    tone: "sage",
  },
  {
    id: "difficulty",
    title: "I'm facing some difficulty",
    description: "I could use some support.",
    icon: Meh,
    tone: "gold",
  },
  {
    id: "very-difficult",
    title: "I'm finding it very difficult",
    description: "I need more help right now.",
    icon: Frown,
    tone: "rose",
  },
];

export const barriers: BarrierOptionData[] = [
  { id: "low-confidence", label: "Low confidence", icon: UserRound },
  { id: "lack-of-skills", label: "Lack of required skills", icon: GraduationCap },
  { id: "accessing-support", label: "Difficulty accessing support", icon: HandHeart },
  { id: "schedule-time", label: "Schedule / time issues", icon: Clock },
  { id: "socially-disconnected", label: "Feeling socially disconnected", icon: Users },
  { id: "different-support", label: "Need different support", icon: ArrowLeftRight },
  { id: "health-wellbeing", label: "Health / wellbeing challenges", icon: HeartPulse },
  { id: "something-else", label: "Something else", icon: MoreHorizontal },
];

export const checkInSteps = [
  { id: 1, label: "How are you?" },
  { id: 2, label: "What's getting in the way?" },
  { id: 3, label: "Additional details" },
];

export function saveCheckIn(data: CheckInData) {
  try {
    localStorage.setItem(CHECK_IN_STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable — prototype keeps in-memory state */
  }
}

export function loadCheckIn(): CheckInData | null {
  try {
    const raw = localStorage.getItem(CHECK_IN_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CheckInData) : null;
  } catch {
    return null;
  }
}
