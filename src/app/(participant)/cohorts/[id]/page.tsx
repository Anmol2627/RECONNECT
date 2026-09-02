import { createClient } from "@/utils/supabase/server";
import { AppShell } from "@/components/layout/AppShell";
import { redirect } from "next/navigation";
import { CreatePostForm } from "./CreatePostForm";
import { User, Clock } from "lucide-react";

export default async function CohortFeedPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    redirect("/login");
  }

  // Fetch cohort details
  const { data: cohort } = await supabase.from("cohorts").select("*").eq("id", id).single();
  
  if (!cohort) {
    return <div>Cohort not found</div>;
  }

  // Check if member
  const { data: member } = await supabase
    .from("cohort_members")
    .select("*")
    .eq("cohort_id", id)
    .eq("user_id", userData.user.id)
    .single();

  if (!member) {
    redirect("/cohorts");
  }

  // Fetch posts
  const { data: posts } = await supabase
    .from("cohort_posts")
    .select("*, profiles(full_name)")
    .eq("cohort_id", id)
    .order("created_at", { ascending: false });

  return (
    <AppShell breadcrumb={cohort.name}>
      <div className="mx-auto max-w-3xl px-4 py-8 md:px-8">
        <div className="mb-8 rounded-3xl bg-forest p-8 text-cream">
          <h1 className="font-display text-3xl">{cohort.name}</h1>
          <p className="mt-2 text-forest-light">{cohort.description}</p>
        </div>

        <div className="space-y-6">
          <CreatePostForm cohortId={id} />

          <div className="space-y-4">
            {posts?.map((post) => (
              <div key={post.id} className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest/10">
                    <User className="h-5 w-5 text-forest" />
                  </div>
                  <div>
                    <div className="font-semibold text-forest-deep">{post.profiles?.full_name || "Unknown User"}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(post.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-foreground whitespace-pre-wrap">{post.content}</p>
              </div>
            ))}
            
            {posts?.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                No posts yet. Be the first to say hello!
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
