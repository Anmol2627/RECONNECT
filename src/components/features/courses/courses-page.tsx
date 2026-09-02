"use client";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Clock3,
  Heart,
  Monitor,
  SearchX,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CourseIllustration, BotanicalIllustration } from "@/components/shared/illustrations";
import { AppShell } from "@/components/layout/AppShell";
import { courses, goals, programs, type Course } from "@/data/courses";

type Tab = "recommended" | "all" | "learning";
const STORAGE_KEY = "reconnect-course-progress";

const goalIcons = { heart: Heart, briefcase: BriefcaseBusiness, monitor: Monitor, users: UsersRound };

function CourseMeta({ course }: { course: Course }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-reconnect-text/70">
      <span className="inline-flex items-center gap-2"><Clock3 size={15} /> {course.duration}</span>
      <span className="h-3 w-px bg-reconnect-border" aria-hidden="true" />
      <span>{course.difficulty}</span>
    </div>
  );
}

function ProviderLine({ course }: { course: Course }) {
  return (
    <p className="mt-4 flex items-center gap-1.5 text-xs text-reconnect-text/65">
      <span>Provided by {course.providerName}</span>
      {course.verified && <><Check size={14} className="text-reconnect-sage" strokeWidth={2.5} /><span className="sr-only">Verified organization</span></>}
    </p>
  );
}

