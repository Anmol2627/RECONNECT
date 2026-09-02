"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Calendar,
  BookOpen,
  Sparkles,
  Users2,
  Folder,
  MessageSquare,
  BarChart,
  Settings,
  Headset,
  ChevronDown,
  Building2,
  Leaf
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/org/dashboard", icon: LayoutDashboard },
  { name: "Participants", href: "/org/dashboard", icon: Users },
  { name: "Journey & Progress", href: "/org/dashboard", icon: TrendingUp },
  { name: "Sessions & Groups", href: "/org/dashboard", icon: Calendar },
  { name: "Courses & Programs", href: "/org/dashboard", icon: BookOpen },
  { name: "Recommendations", href: "/org/dashboard", icon: Sparkles },
  { name: "Cohorts", href: "/org/dashboard", icon: Users2, badge: "New" },
  { name: "Resources", href: "/org/dashboard", icon: Folder },
  { name: "Messages", href: "/org/messages", icon: MessageSquare, count: 8 },
  { name: "Reports & Analytics", href: "/org/dashboard", icon: BarChart },
  { name: "Settings", href: "/org/dashboard", icon: Settings },
];

export function OrgSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col bg-[#163323] text-[#AABBAA] md:flex">
      <div className="flex h-20 items-center px-6">
        <Link href="/org/dashboard" className="flex items-center gap-3 text-white">
          <Leaf className="h-6 w-6 text-[#E4C8A6]" />
          <div>
            <div className="font-display text-lg leading-none tracking-wide text-white">
              RECONNECT
            </div>
            <div className="text-[10px] leading-tight text-[#AABBAA]">
              For Organizations
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-4 scrollbar-hide">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#284835] text-white"
                  : "hover:bg-[#1E3E2B] hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-white" : "text-[#8E9E8E]"}`}
                />
                {item.name}
              </div>
              {item.badge && (
                <span className="rounded-full bg-[#1A3F2A] px-2 py-0.5 text-[10px] font-medium text-white ring-1 ring-[#3D5C4A]">
                  {item.badge}
                </span>
              )}
              {item.count && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E57B5C] text-[10px] font-bold text-white">
                  {item.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <div className="rounded-xl bg-[#1E3E2B] p-4">
          <h4 className="text-sm font-semibold text-white">Need help?</h4>
          <p className="mt-1 text-xs text-[#AABBAA]">
            Our team is here to support you.
          </p>
          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-[#3D5C4A] bg-transparent py-2 text-xs font-medium text-white transition-colors hover:bg-[#284835]">
            <Headset className="h-4 w-4" />
            Contact Support
          </button>
        </div>
      </div>

      <div className="border-t border-[#284835] p-4">
        <button className="flex w-full items-center justify-between rounded-lg p-2 hover:bg-[#1E3E2B]">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#284835]">
              <Building2 className="h-4 w-4 text-[#AABBAA]" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-white">HopeBridge Foundation</div>
              <div className="text-[10px] text-[#AABBAA]">Organization Admin</div>
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-[#AABBAA]" />
        </button>
      </div>
    </aside>
  );
}
