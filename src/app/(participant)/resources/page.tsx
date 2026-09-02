"use client";
import { useState } from "react";

import { Bookmark, FileText, ArrowRight, BookOpen, Clock, BarChart, Calendar, Users, Headset, BookmarkCheck, Heart, Briefcase, FileCode, Download } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { useAppContext } from "@/context/AppContext";
import { PlantGrowthIllustration, CalmPersonIllustration, HandsHeartIllustration, CourseIllustration } from "@/components/shared/illustrations";
import { PageHeader } from "@/components/ui/PageHeader";
import { PillTabs } from "@/components/ui/PillTabs";



function ResourcesPage() {
  const { state: { savedResources }, saveResource } = useAppContext();
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Guides", "Templates", "Articles"];

  const toggleBookmark = (id: string) => {
    saveResource(id);
  };

  const isSaved = (id: string) => savedResources.includes(id);

  return (
    <AppShell searchPlaceholder="Search resources...">
      <div>
        <PageHeader 
          title="Resources" 
          subtitle="Explore guides and tools to support your journey." 
        />
        
        <PillTabs 
          tabs={categories}
          activeTab={activeCategory}
          onChange={setActiveCategory}
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px] items-start">
          {/* Main Column */}
          <div className="space-y-8">
            
            {/* Featured Resource */}
            <div className="rounded-2xl border border-border bg-cream overflow-hidden shadow-sm flex flex-col md:flex-row items-center gap-6 p-6 sm:p-8">
              <div className="w-full md:w-1/2 flex justify-center items-center">
                 <CalmPersonIllustration className="w-full h-auto max-h-[220px] object-contain" />
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-start">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sage-soft text-forest text-[11px] font-bold uppercase tracking-wider mb-4">
                  <PlantGrowthIllustration className="w-3 h-3 opacity-80" /> Featured Resource
                </span>
                <h3 className="text-2xl font-serif text-foreground leading-tight">Building Confidence at Work</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  Practical tips and strategies to help you communicate, participate and feel more confident in the workplace.
                </p>
                <div className="flex items-center gap-4 mt-5 text-[13px] text-muted-foreground font-medium">
                   <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> Guide</span>
                   <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 8 min read</span>
                   <span className="flex items-center gap-1.5"><BarChart className="w-4 h-4" /> Beginner friendly</span>
                </div>
                <button className="mt-6 px-6 py-2.5 bg-forest text-white rounded-lg text-sm font-medium hover:bg-forest-deep transition-colors whitespace-nowrap flex items-center gap-2">
                  Read now <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Popular resources */}
            <div>
              <h3 className="text-[17px] font-semibold text-foreground mb-4">Popular resources</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Resource 1 */}
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm flex flex-col h-full hover:border-sage transition-colors cursor-pointer">
                  <div className="h-32 mb-4 bg-cream rounded-xl flex items-center justify-center p-4">
                    <CalmPersonIllustration className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sage mb-2">WELLBEING</span>
                  <h4 className="font-semibold text-foreground text-[15px] leading-tight mb-2">Managing Stress & Anxiety</h4>
                  <p className="text-[13px] text-muted-foreground leading-relaxed flex-1">Simple techniques to help you stay calm and focused.</p>
                  <div className="flex items-center gap-3 mt-4 text-[11px] text-muted-foreground font-medium border-t border-border pt-4">
                     <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 6 min read</span>
                     <span className="flex items-center gap-1"><BarChart className="w-3.5 h-3.5" /> Beginner</span>
                  </div>
                </div>

                {/* Resource 2 */}
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm flex flex-col h-full hover:border-sage transition-colors cursor-pointer">
                  <div className="h-32 mb-4 bg-cream rounded-xl flex items-center justify-center p-4">
                    <CourseIllustration type="resume" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta mb-2">SKILLS & EMPLOYMENT</span>
                  <h4 className="font-semibold text-foreground text-[15px] leading-tight mb-2">Preparing for Job Interviews</h4>
                  <p className="text-[13px] text-muted-foreground leading-relaxed flex-1">A step-by-step guide to help you feel ready and confident.</p>
                  <div className="flex items-center gap-3 mt-4 text-[11px] text-muted-foreground font-medium border-t border-border pt-4">
                     <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 10 min read</span>
                     <span className="flex items-center gap-1"><BarChart className="w-3.5 h-3.5" /> Beginner</span>
                  </div>
                </div>

                {/* Resource 3 */}
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm flex flex-col h-full hover:border-sage transition-colors cursor-pointer">
                  <div className="h-32 mb-4 bg-cream rounded-xl flex items-center justify-center p-4">
                    <HandsHeartIllustration className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E24AA] mb-2">GUIDES & ARTICLES</span>
                  <h4 className="font-semibold text-foreground text-[15px] leading-tight mb-2">Talking About Your Journey</h4>
                  <p className="text-[13px] text-muted-foreground leading-relaxed flex-1">How to share your experience in a way that feels right for you.</p>
                  <div className="flex items-center gap-3 mt-4 text-[11px] text-muted-foreground font-medium border-t border-border pt-4">
                     <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 5 min read</span>
                     <span className="flex items-center gap-1"><BarChart className="w-3.5 h-3.5" /> All levels</span>
                  </div>
                </div>

                {/* Resource 4 */}
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm flex flex-col h-full hover:border-sage transition-colors cursor-pointer">
                  <div className="h-32 mb-4 bg-cream rounded-xl flex items-center justify-center p-4">
                    <CourseIllustration type="digital" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-forest mb-2">TOOLS & TEMPLATES</span>
                  <h4 className="font-semibold text-foreground text-[15px] leading-tight mb-2">Resume Template</h4>
                  <p className="text-[13px] text-muted-foreground leading-relaxed flex-1">A simple resume template you can download and use.</p>
                  <div className="flex items-center gap-3 mt-4 text-[11px] text-muted-foreground font-medium border-t border-border pt-4">
                     <span className="flex items-center gap-1"><Download className="w-3.5 h-3.5" /> Download</span>
                     <span className="flex items-center gap-1"><FileCode className="w-3.5 h-3.5" /> Template</span>
                  </div>
                </div>

              </div>
              
              <button className="w-full mt-6 py-3 border border-border rounded-xl text-[14px] font-medium hover:bg-cream transition-colors flex items-center justify-center gap-2">
                Explore all resources <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Banner */}
            <div className="rounded-2xl bg-cream p-6 flex flex-col sm:flex-row items-center justify-between gap-6 border border-border/50 mt-4">
              <div className="flex items-center gap-5">
                <div className="h-16 w-16 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-2">
                   <PlantGrowthIllustration className="h-full w-full object-contain" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-[16px]">You're not alone in this journey.</h3>
                  <p className="text-[14px] text-muted-foreground mt-1">We're here to support you with trusted resources, every step of the way.</p>
                </div>
              </div>
              <button className="px-6 py-2.5 bg-white border border-border text-terracotta rounded-xl text-[14px] font-medium hover:bg-cream transition-colors whitespace-nowrap flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto">
                <Headset className="h-4 w-4" /> Talk to Support <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            
          </div>

          {/* Right Sidebar Column */}
          <div className="space-y-6">
             
             {/* Need quick help */}
             <div className="rounded-2xl border border-border bg-cream p-6 shadow-sm relative overflow-hidden">
               <div className="flex items-start justify-between mb-6">
                 <div>
                   <h3 className="text-[16px] font-semibold text-foreground">Need quick help?</h3>
                   <p className="text-[13px] text-muted-foreground mt-1 max-w-[180px]">Find support or get answers to common questions.</p>
                 </div>
                 <PlantGrowthIllustration className="w-16 h-16 opacity-80 shrink-0" />
               </div>
               
               <div className="space-y-3">
                 <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white border border-border hover:border-sage transition-colors group">
                   <div className="flex items-center gap-3 text-left">
                     <Calendar className="w-[18px] h-[18px] text-sage" />
                     <span className="text-[13px] font-medium text-foreground">How do I join a session?</span>
                   </div>
                   <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-forest transition-colors" />
                 </button>

                 <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white border border-border hover:border-sage transition-colors group">
                   <div className="flex items-center gap-3 text-left">
                     <Users className="w-[18px] h-[18px] text-terracotta" />
                     <span className="text-[13px] font-medium text-foreground">Where can I get support?</span>
                   </div>
                   <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-forest transition-colors" />
                 </button>

                 <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white border border-border hover:border-sage transition-colors group">
                   <div className="flex items-center gap-3 text-left">
                     <BookOpen className="w-[18px] h-[18px] text-[#8E24AA]" />
                     <span className="text-[13px] font-medium text-foreground">How do courses work?</span>
                   </div>
                   <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-forest transition-colors" />
                 </button>

                 <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white border border-border hover:border-sage transition-colors group">
                   <div className="flex items-center gap-3 text-left">
                     <Headset className="w-[18px] h-[18px] text-[#1976D2]" />
                     <span className="text-[13px] font-medium text-foreground">Technical help</span>
                   </div>
                   <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-forest transition-colors" />
                 </button>
               </div>
               
               <button className="mt-5 text-[13px] font-medium text-muted-foreground hover:text-forest transition-colors flex items-center gap-1.5 w-full justify-center">
                 View all help topics <ArrowRight className="w-3.5 h-3.5" />
               </button>
             </div>

             {/* Curated for you */}
             <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                 <div className="flex items-center gap-2 mb-1">
                    <PlantGrowthIllustration className="w-5 h-5 text-forest" />
                    <h3 className="text-[16px] font-semibold text-foreground">Curated for you</h3>
                 </div>
                 <p className="text-[13px] text-muted-foreground mb-6">Resources based on your goals and recent check-ins.</p>
                 
                 <div className="space-y-4">
                   {/* Item 1 */}
                   <div className="flex items-start justify-between group">
                     <div className="flex items-start gap-4">
                       <div className="p-2.5 bg-sage-soft rounded-full text-forest mt-0.5"><Heart className="w-[18px] h-[18px]" /></div>
                       <div>
                         <p className="text-[14px] font-medium text-foreground leading-snug">Communicating with Confidence</p>
                         <p className="text-[12px] text-muted-foreground mt-1">7 min read</p>
                       </div>
                     </div>
                     <button onClick={() => toggleBookmark("c-w-c")} className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-forest transition-colors mt-0.5">
                       {isSaved("c-w-c") ? <BookmarkCheck className="w-[18px] h-[18px] text-sage" fill="currentColor" /> : <Bookmark className="w-[18px] h-[18px]" />}
                     </button>
                   </div>
                   
                   <div className="border-t border-border w-full"></div>

                   {/* Item 2 */}
                   <div className="flex items-start justify-between group">
                     <div className="flex items-start gap-4">
                       <div className="p-2.5 bg-[#F3E5F5] rounded-full text-[#8E24AA] mt-0.5"><Users className="w-[18px] h-[18px]" /></div>
                       <div>
                         <p className="text-[14px] font-medium text-foreground leading-snug">Workplace Readiness Checklist</p>
                         <p className="text-[12px] text-muted-foreground mt-1">Template</p>
                       </div>
                     </div>
                     <button onClick={() => toggleBookmark("w-r-c")} className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-forest transition-colors mt-0.5">
                       {isSaved("w-r-c") ? <BookmarkCheck className="w-[18px] h-[18px] text-sage" fill="currentColor" /> : <Bookmark className="w-[18px] h-[18px]" />}
                     </button>
                   </div>
                   
                   <div className="border-t border-border w-full"></div>

                   {/* Item 3 */}
                   <div className="flex items-start justify-between group">
                     <div className="flex items-start gap-4">
                       <div className="p-2.5 bg-[#E6F3E6] rounded-full text-forest mt-0.5"><Briefcase className="w-[18px] h-[18px]" /></div>
                       <div>
                         <p className="text-[14px] font-medium text-foreground leading-snug">Daily Mindfulness Practices</p>
                         <p className="text-[12px] text-muted-foreground mt-1">5 min read</p>
                       </div>
                     </div>
                     <button onClick={() => toggleBookmark("d-m-p")} className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-forest transition-colors mt-0.5">
                       {isSaved("d-m-p") ? <BookmarkCheck className="w-[18px] h-[18px] text-sage" fill="currentColor" /> : <Bookmark className="w-[18px] h-[18px]" />}
                     </button>
                   </div>
                 </div>

                 <button className="mt-6 text-[13px] font-medium text-muted-foreground hover:text-forest transition-colors flex items-center gap-1.5 w-full justify-center">
                   View more recommendations <ArrowRight className="w-3.5 h-3.5" />
                 </button>
             </div>

          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default ResourcesPage;
