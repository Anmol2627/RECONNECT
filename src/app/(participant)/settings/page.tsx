"use client";

import { useState } from "react";
import { User, Bell, ShieldCheck, Type, Moon, Lock, Mail, Phone, ChevronRight, Download, Trash2, Edit2, Globe, Flag, Headset, Check, X as CloseIcon } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { useAppContext } from "@/context/AppContext";
import { PlantGrowthIllustration, CalmPersonIllustration } from "@/components/shared/illustrations";

import { PageHeader } from "@/components/ui/PageHeader";
import { PillTabs } from "@/components/ui/PillTabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfileAction } from "./actions";
import { toast } from "sonner";

export default function SettingsPage() {
  const { state: { user, settings }, updateState } = useAppContext();
  const [activeTab, setActiveTab] = useState("Account");
  const tabs = ["Account", "Preferences", "Notifications", "Privacy & Safety", "Connected Apps"];

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.fullName?.split(" ").slice(1).join(" ") || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await updateProfileAction({ firstName, lastName });
      toast("Profile updated successfully!");
      setIsEditingProfile(false);
    } catch (err) {
      toast("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AppShell searchPlaceholder="Search settings...">
      <div>
        <PageHeader 
          title="Settings" 
          subtitle="Manage your preferences and account settings." 
        />
        
        <PillTabs 
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px] items-start">
          {/* Main Column */}
          <div className="space-y-6">
            
            {/* Profile Information */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
              <h3 className="text-[17px] font-semibold text-foreground mb-6">Profile Information</h3>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-cream text-4xl font-serif text-forest relative">
                     {user.initials}
                     <PlantGrowthIllustration className="absolute -bottom-4 -left-4 w-14 h-14 opacity-70" />
                  </div>
                  <div className="text-center sm:text-left pt-1 w-full max-w-sm">
                    {isEditingProfile ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5 text-left">
                            <Label htmlFor="editFirstName">First Name</Label>
                            <Input id="editFirstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                          </div>
                          <div className="space-y-1.5 text-left">
                            <Label htmlFor="editLastName">Last Name</Label>
                            <Input id="editLastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-forest hover:bg-forest-deep" onClick={handleSaveProfile} disabled={isSaving}>
                            {isSaving ? "Saving..." : <><Check className="mr-2 h-4 w-4" /> Save</>}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setIsEditingProfile(false)} disabled={isSaving}>
                            <CloseIcon className="mr-2 h-4 w-4" /> Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-center sm:justify-start gap-3">
                          <p className="font-bold text-foreground text-[22px]">{user.fullName}</p>
                          <span className="px-2 py-0.5 rounded-md bg-secondary text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Participant</span>
                        </div>
                        <p className="text-[14px] text-muted-foreground mt-2">{user.email}</p>
                        <p className="text-[13px] text-muted-foreground mt-1">Member since May 2024</p>
                      </>
                    )}
                  </div>
                </div>
                {!isEditingProfile && (
                  <button 
                    onClick={() => setIsEditingProfile(true)}
                    className="flex items-center justify-center gap-2 px-5 py-2 rounded-lg border border-border text-sm font-medium hover:bg-cream transition-colors h-10 w-full sm:w-auto"
                  >
                    <Edit2 className="h-4 w-4" /> Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Account Details */}
            <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
              <div className="p-6 pb-2">
                <h3 className="text-[17px] font-semibold text-foreground">Account Details</h3>
              </div>
              <div className="divide-y divide-border">
                <div className="flex items-center justify-between p-6">
                  <div className="flex items-start gap-4">
                     <div className="p-2.5 bg-sage-soft rounded-lg mt-0.5"><Mail className="h-5 w-5 text-forest" /></div>
                     <div>
                       <p className="font-medium text-foreground text-[14px]">Email Address</p>
                       <p className="text-[13px] text-muted-foreground mt-0.5">{user.email}</p>
                     </div>
                  </div>
                  <button className="text-[13px] font-medium flex items-center gap-1 hover:text-sage transition-colors">Update <ChevronRight className="h-4 w-4" /></button>
                </div>
                
                <div className="flex items-center justify-between p-6">
                  <div className="flex items-start gap-4">
                     <div className="p-2.5 bg-[#FFF3E0] rounded-lg mt-0.5"><Lock className="h-5 w-5 text-terracotta" /></div>
                     <div>
                       <p className="font-medium text-foreground text-[14px]">Password</p>
                       <p className="text-[13px] text-muted-foreground mt-0.5">Last updated 2 months ago</p>
                     </div>
                  </div>
                  <button className="text-[13px] font-medium flex items-center gap-1 hover:text-terracotta transition-colors">Change <ChevronRight className="h-4 w-4" /></button>
                </div>

                <div className="flex items-center justify-between p-6">
                  <div className="flex items-start gap-4">
                     <div className="p-2.5 bg-[#F3E5F5] rounded-lg mt-0.5"><Phone className="h-5 w-5 text-[#8E24AA]" /></div>
                     <div>
                       <p className="font-medium text-foreground text-[14px]">Phone Number</p>
                       <p className="text-[13px] text-muted-foreground mt-0.5">+91 98765 43210</p>
                     </div>
                  </div>
                  <button className="text-[13px] font-medium flex items-center gap-1 hover:text-[#8E24AA] transition-colors">Update <ChevronRight className="h-4 w-4" /></button>
                </div>

                <div className="flex items-center justify-between p-6">
                  <div className="flex items-start gap-4">
                     <div className="p-2.5 bg-sage-soft rounded-lg mt-0.5"><ShieldCheck className="h-5 w-5 text-forest" /></div>
                     <div>
                       <p className="font-medium text-foreground text-[14px]">Two-Factor Authentication</p>
                       <p className="text-[13px] text-muted-foreground mt-0.5">Add an extra layer of security to your account</p>
                     </div>
                  </div>
                  <button className="text-[13px] font-medium flex items-center gap-1 hover:text-sage transition-colors">Enable <ChevronRight className="h-4 w-4" /></button>
                </div>
              </div>
            </div>

            {/* Journey Summary */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
               <div className="flex items-center gap-6">
                 <div className="h-24 w-24 shrink-0 flex items-center justify-center">
                    <PlantGrowthIllustration className="h-full w-full object-contain" />
                 </div>
                 <div>
                   <h3 className="font-semibold text-foreground">Your Journey Summary</h3>
                   <p className="text-[13px] text-muted-foreground mt-1">Your current journey</p>
                   <p className="font-medium text-forest text-[15px]">Employment Readiness</p>
                   <p className="text-[13px] text-muted-foreground mt-1">Last check-in: 2 days ago</p>
                 </div>
               </div>
               <button className="px-5 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-cream transition-colors whitespace-nowrap flex items-center gap-2 w-full sm:w-auto justify-center">
                 View My Journey <ChevronRight className="h-4 w-4" />
               </button>
            </div>
            
            {/* Help Banner */}
            <div className="rounded-2xl bg-cream p-6 flex flex-col sm:flex-row items-center justify-between gap-6 border border-border/50">
              <div className="flex items-center gap-5">
                <div className="h-16 w-16 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                   <PlantGrowthIllustration className="h-12 w-12" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-[16px]">Need help with your account?</h3>
                  <p className="text-[14px] text-muted-foreground mt-1">Our support team is here to help you anytime.</p>
                </div>
              </div>
              <button className="px-6 py-3 bg-terracotta text-white rounded-xl text-[14px] font-medium hover:bg-terracotta-hover transition-colors whitespace-nowrap flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto">
                <Headset className="h-4 w-4" /> Contact Support <ChevronRight className="h-4 w-4 opacity-70" />
              </button>
            </div>
          </div>

          {/* Right Sidebar Column */}
          <div className="space-y-6">
             {/* Preferences */}
             <div className="rounded-2xl border border-border bg-card p-6 shadow-sm relative overflow-hidden">
               <PlantGrowthIllustration className="absolute top-0 right-0 w-24 h-24 opacity-30 -translate-y-4 translate-x-4" />
               <div className="relative z-10">
                 <h3 className="text-[16px] font-semibold text-foreground">Preferences</h3>
                 <p className="text-[13px] text-muted-foreground mt-1 mb-6">Customize your experience on RECONNECT.</p>
                 
                 <div className="space-y-5">
                   {/* Language (skipped) */}
                   <div className="flex items-center justify-between cursor-pointer group">
                     <div className="flex items-center gap-4">
                       <div className="p-2.5 bg-sage-soft rounded-full text-forest"><Globe className="h-[18px] w-[18px]" /></div>
                       <div>
                         <p className="text-[13px] font-medium text-foreground">Language</p>
                         <p className="text-[12px] text-muted-foreground mt-0.5">English (India)</p>
                       </div>
                     </div>
                     <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                   </div>
                   
                   {/* Text Size */}
                   <div 
                     className="flex items-center justify-between cursor-pointer group"
                     onClick={() => {
                       const sizes = ["Small", "Medium", "Large"];
                       const next = sizes[(sizes.indexOf(settings.textSize) + 1) % sizes.length];
                       updateState({ settings: { ...settings, textSize: next } });
                       toast(`Text size set to ${next}`);
                     }}
                   >
                     <div className="flex items-center gap-4">
                       <div className="p-2.5 bg-[#FFF3E0] rounded-full text-terracotta"><Type className="h-[18px] w-[18px]" /></div>
                       <div>
                         <p className="text-[13px] font-medium text-foreground">Text Size</p>
                         <p className="text-[12px] text-muted-foreground mt-0.5">{settings.textSize || "Medium"}</p>
                       </div>
                     </div>
                     <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                   </div>
                   
                   {/* Theme */}
                   <div 
                     className="flex items-center justify-between cursor-pointer group"
                     onClick={() => {
                       const next = settings.theme === "Light" ? "Dark" : "Light";
                       updateState({ settings: { ...settings, theme: next } });
                       if (next === "Dark") {
                         document.documentElement.classList.add("dark");
                       } else {
                         document.documentElement.classList.remove("dark");
                       }
                       toast(`Theme set to ${next}`);
                     }}
                   >
                     <div className="flex items-center gap-4">
                       <div className="p-2.5 bg-[#F3E5F5] rounded-full text-[#8E24AA]"><Moon className="h-[18px] w-[18px]" /></div>
                       <div>
                         <p className="text-[13px] font-medium text-foreground">Theme</p>
                         <p className="text-[12px] text-muted-foreground mt-0.5">{settings.theme || "Light"}</p>
                       </div>
                     </div>
                     <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                   </div>
                 </div>
               </div>
             </div>

             {/* Privacy & Safety */}
             <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                 <h3 className="text-[16px] font-semibold text-foreground">Privacy & Safety</h3>
                 <p className="text-[13px] text-muted-foreground mt-1 mb-6">We're here to keep you safe and respected.</p>
                 
                 <div className="space-y-5">
                   <div className="flex items-center justify-between cursor-pointer group">
                     <div className="flex items-center gap-4">
                       <div className="p-2.5 bg-secondary rounded-full text-muted-foreground"><ShieldCheck className="h-[18px] w-[18px] text-forest" /></div>
                       <div>
                         <p className="text-[13px] font-medium text-foreground">Privacy Settings</p>
                         <p className="text-[12px] text-muted-foreground mt-0.5">Manage your information and visibility</p>
                       </div>
                     </div>
                     <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                   </div>
                   
                   <div className="flex items-center justify-between cursor-pointer group">
                     <div className="flex items-center gap-4">
                       <div className="p-2.5 bg-secondary rounded-full text-muted-foreground"><User className="h-[18px] w-[18px] text-forest" /></div>
                       <div>
                         <p className="text-[13px] font-medium text-foreground">Blocked Contacts</p>
                         <p className="text-[12px] text-muted-foreground mt-0.5">Manage people you've blocked</p>
                       </div>
                     </div>
                     <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                   </div>
                   
                   <div className="flex items-center justify-between cursor-pointer group">
                     <div className="flex items-center gap-4">
                       <div className="p-2.5 bg-secondary rounded-full text-muted-foreground"><Flag className="h-[18px] w-[18px] text-[#8E24AA]" /></div>
                       <div>
                         <p className="text-[13px] font-medium text-foreground">Report a Concern</p>
                         <p className="text-[12px] text-muted-foreground mt-0.5">Report inappropriate behaviour</p>
                       </div>
                     </div>
                     <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                   </div>
                 </div>
             </div>
             
             {/* Data & Account */}
             <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                 <h3 className="text-[16px] font-semibold text-foreground">Data & Account</h3>
                 
                 <div className="space-y-5 mt-6">
                   <div className="flex items-center justify-between cursor-pointer group">
                     <div className="flex items-center gap-4">
                       <div className="p-2.5 bg-sage-soft rounded-full text-forest"><Download className="h-[18px] w-[18px]" /></div>
                       <div>
                         <p className="text-[13px] font-medium text-foreground">Download My Data</p>
                         <p className="text-[12px] text-muted-foreground mt-0.5">Get a copy of your data</p>
                       </div>
                     </div>
                     <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                   </div>
                   
                   <div className="flex items-center justify-between cursor-pointer group">
                     <div className="flex items-center gap-4">
                       <div className="p-2.5 bg-[#FDECEA] rounded-full text-red-500"><Trash2 className="h-[18px] w-[18px]" /></div>
                       <div>
                         <p className="text-[13px] font-medium text-foreground">Delete Account</p>
                         <p className="text-[12px] text-muted-foreground mt-0.5">Permanently delete your account</p>
                       </div>
                     </div>
                     <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                   </div>
                 </div>
             </div>

          </div>
        </div>
      </div>
    </AppShell>
  );
}
