import Link from "next/link";
import { LogIn } from "lucide-react";
import { SubmitButton } from "@/components/ui/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "./actions";

export const metadata = {
  title: "Log In | RECONNECT",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sand p-4">
      <div className="w-full max-w-md rounded-2xl bg-cream p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl text-forest-deep">Welcome Back</h1>
          <p className="mt-2 text-muted-foreground">Sign in to continue your RECONNECT journey.</p>
        </div>
        
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          
          <SubmitButton pendingText="Signing In..." className="w-full rounded-full bg-forest text-cream hover:bg-forest-deep" formAction={login}>
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </SubmitButton>
        </form>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium text-sage-deep hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
