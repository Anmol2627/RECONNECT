"use client";

import { useEffect, useState } from "react";

export function Greeting({ firstName }: { firstName: string }) {
  const [greeting, setGreeting] = useState("Welcome");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <h1 className="font-display text-[2.5rem] leading-tight text-forest-deep">
      {greeting}{firstName ? `, ${firstName}` : ""}! <span aria-hidden="true">👋</span>
    </h1>
  );
}
