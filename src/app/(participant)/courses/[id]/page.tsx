"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Clock3, Play, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CourseIllustration } from "@/components/shared/illustrations";
import { AppShell } from "@/components/layout/AppShell";
import { courses } from "@/data/courses";


function WorkplaceCommunicationPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [progress, setProgress] = useState(60);
  const course = courses[0];

  useEffect(() => {
    const stored = window.localStorage.getItem("reconnect-course-progress");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Record<string, number>;
        if (typeof parsed[course.id] === "number") setProgress(parsed[course.id]);
      } catch { /* Keep the course's demo progress when storage is unavailable. */ }
    }
  }, [course.id]);

  const completeModule = () => {
    const nextProgress = Math.min(100, Math.max(progress + 10, 25));
    setProgress(nextProgress);
    const stored = window.localStorage.getItem("reconnect-course-progress");
    let current: Record<string, number> = {};
    try { current = stored ? JSON.parse(stored) as Record<string, number> : {}; } catch { current = {}; }
    window.localStorage.setItem("reconnect-course-progress", JSON.stringify({ ...current, [course.id]: nextProgress }));
  };

  return <AppShell search={search} onSearchChange={setSearch}><div className="mb-5"><Link href="/courses" className="inline-flex items-center gap-2 text-sm font-medium text-reconnect-forest transition-colors hover:text-reconnect-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-reconnect-sage"><ArrowLeft size={17} /> Back to courses</Link></div><section className="reconnect-card overflow-hidden"><div className="grid gap-8 bg-reconnect-cream px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-center"><div><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-reconnect-sage"><Sparkles size={15} /> {course.category}</div><h1 className="mt-4 max-w-2xl font-display text-[40px] leading-[1.05] text-reconnect-text sm:text-[48px]">{course.title}</h1><p className="mt-5 max-w-2xl text-[16px] leading-7 text-reconnect-text/75">A practical place to build confidence for everyday workplace conversations, one small step at a time.</p><div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-reconnect-text/70"><span className="inline-flex items-center gap-2"><Clock3 size={15} /> {course.duration}</span><span>{course.difficulty}</span><span>{course.type}</span></div><p className="mt-5 text-xs text-reconnect-text/65">Provided by {course.providerName} <Check size={14} className="inline text-reconnect-sage" /></p></div><CourseIllustration type="communication" className="h-48 w-full" /></div><div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1fr)_300px]"><div><h2 className="font-display text-[25px] text-reconnect-text">Your next step</h2><p className="mt-2 text-sm leading-6 text-reconnect-text/70">Continue with the next module whenever you have a few quiet minutes.</p><div className="mt-6 h-3 overflow-hidden rounded-full bg-reconnect-sage-soft"><div className="h-full rounded-full bg-reconnect-sage transition-[width] duration-500" style={{ width: `${progress}%` }} /></div><div className="mt-2 flex justify-between text-xs text-reconnect-text/65"><span>{progress}% complete</span><span>{progress >= 100 ? "Course complete" : "Keep going"}</span></div><Button type="button" onClick={completeModule} className="mt-7 h-11 rounded-lg bg-reconnect-forest px-5 text-sm font-semibold text-primary-foreground shadow-none hover:bg-reconnect-forest-deep">{progress >= 100 ? "Review course" : "Complete a module"} <ArrowRight size={17} /></Button></div><div className="rounded-xl bg-reconnect-sage-soft/55 p-5"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-reconnect-forest">Course modules</p><ol className="mt-4 space-y-3">{course.modules.map((module, index) => <li key={module} className={`flex items-start gap-3 text-sm ${index === 0 && progress > 0 ? "text-reconnect-forest" : "text-reconnect-text/70"}`}><span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${index === 0 && progress > 0 ? "bg-reconnect-sage text-primary-foreground" : "bg-reconnect-surface text-reconnect-text/60"}`}>{index === 0 && progress > 0 ? <Check size={14} /> : index + 1}</span><span className="pt-1">{module}</span></li>)}</ol></div></div></section><div className="mt-6 flex items-center gap-3 text-xs text-reconnect-text/60"><Play size={14} className="text-reconnect-sage" /> Your progress is saved on this device.</div><button type="button" onClick={() => router.push("/courses")} className="sr-only">Return to courses</button></AppShell>;
}
export default WorkplaceCommunicationPage;
