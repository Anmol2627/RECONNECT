import Link from "next/link";
import { RegisterForm } from "./RegisterForm";

export const metadata = {
  title: "Register | RECONNECT",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sand p-4">
      <div className="w-full max-w-md rounded-2xl bg-cream p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl text-forest-deep">Join RECONNECT</h1>
          <p className="mt-2 text-muted-foreground">Create an account to start your journey.</p>
        </div>
        
        <RegisterForm />
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-sage-deep hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
