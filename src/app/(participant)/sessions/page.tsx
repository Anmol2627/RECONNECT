"use client";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, Users } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { GroupIllustration } from "@/components/shared/GroupIllustration";
import { sessions } from "@/data/sessions";


function SessionsPage() {
  return (
    <AppShell>
      <section className="mt-6">
        <h2 className="text-2xl text-forest">Sessions &amp; Groups</h2>
        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          {sessions.map((session) => (
            <article key={session.id} className="rc-card p-6">
              <GroupIllustration className="w-full max-w-[300px]" />
              <span className="mt-4 inline-block rounded-full bg-secondary px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.09em] text-secondary-foreground">
                {session.type}
              </span>
              <h3 className="mt-3 text-2xl text-forest">{session.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{session.description}</p>
              <div className="mt-4 flex flex-wrap gap-5 text-sm text-foreground/75">
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-sage" aria-hidden="true" />
                  {session.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-sage" aria-hidden="true" />
                  {session.time}
                </span>
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-sage" aria-hidden="true" />
                  {session.participantsJoined} / {session.capacity} joined
                </span>
              </div>
              <Link
                href="/sessions/employment-confidence-cohort"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-terracotta px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-terracotta-hover"
              >
                View session
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

export default SessionsPage;
