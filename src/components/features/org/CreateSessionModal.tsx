"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createSessionAction } from "@/app/(organization)/org/actions";

export function CreateSessionModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      await createSessionAction(formData);
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to create session.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-forest text-cream hover:bg-forest-deep">
          <Plus className="mr-2 h-4 w-4" />
          Create Session
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-2xl bg-card">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-forest">Create New Session</DialogTitle>
          <DialogDescription>
            Publish a new support opportunity for participants.
          </DialogDescription>
        </DialogHeader>

        <form action={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" required placeholder="e.g. Anxiety Support Group" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <select 
                id="type" 
                name="type" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Group Session">Group Session</option>
                <option value="Course">Course</option>
                <option value="Program">Program</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priceType">Pricing</Label>
              <select 
                id="priceType" 
                name="priceType" 
                onChange={(e) => {
                  const el = document.getElementById('priceContainer');
                  if (el) el.style.display = e.target.value === 'Paid' ? 'block' : 'none';
                }}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
          </div>
          
          <div id="priceContainer" className="space-y-2" style={{ display: 'none' }}>
            <Label htmlFor="price">Price Amount ($)</Label>
            <Input id="price" name="price" type="number" min="1" placeholder="e.g. 50" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" name="description" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" required placeholder="Tomorrow" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" name="time" required placeholder="10:00 AM" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Matching Tags (comma separated)</Label>
            <Input id="tags" name="tags" placeholder="e.g. low-confidence, socially-disconnected" />
            <p className="text-xs text-muted-foreground">Used by the recommendation engine.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="meetingLink">Google Meet Link</Label>
            <Input id="meetingLink" name="meetingLink" required placeholder="https://meet.google.com/..." />
          </div>

          <Button type="submit" disabled={loading} className="w-full rounded-full bg-terracotta text-cream hover:bg-terracotta/90">
            {loading ? "Publishing..." : "Publish Session"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
