import Link from "next/link";
import { Briefcase } from "lucide-react";

export default function Navbar() {
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
        <div className="flex items-center gap-6">
          <Link 
            href="/#features" 
            className="hidden md:block text-sm font-medium text-neutral-400 hover:text-white transition-colors"
          >
            Features
          </Link>
          <Link 
            href="/scan" 
            className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link 
            href="/scan"
            className="inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white text-sm font-medium px-4 py-2 rounded-full transition-all active:scale-[0.98] shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]"
          >
            Scan CV
          </Link>
        </div>
      </div>
    </nav>
  );
}
