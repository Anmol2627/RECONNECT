"use client";
import { NOTES_MAX_LENGTH } from "@/components/features/check-in/data";

export function TextAreaField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <label htmlFor="check-in-notes" className="sr-only">
        Tell us more about your situation
      </label>
      <textarea
        id="check-in-notes"
        value={value}
        maxLength={NOTES_MAX_LENGTH}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        placeholder="Share more details so we can support you better..."
        className="w-full resize-none rounded-2xl border border-border bg-cream/50 px-4 py-3 pb-9 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/60"
      />
      <span
        aria-live="polite"
        className="pointer-events-none absolute bottom-3 right-4 text-xs text-muted-foreground"
      >
        {value.length} / {NOTES_MAX_LENGTH}
      </span>
    </div>
  );
}
