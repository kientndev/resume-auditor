"use client";

import Link from "next/link";
import { Briefcase } from "lucide-react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect } from "react";

export default function Navbar() {
  const { user, isLoaded: userLoaded } = useUser();
  const getOrCreateUser = useMutation(api.users.getOrCreateUser);

  // Sync user logging in to Convex
  useEffect(() => {
    if (user?.id && userLoaded) {
      try {
        getOrCreateUser({
          clerkId: user.id,
          email: user.emailAddresses[0]?.emailAddress,
          name: user.fullName || user.firstName || undefined,
          imageUrl: user.imageUrl || undefined,
        });
      } catch (e) {
        console.error("Failed to sync user to Convex:", e);
      }
    }
  }, [user?.id, userLoaded, getOrCreateUser, user?.emailAddresses, user?.fullName, user?.firstName, user?.imageUrl]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/50 backdrop-blur-md border-b border-neutral-900">
      <div className="w-full max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-1.5 rounded-lg group-hover:scale-105 transition-transform">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">YourRecruiter</span>
        </Link>

        {/* Right Side: Links & CTA */}
        <div className="flex items-center gap-4">
          {userLoaded && !user ? (
            null
          ) : userLoaded && user ? (
            <>
              <Link 
                href="/scan"
                className="inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all active:scale-[0.98] shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]"
              >
                Scan CV
              </Link>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 rounded-lg border border-neutral-800",
                  }
                }}
              />
            </>
          ) : (
            // Elegant loading pulse placeholder to prevent layout shifts during hydration
            <div className="w-24 h-8 bg-neutral-900/60 animate-pulse rounded-full" />
          )}
        </div>
      </div>
    </nav>
  );
}
