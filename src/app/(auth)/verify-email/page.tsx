import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Verify Email | RECONNECT",
};

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sand p-4">
      <div className="w-full max-w-md rounded-2xl bg-cream p-8 shadow-sm text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-forest/10">
          <Mail className="h-8 w-8 text-forest-deep" />
        </div>
        
        <h1 className="font-display text-3xl text-forest-deep mb-2">Check your email</h1>
        
        <p className="mb-8 text-muted-foreground">
          We've sent a verification link to your email address. Please click the link to verify your account and complete your registration.
        </p>

        <Button 
          asChild 
          className="w-full rounded-full bg-forest text-cream hover:bg-forest-deep mb-4"
        >
          <a href="https://mail.google.com/" target="_blank" rel="noopener noreferrer">
            Open Gmail
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>

        <div className="text-sm text-muted-foreground">
          Verified?{" "}
          <Link href="/login" className="font-medium text-sage-deep hover:underline">
            Go to login
          </Link>
        </div>
      </div>
    </div>
  );
}
