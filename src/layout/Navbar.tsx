"use client"

import Link from "next/link";
import MaxWidthWrapper from "../components/custom/MaxWidthWrapper";
import ConnectRoninWalletButton from "../components/ConnectWallet";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react"
import { Search, Grid3X3, TrendingUp } from "lucide-react";

const Navbar = () => {
  const { data: session, status } = useSession()

  return (
    <header className="sticky top-0 z-50 border-b border-[#21262d] bg-[#1a1c1f]/95 backdrop-blur-md">
      <MaxWidthWrapper>
        <div className="flex h-16 items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-[#2081e2] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">CR</span>
            </div>
            <span className="text-white font-bold text-base hidden sm:block">CryptoRonin</span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a939b]" />
              <input
                type="text"
                placeholder="Search items, collections, and accounts"
                className="w-full bg-[#262b2f] border border-[#353840] rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-[#8a939b] focus:outline-none focus:border-[#2081e2] transition-colors"
              />
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/collection"
              className="flex items-center gap-1.5 text-sm text-[#8a939b] hover:text-white hover:bg-[#262b2f] px-3 py-2 rounded-xl transition-colors"
            >
              <Grid3X3 className="w-4 h-4" />
              Explore
            </Link>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-[#8a939b] hover:text-white hover:bg-[#262b2f] px-3 py-2 rounded-xl transition-colors"
            >
              <TrendingUp className="w-4 h-4" />
              Stats
            </Link>
          </nav>

          {/* Auth / Wallet */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {session?.user?.email && (
              <span className="text-xs text-[#8a939b] hidden md:block truncate max-w-32">
                {session.user.email}
              </span>
            )}
            {status === "unauthenticated" && <ConnectRoninWalletButton />}
            {status === "authenticated" && (
              <button
                onClick={() => signOut()}
                className="bg-[#353840] hover:bg-[#404650] text-white text-sm px-4 py-2 rounded-xl transition-colors"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Navbar;
