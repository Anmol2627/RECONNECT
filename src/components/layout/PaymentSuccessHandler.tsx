"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

export function PaymentSuccessHandler() {
  const searchParams = useSearchParams();
  const { state, joinSession } = useAppContext();

  useEffect(() => {
    const payment = searchParams.get("payment");
    const sessionId = searchParams.get("session");
    
    if (payment === "success" && sessionId) {
      if (!state.joinedSessions.includes(sessionId)) {
        joinSession(sessionId);
      }
      
      // Clean up the URL quietly
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [searchParams, joinSession, state.joinedSessions]);

  return null;
}
