"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { SubmitButton } from "@/components/ui/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "./actions";

export function RegisterForm() {
  const [role, setRole] = useState<"participant" | "organization">("participant");

  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label>I am a...</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="role" 
              value="participant" 
              checked={role === "participant"}
              onChange={() => setRole("participant")}
              className="accent-forest" 
            />
            <span className="text-sm">Participant</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="role" 
              value="organization" 
              checked={role === "organization"}
              onChange={() => setRole("organization")}
              className="accent-forest" 
            />
            <span className="text-sm">Organization</span>
          </label>
        </div>
      </div>

      {role === "participant" ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" name="firstName" placeholder="First name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" name="lastName" placeholder="Last name" required />
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="orgName">Organization Name</Label>
          <Input id="orgName" name="orgName" placeholder="Mindful Minds" required />
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder={role === "organization" ? "hello@org.com" : "you@example.com"} required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
      </div>
      
      <SubmitButton pendingText="Creating Account..." className="w-full rounded-full bg-forest text-cream hover:bg-forest-deep" formAction={register}>
        <UserPlus className="mr-2 h-4 w-4" />
        Create Account
      </SubmitButton>
    </form>
  );
}
