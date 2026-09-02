"use client";
import { cn } from "@/lib/utils";
import { checkInSteps } from "@/components/features/check-in/data";

export function CheckInProgress({ activeStep }: { activeStep: number }) {
  return (
    <ol className="flex items-start gap-2 sm:gap-4" aria-label="Check-in progress">
      {checkInSteps.map((step, index) => {
        const isActive = step.id === activeStep;
        const isNext = step.id === activeStep + 1;

        return (
          <li key={step.id} className="flex items-start gap-2 sm:gap-4">
            <div className="flex w-[110px] flex-col items-center gap-2 text-center sm:w-[130px]">
              <span
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors duration-300",
                  isActive && "bg-forest text-cream shadow-sm",
                  isNext && "bg-gold text-forest",
                  !isActive && !isNext && "bg-cream text-muted-foreground",
                )}
              >
                {step.id}
              </span>
              <span
                className={cn(
                  "text-xs leading-4",
                  isActive ? "font-medium text-foreground" : "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
            </div>
            {index < checkInSteps.length - 1 && (
              <span
                aria-hidden="true"
                className="mt-4 hidden h-px w-8 border-t border-dashed border-border sm:block"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
