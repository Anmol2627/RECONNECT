"use client";
import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { mockParticipant } from "../data/mock";

type CheckIn = {
  feeling: string;
  barriers: string[];
  details: string;
};

type AppState = {
  user: typeof mockParticipant & { email?: string };
  checkIn: CheckIn | null;
  recommendation: { id: string; type: string } | null;
  joinedSessions: string[];
  courseProgress: Record<string, number>;
  resourceProgress: Record<string, number>;
  savedResources: string[];
  settings: { textSize: string; theme: string; notifications: boolean };
};

type AppContextType = {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  joinSession: (sessionId: string) => void;
  saveResource: (resourceId: string) => void;
  updateCheckIn: (checkIn: CheckIn) => void;
};

const defaultState: AppState = {
  user: mockParticipant,
  checkIn: null,
  recommendation: null,
  joinedSessions: [],
  courseProgress: { "workplace-communication": 60 },
  resourceProgress: {},
  savedResources: [],
  settings: { textSize: "Medium", theme: "Light", notifications: true },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children, initialProfile, initialEmail }: { children: ReactNode, initialProfile?: any, initialEmail?: string }) {
  const [state, setState] = useState<AppState>(() => {
    let initialState = defaultState;
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("reconnect_app_state");
      if (saved) initialState = JSON.parse(saved);
    }
    
    if (initialProfile) {
      initialState.user = {
        id: initialProfile.id,
        firstName: initialProfile.first_name,
        fullName: initialProfile.full_name,
        initials: (initialProfile.first_name?.[0] || "") + (initialProfile.full_name?.split(" ")[1]?.[0] || ""),
        email: initialEmail,
      };
    } else if (initialEmail) {
      initialState.user.email = initialEmail;
    }
    
    return initialState;
  });

  // Sync prop changes into state if the server passes a new initialProfile
  useEffect(() => {
    if (initialProfile) {
      setState((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          id: initialProfile.id,
          firstName: initialProfile.first_name,
          fullName: initialProfile.full_name,
          initials: (initialProfile.first_name?.[0] || "") + (initialProfile.full_name?.split(" ")[1]?.[0] || ""),
          email: initialEmail || prev.user.email,
        }
      }));
    }
  }, [initialProfile, initialEmail]);

  useEffect(() => {
    localStorage.setItem("reconnect_app_state", JSON.stringify(state));
  }, [state]);

  const updateState = (updates: Partial<AppState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const joinSession = (sessionId: string) => {
    if (!state.joinedSessions.includes(sessionId)) {
      updateState({ joinedSessions: [...state.joinedSessions, sessionId] });
    }
  };

  const saveResource = (resourceId: string) => {
    if (state.savedResources.includes(resourceId)) {
      updateState({ savedResources: state.savedResources.filter(id => id !== resourceId) });
    } else {
      updateState({ savedResources: [...state.savedResources, resourceId] });
    }
  };

  const updateCheckIn = (checkIn: CheckIn) => {
    // Basic recommendation logic based on Check-In
    const recommendation = checkIn.barriers.includes("Low confidence")
      ? { id: "employment-confidence", type: "session" }
      : { id: "general-support", type: "session" };

    updateState({ checkIn, recommendation });
  };

  return (
    <AppContext.Provider value={{ state, updateState, joinSession, saveResource, updateCheckIn }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}
