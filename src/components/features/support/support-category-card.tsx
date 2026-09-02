"use client";
import Link from "next/link";
import { ArrowRight, ClipboardList, GraduationCap, UserRound, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CoursesIllustration,
  GroupSessionIllustration,
  PeerGroupIllustration,
  ProgramIllustration,
} from "./illustrations";

type Tone = "sage" | "peach" | "lilac" | "terracotta";
type IconKey = "users" | "userRound" | "clipboard" | "graduation";

const icons: Record<IconKey, typeof Users> = {
  users: Users,
  userRound: UserRound,
  clipboard: ClipboardList,
  graduation: GraduationCap,
};

const illustrations: Record<IconKey, (props: { className?: string }) => React.JSX.Element> = {
  users: GroupSessionIllustration,
  userRound: PeerGroupIllustration,
  clipboard: ProgramIllustration,
  graduation: CoursesIllustration,
};

const toneStyles: Record<Tone, { badge: string; footer: string; action: string }> = {
  sage: { badge: "bg-sage-soft text-forest", footer: "bg-sage-soft/50", action: "text-forest" },
  peach: { badge: "bg-peach text-forest", footer: "bg-peach/55", action: "text-terracotta" },
  lilac: { badge: "bg-lilac-soft text-forest", footer: "bg-lilac-soft/55", action: "text-forest" },
  terracotta: {
    badge: "bg-terracotta-soft text-terracotta",
    footer: "bg-terracotta-soft/70",
    action: "text-terracotta",
  },
};

export type SupportCategoryCardProps = {
  title: string;
  description: string;
  action: string;
  to: string;
  icon: IconKey;
  tone: Tone;
};

export function SupportCategoryCard({
  title,
  description,
  action,
  to,
  icon,
  tone,
}: SupportCategoryCardProps) {
  const Icon = icons[icon];
  const Illustration = illustrations[icon];
  const styles = toneStyles[tone];

  return (
    <Link
      href={to}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
    >
      <div className="flex flex-1 flex-col p-5">
        <span className={cn("grid size-11 place-items-center rounded-full", styles.badge)}>
          <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-lg text-foreground">{title}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{description}</p>
        <Illustration className="mt-5 h-20 w-full" />
      </div>
      <div
        className={cn(
          "flex items-center justify-between px-5 py-3.5 text-sm font-medium",
          styles.footer,
          styles.action,
        )}
      >
        {action}
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
