"use client";

import { useState } from "react";
import { createCohortPost } from "../actions";
import { SubmitButton } from "@/components/ui/submit-button";

export function CreatePostForm({ cohortId }: { cohortId: string }) {
  const [content, setContent] = useState("");

  async function handleSubmit(formData: FormData) {
    if (!content.trim()) return;
    await createCohortPost(cohortId, content);
    setContent("");
  }

  return (
    <form action={handleSubmit} className="mb-6 rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border">
      <textarea
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share something with the cohort..."
        className="min-h-[100px] w-full resize-none border-none bg-transparent p-2 outline-none focus:ring-0 sm:text-sm"
        required
      />
      <div className="mt-2 flex justify-end border-t border-border pt-2">
        <SubmitButton 
          disabled={!content.trim()} 
          pendingText="Posting..."
          className="rounded-full bg-forest text-cream hover:bg-forest-deep"
        >
          Post
        </SubmitButton>
      </div>
    </form>
  );
}