function CourseCard({ course, progress, onOpen, onStart }: { course: Course; progress: number; onOpen: () => void; onStart: () => void }) {
  const accent = course.imageType === "digital" ? "terracotta" : course.imageType === "resume" ? "lavender" : "forest";
  const accentClasses = {
    forest: { icon: "bg-reconnect-sage-soft text-reconnect-sage", button: "bg-reconnect-forest text-primary-foreground hover:bg-reconnect-forest-deep", badge: "bg-reconnect-sage-soft text-reconnect-forest" },
    terracotta: { icon: "bg-reconnect-peach text-reconnect-terracotta", button: "bg-reconnect-terracotta text-primary-foreground hover:bg-reconnect-terracotta/90", badge: "bg-reconnect-peach text-reconnect-terracotta" },
    lavender: { icon: "bg-reconnect-lavender text-reconnect-forest", button: "bg-reconnect-forest text-primary-foreground hover:bg-reconnect-forest-deep", badge: "bg-reconnect-lavender text-reconnect-forest" },
  }[accent];

  return (
    <article className="reconnect-card group overflow-hidden p-5 transition-shadow hover:shadow-[0_14px_35px_-24px_oklch(0.25_0.05_135_/_45%)] sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_230px] lg:items-center">
        <div className="flex min-w-0 gap-4">
          <div className={`hidden h-16 w-16 shrink-0 items-center justify-center rounded-xl text-2xl sm:flex ${accentClasses.icon}`} aria-hidden="true">
            {course.imageType === "communication" ? "◌" : course.imageType === "digital" ? "⌁" : "▤"}
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${accentClasses.badge}`}>{course.category}</span>
              {course.priceType === "Paid" && <span className="rounded-full border border-reconnect-border px-3 py-1 text-[11px] font-medium text-reconnect-text/65">Paid course</span>}
            </div>
            <button type="button" onClick={onOpen} className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-reconnect-sage focus-visible:ring-offset-4 focus-visible:ring-offset-reconnect-surface">
              <h3 className="font-display text-[23px] leading-tight text-reconnect-text transition-colors group-hover:text-reconnect-forest">{course.title}</h3>
            </button>
            <p className="mt-3 max-w-[480px] text-[13px] leading-6 text-reconnect-text/75">{course.description}</p>
            <div className="mt-5"><CourseMeta course={course} /></div>
            <ProviderLine course={course} />
          </div>
        </div>
        <div className="flex min-w-0 flex-col items-stretch gap-3 sm:flex-row sm:items-end lg:flex-col lg:items-stretch">
          <CourseIllustration type={course.imageType} className="h-[112px] w-full" />
          <Button type="button" onClick={onStart} className={`h-10 rounded-lg px-4 text-xs font-semibold shadow-none ${accentClasses.button}`}>
            {progress > 0 ? "Continue course" : course.priceType === "Paid" ? `Buy for $${course.price}` : "Start course"}<ArrowRight size={16} />
          </Button>
        </div>
      </div>
      {progress > 0 && (
        <div className="mt-5 border-t border-reconnect-border pt-4">
          <div className="flex items-center justify-between text-[11px] font-medium text-reconnect-text/65"><span>Your progress</span><span>{progress}% complete</span></div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-reconnect-sage-soft"><div className="h-full rounded-full bg-reconnect-sage transition-[width] duration-500" style={{ width: `${progress}%` }} /></div>
        </div>
      )}
    </article>
  );
}

function ContinueLearningCard({ progress, onContinue }: { progress: number; onContinue: () => void }) {
  return (
    <section className="reconnect-card relative overflow-hidden bg-reconnect-cream p-5 sm:p-6">
      <BotanicalIllustration className="pointer-events-none absolute -right-3 -top-2 h-28 w-32 opacity-70" />
      <h2 className="relative font-display text-[19px] text-reconnect-text">Continue Learning</h2>
      <div className="relative mt-5 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-reconnect-sage-soft text-reconnect-sage" aria-hidden="true"><MessageGlyph /></div>
        <div className="min-w-0"><p className="text-sm font-semibold leading-5 text-reconnect-text">Workplace Communication Basics</p><p className="mt-1 text-xs text-reconnect-text/60">{progress}% complete</p></div>
      </div>
      <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-reconnect-surface"><div className="h-full rounded-full bg-reconnect-sage transition-[width] duration-500" style={{ width: `${progress}%` }} /></div>
      <Button type="button" onClick={onContinue} className="relative mt-5 h-10 w-full rounded-lg bg-reconnect-forest text-xs font-semibold text-primary-foreground shadow-none hover:bg-reconnect-forest-deep">Continue <ArrowRight size={16} /></Button>
    </section>
  );
}

function MessageGlyph() {
  return <span className="relative block h-6 w-7" aria-hidden="true"><span className="absolute bottom-0 left-0 h-4 w-5 rounded-md border-2 border-current" /><span className="absolute right-0 top-0 h-4 w-5 rounded-md border-2 border-current" /><span className="absolute bottom-[-3px] left-1 h-2 w-2 rotate-45 border-b-2 border-l-2 border-current bg-reconnect-sage-soft" /><span className="absolute right-1 top-[-3px] h-2 w-2 rotate-45 border-r-2 border-t-2 border-current bg-reconnect-sage-soft" /></span>;
}

function BrowseByGoal({ selectedGoal, onSelect }: { selectedGoal: string | null; onSelect: (goal: string | null) => void }) {
  return (
    <section className="reconnect-card p-5 sm:p-6">
      <h2 className="font-display text-[19px] text-reconnect-text">Browse by goal</h2>
      <p className="mt-2 text-xs leading-5 text-reconnect-text/70">Find courses that match what you want to achieve.</p>
      <div className="mt-5 space-y-2">
        {goals.map((goal) => {
          const Icon = goalIcons[goal.icon];
          const active = selectedGoal === goal.label;
          return <button key={goal.label} type="button" onClick={() => onSelect(active ? null : goal.label)} className={`flex min-h-11 w-full items-center gap-3 rounded-lg border px-3 text-left text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-reconnect-sage ${active ? "border-reconnect-sage bg-reconnect-sage-soft text-reconnect-forest" : "border-reconnect-border text-reconnect-text hover:bg-reconnect-cream"}`}><Icon size={20} strokeWidth={1.7} /><span className="flex-1">{goal.label}</span><ChevronRight size={16} className="text-reconnect-text/50" /></button>;
        })}
      </div>
    </section>
  );
}

function StartHereCard() {
  return <section className="reconnect-card relative overflow-hidden bg-reconnect-peach/50 p-5 sm:p-6"><h2 className="max-w-[190px] font-display text-[19px] text-reconnect-text">Not sure where to start?</h2><p className="mt-2 max-w-[210px] text-xs leading-5 text-reconnect-text/75">Answer a few questions and we&apos;ll suggest the best courses for you.</p><Button asChild variant="outline" className="relative mt-5 h-10 rounded-lg border-reconnect-terracotta bg-reconnect-surface px-4 text-xs font-semibold text-reconnect-terracotta hover:bg-reconnect-peach"><Link href="/check-in">Help me choose <ArrowRight size={16} /></Link></Button><BotanicalIllustration className="absolute -bottom-2 right-[-14px] h-28 w-36 opacity-80" /></section>;
}

function ProgramCard({ onOpen }: { onOpen: () => void }) {
  return <article className="reconnect-card flex flex-col justify-between gap-4 bg-reconnect-sage-soft/50 p-5 sm:flex-row sm:items-center sm:p-6"><div><div className="mb-2 flex items-center gap-2"><Sparkles size={15} className="text-reconnect-sage" /><span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-reconnect-forest">Featured program</span></div><h3 className="font-display text-[21px] text-reconnect-text">{programs[0].title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-reconnect-text/70">{programs[0].description}</p><p className="mt-3 text-xs text-reconnect-text/65">{programs[0].duration} <span className="mx-2 text-reconnect-border">•</span> {programs[0].type} <span className="mx-2 text-reconnect-border">•</span> {programs[0].providerName} <Check size={13} className="inline text-reconnect-sage" /></p></div><Button type="button" onClick={onOpen} variant="outline" className="h-10 shrink-0 rounded-lg border-reconnect-forest bg-reconnect-surface px-4 text-xs font-semibold text-reconnect-forest hover:bg-reconnect-sage-soft">View program <ArrowRight size={16} /></Button></article>;
}

function CourseDetailsModal({ course, open, onOpenChange, onStart }: { course: Course | null; open: boolean; onOpenChange: (open: boolean) => void; onStart: () => void }) {
  if (!course) return null;
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="max-h-[90vh] max-w-[620px] overflow-y-auto rounded-2xl border-reconnect-border bg-reconnect-surface p-0"><div className="bg-reconnect-cream px-6 pb-5 pt-7 sm:px-8"><div className="flex items-start justify-between gap-5"><div><span className="inline-flex rounded-full bg-reconnect-sage-soft px-3 py-1 text-[11px] font-semibold text-reconnect-forest">{course.category}</span><DialogTitle className="mt-4 font-display text-[30px] leading-tight text-reconnect-text">{course.title}</DialogTitle><DialogDescription className="mt-3 text-sm leading-6 text-reconnect-text/70">{course.description}</DialogDescription></div><CourseIllustration type={course.imageType} className="hidden h-24 w-36 shrink-0 sm:block" /></div></div><div className="space-y-6 px-6 py-6 sm:px-8"><div><h3 className="font-display text-[20px] text-reconnect-text">About this course</h3><div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-reconnect-text/70"><span>{course.duration}</span><span>{course.difficulty}</span><span>{course.type}</span><span>{course.priceType} course</span></div><ProviderLine course={course} /></div><div><h3 className="font-display text-[20px] text-reconnect-text">What you&apos;ll learn</h3><ul className="mt-3 grid gap-3 sm:grid-cols-2">{course.modules.map((module) => <li key={module} className="flex items-start gap-2 text-sm text-reconnect-text/80"><Check size={17} className="mt-0.5 shrink-0 text-reconnect-sage" />{module}</li>)}</ul></div><div className="rounded-xl bg-reconnect-sage-soft/60 p-4"><p className="text-xs font-semibold text-reconnect-forest">A gentle next step</p><p className="mt-1 text-xs leading-5 text-reconnect-text/70">Work through each module at your own pace. You can return whenever you&apos;re ready.</p></div></div><DialogFooter className="border-t border-reconnect-border px-6 py-5 sm:px-8"><Button type="button" onClick={onStart} className="h-11 rounded-lg bg-reconnect-forest px-5 text-sm font-semibold text-primary-foreground shadow-none hover:bg-reconnect-forest-deep">{course.progress > 0 ? "Continue learning" : course.priceType === "Paid" ? `Buy for $${course.price}` : "Start learning"}<ArrowRight size={17} /></Button></DialogFooter></DialogContent></Dialog>;
}

function ProgramModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const program = programs[0];
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="max-w-[520px] rounded-2xl border-reconnect-border bg-reconnect-surface"><DialogHeader><span className="text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-reconnect-sage">Structured program</span><DialogTitle className="font-display text-[29px] leading-tight text-reconnect-text">{program.title}</DialogTitle><DialogDescription className="text-sm leading-6 text-reconnect-text/70">{program.description}</DialogDescription></DialogHeader><div className="rounded-xl bg-reconnect-sage-soft/60 p-4"><p className="text-sm font-semibold text-reconnect-text">Includes</p><ul className="mt-3 grid grid-cols-2 gap-3 text-sm text-reconnect-text/75">{program.includes.map((item) => <li key={item} className="flex items-center gap-2"><Check size={16} className="text-reconnect-sage" />{item}</li>)}</ul></div><div className="flex flex-wrap gap-4 text-xs text-reconnect-text/65"><span>{program.duration}</span><span>{program.providerName}</span><span className="inline-flex items-center gap-1">Verified organization <Check size={14} className="text-reconnect-sage" /></span></div><DialogFooter><Button type="button" onClick={() => onOpenChange(false)} className="h-10 rounded-lg bg-reconnect-forest text-xs font-semibold text-primary-foreground shadow-none hover:bg-reconnect-forest-deep">Explore program <ArrowRight size={16} /></Button></DialogFooter></DialogContent></Dialog>;
}

export function CoursesPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("recommended");
  const [search, setSearch] = useState("");
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [programOpen, setProgramOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { setProgressMap(JSON.parse(stored) as Record<string, number>); } catch { setProgressMap({}); }
    } else {
      const initial = Object.fromEntries(courses.filter((course) => course.progress > 0).map((course) => [course.id, course.progress]));
      setProgressMap(initial);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    }
  }, []);

  const startCourse = (course: Course) => {
    const nextProgress = Math.max(progressMap[course.id] ?? 0, 10);
    const next = { ...progressMap, [course.id]: nextProgress };
    setProgressMap(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSelectedCourse(null);
    router.push(`/courses/${course.id}`);
  };

  const displayedCourses = useMemo(() => {
    const query = search.trim().toLowerCase();
    let list = courses.filter((course) => {
      if (tab === "learning" && !(progressMap[course.id] > 0)) return false;
      if (tab === "recommended" && !["workplace-communication", "digital-skills", "resume-interview"].includes(course.id)) return false;
      if (selectedGoal && course.goal !== selectedGoal) return false;
      if (query && ![course.title, course.description, course.category, course.goal, course.type].some((value) => value.toLowerCase().includes(query))) return false;
      return true;
    });
    return list;
  }, [progressMap, search, selectedGoal, tab]);

  const currentProgress = progressMap["workplace-communication"] ?? 60;

  return <AppShell search={search} onSearchChange={setSearch}><section aria-labelledby="courses-heading"><h1 id="courses-heading" className="font-display text-[38px] leading-tight text-reconnect-text sm:text-[44px]">Courses &amp; Programs</h1><p className="mt-3 max-w-3xl text-[15px] leading-7 text-reconnect-text/70">Explore courses and programs that can help you build skills, confidence and a brighter future.</p><div className="mt-8 flex gap-2 overflow-x-auto border-b border-reconnect-border pb-2" role="tablist" aria-label="Course views">{([ ["recommended", "Recommended for you"], ["all", "All Courses"], ["learning", "My Learning"] ] as const).map(([value, label]) => <button key={value} type="button" role="tab" aria-selected={tab === value} onClick={() => setTab(value)} className={`min-h-10 shrink-0 rounded-lg px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-reconnect-sage ${tab === value ? "bg-reconnect-sage-soft text-reconnect-forest" : "text-reconnect-text/70 hover:bg-reconnect-cream"}`}>{label}</button>)}</div></section><div className="page-grid mt-8"><div className="min-w-0"><div className="mb-5"><div className="flex items-center gap-2"><span className="text-reconnect-sage" aria-hidden="true">✦</span><h2 className="font-display text-[22px] text-reconnect-text">{tab === "recommended" ? "Recommended for you" : tab === "all" ? "All courses" : "My learning"}</h2></div><p className="mt-1 pl-6 text-xs text-reconnect-text/65">{tab === "recommended" ? "Based on your goals and recent check-ins." : tab === "all" ? "Explore learning that meets you where you are." : "Pick up where you left off."}</p></div>{selectedGoal && <div className="mb-4 flex items-center justify-between rounded-lg bg-reconnect-sage-soft/60 px-4 py-3 text-xs text-reconnect-forest"><span>Showing courses for <strong>{selectedGoal}</strong></span><button type="button" onClick={() => setSelectedGoal(null)} className="inline-flex items-center gap-1 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-reconnect-sage">Clear <X size={14} /></button></div>}<div className="space-y-3">{displayedCourses.map((course) => <CourseCard key={course.id} course={course} progress={progressMap[course.id] ?? 0} onOpen={() => setSelectedCourse(course)} onStart={() => startCourse(course)} />)}</div>{displayedCourses.length === 0 && <div className="reconnect-card flex min-h-[240px] flex-col items-center justify-center px-6 py-10 text-center"><SearchX size={28} className="text-reconnect-sage" /><h3 className="mt-4 font-display text-[21px] text-reconnect-text">{tab === "learning" ? "You haven&apos;t started a course yet." : "No courses found."}</h3><p className="mt-2 max-w-sm text-sm leading-6 text-reconnect-text/65">{tab === "learning" ? "Explore courses that match your goals." : "Try another skill or topic."}</p>{tab === "learning" && <Button type="button" onClick={() => setTab("recommended")} className="mt-5 h-10 rounded-lg bg-reconnect-forest text-xs font-semibold text-primary-foreground shadow-none hover:bg-reconnect-forest-deep">Explore courses <ArrowRight size={16} /></Button>}</div>}{tab === "recommended" && !search && !selectedGoal && <button type="button" onClick={() => setTab("all")} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-reconnect-border bg-reconnect-surface text-xs font-semibold text-reconnect-text transition-colors hover:bg-reconnect-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-reconnect-sage">View all courses <ChevronRight size={16} /></button>}{tab === "all" && !search && !selectedGoal && <div className="mt-8"><ProgramCard onOpen={() => setProgramOpen(true)} /></div>}</div><aside className="space-y-3"><ContinueLearningCard progress={currentProgress} onContinue={() => startCourse(courses[0])} /><BrowseByGoal selectedGoal={selectedGoal} onSelect={setSelectedGoal} /><StartHereCard /></aside></div><CourseDetailsModal course={selectedCourse} open={Boolean(selectedCourse)} onOpenChange={(open) => !open && setSelectedCourse(null)} onStart={() => selectedCourse && startCourse(selectedCourse)} /><ProgramModal open={programOpen} onOpenChange={setProgramOpen} /></AppShell>;
}