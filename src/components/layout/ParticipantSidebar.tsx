"use client";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  ChevronRight,
  FolderOpen,
  Headset,
  Home,
  HeartHandshake,
  MessageSquare,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { mockParticipant } from "@/data/mock";
import { SproutLogo } from "../shared/illustrations";

type NavItem = { label: string; to: string; icon: LucideIcon; badge?: string };

const primaryNav: NavItem[] = [
  { label: "My Journey", to: "/journey", icon: Home },
  { label: "My Companion", to: "/companion", icon: Sparkles, badge: "AI" },
  { label: "Check-In", to: "/check-in", icon: HeartHandshake },
  { label: "Recommendations", to: "/recommendations", icon: Sparkles },
  { label: "Support Hub", to: "/support", icon: Users },
  { label: "Sessions & Groups", to: "/sessions", icon: CalendarDays },
  { label: "Courses & Programs", to: "/courses", icon: BookOpen },
  { label: "Cohorts & Community", to: "/cohorts", icon: Users, badge: "New" },
  { label: "Messages", to: "/messages", icon: MessageSquare },
];

const secondaryNav: NavItem[] = [
  { label: "My Progress", to: "/progress", icon: BarChart3 },
  { label: "Resources", to: "/resources", icon: FolderOpen },
  { label: "Settings", to: "/settings", icon: Settings },
];

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <li>
      <Link
        href={item.to}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors",
          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar",
          active && "bg-sidebar-accent text-sidebar-accent-foreground font-semibold",
        )}
      >
        <Icon className="size-[18px] shrink-0" strokeWidth={1.75} aria-hidden="true" />
        <span className="flex-1">{item.label}</span>
        {item.badge && (
          <span className="rounded-full bg-[#1A3F2A] px-2 py-0.5 text-[10px] font-medium text-white ring-1 ring-[#3D5C4A]">
            {item.badge}
          </span>
        )}
      </Link>
    </li>
  );
}

export function ParticipantSidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { state: { user } } = useAppContext();
  
  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        "flex h-full w-[264px] shrink-0 flex-col gap-6 overflow-y-auto bg-sidebar px-5 py-7 text-sidebar-foreground",
        className,
      )}
    >
      <div>
        <Link
          href="/journey"
          className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
        >
          <SproutLogo className="size-7 text-sage-light" />
          <span className="text-lg font-semibold tracking-[0.14em] text-sidebar-foreground">
            RECONNECT
          </span>
        </Link>
        <p className="mt-3 text-[13px] leading-relaxed text-sidebar-foreground/65">
          Your journey. Our support.
          <br />
          Stronger together.
        </p>
      </div>

      <ul className="flex flex-col gap-1">
        {primaryNav.map((item) => (
          <NavLink key={item.to} item={item} active={isActive(item.to)} />
        ))}
      </ul>

      <div className="border-t border-sidebar-border" role="presentation" />

      <ul className="flex flex-col gap-1">
        {secondaryNav.map((item) => (
          <NavLink key={item.to} item={item} active={isActive(item.to)} />
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-4">
        <div className="rounded-2xl bg-sidebar-accent/70 p-4">
          <p className="text-sm font-semibold text-sidebar-foreground">Need support?</p>
          <p className="mt-1 text-[13px] text-sidebar-foreground/70">We're here for you.</p>
          <Link
            href="/support"
            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-sidebar-border px-3 py-2 text-[13px] font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
          >
            <Headset className="size-4" strokeWidth={1.75} aria-hidden="true" />
            Contact Support
          </Link>
        </div>

        <div className="border-t border-sidebar-border pt-4">
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-xl transition-colors hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
          >
            <span
              aria-hidden="true"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-sidebar-accent text-sm font-semibold text-sidebar-accent-foreground"
            >
              {user.initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">{user.fullName}</span>
              <span className="block text-[13px] text-sidebar-foreground/65">View Profile</span>
            </span>
            <ChevronRight className="size-4 text-sidebar-foreground/60" aria-hidden="true" />
          </Link>
          <form action="/auth/signout" method="POST" className="mt-3">
            <button type="submit" className="w-full text-left text-[13px] text-sidebar-foreground/80 hover:text-red-500 font-medium px-2 py-1.5 rounded-md hover:bg-sidebar-accent transition-colors">
              Log out
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
