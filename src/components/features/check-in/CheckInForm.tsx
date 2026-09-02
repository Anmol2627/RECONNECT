"use client";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { BarrierOption } from "@/components/features/check-in/BarrierOption";
import { CheckInActions } from "@/components/features/check-in/CheckInActions";
import { CheckInHeader } from "@/components/features/check-in/CheckInHeader";
import { FeelingOption } from "@/components/features/check-in/FeelingOption";
import { PlantIllustration } from "@/components/features/check-in/PlantIllustration";
import { TextAreaField } from "@/components/features/check-in/TextAreaField";
import {
  barriers,
  feelings,
  saveCheckIn,
  type BarrierId,
  type FeelingId,
} from "@/components/features/check-in/data";
import { useAppContext } from "@/context/AppContext";
import { saveCheckInAction } from "@/app/(participant)/check-in/actions";

export function CheckInForm() {
  const router = useRouter();
  const { updateCheckIn } = useAppContext();

  // Demo data only — fully changeable by the participant.
  const [feeling, setFeeling] = useState<FeelingId | null>("difficulty");
  const [selectedBarriers, setSelectedBarriers] = useState<BarrierId[]>(["low-confidence"]);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  const activeStep = feeling ? (selectedBarriers.length > 0 ? 3 : 2) : 1;

  const toggleBarrier = (id: BarrierId) => {
    setSelectedBarriers((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const handleNext = async () => {
    if (!feeling) {
      setError("Please choose how you're feeling about your progress.");
      return;
    }
    setError(null);
    updateCheckIn({
      feeling,
      barriers: selectedBarriers,
      details: notes.trim(),
    });
    
    try {
      await saveCheckInAction({
        feeling,
        barriers: selectedBarriers,
        notes: notes.trim(),
      });
      void router.push("/recommendations");
    } catch (err) {
      toast("Error saving check-in. Please try again.");
    }
  };

  const handleSkip = () => {
    toast("You can check in whenever you're ready.");
    void router.push("/journey");
  };

  return (
    <div className="pb-10">
      <CheckInHeader activeStep={activeStep} />

      <section className="card-surface mt-5 p-7" aria-labelledby="question-1">
        <h3 id="question-1" className="font-serif text-xl text-foreground">
          <span className="text-muted-foreground">1.</span> How are you feeling about your
          current progress?
        </h3>

        <div
          role="radiogroup"
          aria-labelledby="question-1"
          aria-required="true"
          className="mt-5 grid gap-4 md:grid-cols-3"
        >
          {feelings.map((option) => (
            <FeelingOption
              key={option.id}
              option={option}
              selected={feeling === option.id}
              onSelect={() => {
                setFeeling(option.id);
                setError(null);
              }}
            />
          ))}
        </div>

        {error && (
          <p
            role="alert"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-terracotta-soft px-3 py-2 text-sm text-terracotta"
          >
            <AlertCircle className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            {error}
          </p>
        )}
      </section>

      <section className="card-surface mt-5 p-7" aria-labelledby="question-2">
        <h3 id="question-2" className="font-serif text-xl text-foreground">
          <span className="text-muted-foreground">2.</span> What is making progress difficult
          for you?
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground">You can select all that apply.</p>

        <div
          role="group"
          aria-labelledby="question-2"
          className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          {barriers.map((option) => (
            <BarrierOption
              key={option.id}
              option={option}
              selected={selectedBarriers.includes(option.id)}
              onToggle={() => toggleBarrier(option.id)}
            />
          ))}
        </div>
      </section>

      <section className="card-surface mt-5 overflow-hidden p-7" aria-labelledby="question-3">
        <div className="flex flex-col gap-6 md:flex-row md:items-end">
          <div className="min-w-0 flex-1">
            <h3 id="question-3" className="font-serif text-xl text-foreground">
              <span className="text-muted-foreground">3.</span> Tell us more{" "}
              <span className="text-base text-muted-foreground">(optional)</span>
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Anything you&apos;d like us to know about your situation.
            </p>
            <div className="mt-5">
              <TextAreaField value={notes} onChange={setNotes} />
            </div>
          </div>
          <PlantIllustration className="hidden h-[150px] w-[220px] shrink-0 md:block" />
        </div>
      </section>

      <CheckInActions onSkip={handleSkip} onNext={handleNext} />
    </div>
  );
}
