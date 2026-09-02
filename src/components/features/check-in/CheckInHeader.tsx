"use client";
import { CheckInProgress } from "@/components/features/check-in/CheckInProgress";

export function CheckInHeader({ activeStep }: { activeStep: number }) {
  return (
    <section className="card-surface mt-6 flex flex-col gap-8 p-7 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-md">
        <h2 className="font-serif text-2xl text-foreground">How are you doing today?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Your check-in helps us understand how we can support you better.
        </p>
      </div>
      <CheckInProgress activeStep={activeStep} />
    </section>
  );
}
