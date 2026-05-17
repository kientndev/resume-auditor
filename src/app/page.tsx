"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import LandingPage from "@/components/LandingPage";
import DashboardView from "@/components/DashboardView";

export default function Home() {
  const { isLoaded: authLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();

  if (!authLoaded || !userLoaded) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-purple-500/30 font-sans flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-neutral-950 to-neutral-950 -z-10" />
        <div className="w-12 h-12 rounded-full border-t-2 border-purple-500 animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) {
    return <LandingPage />;
  }

  return <DashboardView user={user} />;
}
