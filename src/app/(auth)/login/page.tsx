import { AuthSplitLayout } from "@/components/layout/AuthSplitLayout";
import { SubmitButton } from "@/components/ui/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "./actions";

export const metadata = {
  title: "Log In | RECONNECT",
};

export default function LoginPage() {
  return (
    <AuthSplitLayout currentTab="login">
      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-xs text-muted-foreground hover:text-forest-deep">Forgot password?</a>
          </div>
          <Input id="password" name="password" type="password" required />
        </div>
        
        <SubmitButton pendingText="Logging in..." className="w-full rounded-xl bg-forest/80 text-cream hover:bg-forest-deep py-6" formAction={login}>
          Log in &rarr;
        </SubmitButton>
      </form>
    </AuthSplitLayout>
  );
}
