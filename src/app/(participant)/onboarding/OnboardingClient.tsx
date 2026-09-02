"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { completeOnboarding } from "./actions";
import { SubmitButton } from "@/components/ui/submit-button";

const goals = [
  "Build confidence",
  "Improve mental wellbeing",
  "Find a job or volunteer role",
  "Learn digital skills",
  "Connect with others",
];

const barriers = [
  "Anxiety or stress",
  "Lack of experience",
  "Tech challenges",
  "Physical health",
  "Social isolation",
];

export function OnboardingClient({ userName, userId }: { userName: string, userId: string }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedBarriers, setSelectedBarriers] = useState<string[]>([]);

  const toggleSelection = (item: string, current: string[], setter: (val: string[]) => void) => {
    if (current.includes(item)) {
      setter(current.filter((i) => i !== item));
    } else {
      setter([...current, item]);
    }
  };

  const handleNext = () => {
    if (step === 1) setStep(2);
  };

  return (
    <div className="w-full max-w-lg rounded-3xl bg-cream p-8 shadow-sm ring-1 ring-border sm:p-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-forest-deep">Welcome, {userName.split(" ")[0]}</h1>
        <p className="mt-2 text-muted-foreground">
          {step === 1 
            ? "Let's personalize your experience. What are you hoping to achieve?" 
            : "What's currently standing in your way?"}
        </p>
      </div>

      <form action={async () => {
        await completeOnboarding({ goals: selectedGoals, barriers: selectedBarriers });
      }}>
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="grid gap-3">
              {goals.map((goal) => {
                const selected = selectedGoals.includes(goal);
                return (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => toggleSelection(goal, selectedGoals, setSelectedGoals)}
                    className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-colors ${
                      selected 
                        ? "border-sage bg-sage-soft text-forest" 
                        : "border-border bg-card text-foreground hover:bg-card/80"
                    }`}
                  >
                    <span className="font-medium">{goal}</span>
                    {selected && <Check className="size-5 text-sage" />}
                  </button>
                );
              })}
            </div>
            
            <Button 
              type="button" 
              onClick={handleNext}
              disabled={selectedGoals.length === 0}
              className="w-full rounded-full bg-forest text-cream hover:bg-forest-deep"
            >
              Continue <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="grid gap-3">
              {barriers.map((barrier) => {
                const selected = selectedBarriers.includes(barrier);
                return (
                  <button
                    key={barrier}
                    type="button"
                    onClick={() => toggleSelection(barrier, selectedBarriers, setSelectedBarriers)}
                    className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-colors ${
                      selected 
                        ? "border-peach bg-peach/20 text-terracotta" 
                        : "border-border bg-card text-foreground hover:bg-card/80"
                    }`}
                  >
                    <span className="font-medium">{barrier}</span>
                    {selected && <Check className="size-5 text-terracotta" />}
                  </button>
                );
              })}
            </div>
            
            <div className="flex gap-3">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setStep(1)}
                className="w-1/3 rounded-full"
              >
                Back
              </Button>
              <SubmitButton 
                pendingText="Setting up..."
                disabled={selectedBarriers.length === 0}
                className="w-2/3 rounded-full bg-forest text-cream hover:bg-forest-deep"
              >
                Complete Setup
              </SubmitButton>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
