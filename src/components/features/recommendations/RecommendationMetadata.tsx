"use client";
import { CalendarDays, Clock, Tag, Users } from "lucide-react";

export function RecommendationMetadata({
  date,
  time,
  spots,
  price,
}: {
  date: string;
  time: string;
  spots: number;
  price: string;
}) {
  const items = [
    { icon: CalendarDays, label: date },
    { icon: Clock, label: time },
    { icon: Users, label: `${spots} spots left` },
    { icon: Tag, label: price },
  ];

  return (
    <ul className="flex flex-wrap gap-2.5">
      {items.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className="flex items-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground"
        >
          <Icon className="size-4 text-sage" aria-hidden="true" />
          {label}
        </li>
      ))}
    </ul>
  );
}
