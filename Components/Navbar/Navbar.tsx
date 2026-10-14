"use client";

import Link from "next/link";
import { useState } from "react";
import AuthButtons from "./AuthButtons";
import MobileAuthButton from "./MobileAuthButton";
import { useSession } from "@/app/lib/auth-client";
import { UserType } from "@/type";

interface Types{
  user: UserType
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const {data:session} = useSession()
  const user = session?.user

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 font-sans shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Website Name */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              F
            </div>
            <span className="text-2xl font-extrabold bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent tracking-tight">
              FabBox
            </span>
          </Link>

          {/* Navigation Menu (Middle) */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className="px-4 py-2 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/50 font-medium transition-all"
            >
              Home
            </Link>
          </div>

          {/* Auth Buttons (Right) */}
          <AuthButtons user={user} />

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <MobileAuthButton setIsOpen={setIsOpen} user={user} />
      )}
    </nav>
  );
}