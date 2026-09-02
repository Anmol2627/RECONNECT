"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Menu, Search } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { mockNotifications } from "@/data/mock";
import { useAppContext } from "@/context/AppContext";

type TopBarProps = {
  onOpenNav?: () => void;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
};

export function TopBar({
  onOpenNav,
  searchPlaceholder = "Search anything...",
  searchValue,
  onSearchChange
}: TopBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const { state: { user } } = useAppContext();

  const isControlled = searchValue !== undefined;
  const currentQuery = isControlled ? searchValue : query;
  
  const handleSearchChange = (val: string) => {
    if (!isControlled) setQuery(val);
    onSearchChange?.(val);
  };

  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-end">
      <div className="flex items-center gap-3 xl:hidden mb-2">
        {onOpenNav ? (
          <button
            type="button"
            onClick={onOpenNav}
            aria-label="Open navigation menu"
            className="grid size-11 place-items-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Menu className="size-5" strokeWidth={1.75} aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <div className="flex items-center gap-3 xl:ml-auto">
        <form
          role="search"
          className="relative w-full sm:w-80"
          onSubmit={(event) => {
            event.preventDefault();
            if (!isControlled) router.push("/search");
          }}
        >
          <label htmlFor="reconnect-search" className="sr-only">
            {searchPlaceholder}
          </label>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <input
            id="reconnect-search"
            type="search"
            value={currentQuery}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
            className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus:border-sage"
          />
        </form>

        <Popover>
          <PopoverTrigger
            aria-label="Notifications, 2 unread"
            className="relative grid size-11 shrink-0 place-items-center rounded-xl text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-card border border-border"
          >
            <Bell className="size-5" strokeWidth={1.75} aria-hidden="true" />
            <span
              aria-hidden="true"
              className="absolute right-2.5 top-2.5 size-2 rounded-full bg-terracotta ring-2 ring-background"
            />
          </PopoverTrigger>
          <PopoverContent align="end" className="w-72 rounded-2xl p-2">
            <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Notifications
            </p>
            <ul className="flex flex-col">
              {mockNotifications.map((item) => (
                <li key={item.id} className="rounded-xl px-2 py-2 hover:bg-secondary">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="mt-0.5 text-[13px] leading-snug text-muted-foreground">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>

        <span
          aria-hidden="true"
          className="grid size-11 shrink-0 place-items-center rounded-full bg-sage-soft text-sm font-semibold text-forest"
        >
          {user.initials}
        </span>
      </div>
    </div>
  );
}
