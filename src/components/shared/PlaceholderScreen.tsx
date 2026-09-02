"use client";
import { AppShell } from "./AppShell";
import { SurfaceCard } from "./cards";

export function PlaceholderScreen({
  title,
  description = "Screen coming soon.",
}: {
  title: string;
  description?: string;
}) {
  return (
    <AppShell>
      <SurfaceCard className="bg-cream rc-enter">
        <h1 className="font-display text-3xl text-forest">{title}</h1>
        <p className="mt-3 text-[15px] text-muted-foreground">{description}</p>
      </SurfaceCard>
    </AppShell>
  );
}
