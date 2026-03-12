"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import MaxWidthWrapper from "../components/custom/MaxWidthWrapper";
import ConnectRoninWalletButton from "../components/ConnectWallet";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Search, Grid3X3, TrendingUp, ChevronDown, Menu, X } from "lucide-react";

const CATEGORIES = ["All", "Gaming", "Art", "PFPs", "More"] as const;

const CHAIN_ICONS = [
  { label: "ETH", style: { background: "linear-gradient(135deg, #627eea 0%, #4a5ecc 100%)" } },
  { label: "RON", style: { background: "linear-gradient(135deg, #2081e2 0%, #1565c0 100%)" } },
  { label: "SOL", style: { background: "linear-gradient(135deg, #9945ff 0%, #14f195 100%)" } },
  { label: "BNB", style: { background: "linear-gradient(135deg, #f3ba2f 0%, #e0990a 100%)" } },
  { label: "POL", style: { background: "linear-gradient(135deg, #8247e5 0%, #6033b5 100%)" } },
  { label: "BASE", style: { background: "linear-gradient(135deg, #0052ff 0%, #003ccc 100%)" } },
];

const Navbar = () => {
  const { data: session, status } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"NFTs" | "Tokens">("NFTs");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md navbar-scroll ${
        scrolled
          ? "bg-[#1a1c1f]/98 border-b border-[#21262d]"
          : "bg-[#1a1c1f]/80 border-b border-transparent"
      }`}
    >
      {/* Primary row */}
      <MaxWidthWrapper>
        <div className="flex h-16 items-center gap-3 sm:gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-[#2081e2] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">K</span>
            </div>
            <span className="text-white font-bold text-base hidden sm:block">Kurai</span>
          </Link>

          {/* Search — compact on mobile */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a939b]" />
              <input
                type="text"
                placeholder="Search..."
                className="search-glow w-full bg-[#262b2f] border border-[#353840] rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-[#8a939b] focus:outline-none focus:border-[#2081e2] transition-all duration-200 sm:placeholder:content-['Search_items,_collections,_and_accounts']"
              />
            </div>
          </div>

          {/* Nav links — desktop */}
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

          {/* Auth / Wallet — hidden on small mobile */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            {session?.user?.email && (
              <span className="text-xs text-[#8a939b] hidden md:block truncate max-w-32">
                {session.user.email}
              </span>
            )}
            {status === "unauthenticated" && <ConnectRoninWalletButton />}
            {status === "authenticated" && (
              <button
                onClick={() => signOut()}
                className="btn-press bg-[#353840] hover:bg-[#404650] text-white text-sm px-4 py-2 rounded-xl transition-colors"
              >
                Sign Out
              </button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl text-[#8a939b] hover:text-white hover:bg-[#262b2f] transition-colors flex-shrink-0"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </MaxWidthWrapper>

      {/* Secondary row — filters (horizontally scrollable on mobile) */}
      <div className="border-t border-[#21262d]/70">
        <MaxWidthWrapper>
          <div className="flex items-center h-11 gap-3 overflow-x-auto scrollbar-hide">
            {/* Category pills */}
            <div className="flex items-center gap-0.5 flex-shrink-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-150 whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-white text-[#1a1c1f]"
                      : "text-[#8a939b] hover:text-white hover:bg-[#262b2f]"
                  }`}
                >
                  {cat}
                  {cat === "More" && <ChevronDown className="w-3 h-3" />}
                </button>
              ))}
            </div>

            {/* Vertical divider */}
            <div className="w-px h-4 bg-[#353840] flex-shrink-0" />

            {/* Chain / collection icons */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {CHAIN_ICONS.map((icon) => (
                <button
                  key={icon.label}
                  title={icon.label}
                  style={icon.style}
                  className="w-6 h-6 rounded-full flex-shrink-0 hover:ring-2 hover:ring-white/25 transition-all duration-150"
                />
              ))}
              <button className="text-[#8a939b] hover:text-white transition-colors flex-shrink-0">
                <span className="text-sm tracking-widest leading-none">···</span>
              </button>
            </div>

            {/* NFTs / Tokens toggle */}
            <div className="flex items-center bg-[#262b2f] border border-[#353840] rounded-lg p-0.5 flex-shrink-0">
              {(["NFTs", "Tokens"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs font-medium px-3 py-1 rounded-md transition-all duration-150 ${
                    activeTab === tab
                      ? "bg-[#353840] text-white"
                      : "text-[#8a939b] hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 top-[7.75rem] bg-black/60 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="mobile-drawer fixed top-[7.75rem] left-0 right-0 bg-[#1a1c1f] border-b border-[#21262d] z-50 lg:hidden max-h-[calc(100vh-7.75rem)] overflow-y-auto">
            <div className="p-4 space-y-4">
              {/* Nav links */}
              <nav className="space-y-1">
                <Link
                  href="/collection"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 text-[#8a939b] hover:text-white hover:bg-[#262b2f] px-4 py-3 rounded-xl transition-colors"
                >
                  <Grid3X3 className="w-5 h-5" />
                  <span className="text-sm font-medium">Explore</span>
                </Link>
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 text-[#8a939b] hover:text-white hover:bg-[#262b2f] px-4 py-3 rounded-xl transition-colors"
                >
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm font-medium">Stats</span>
                </Link>
              </nav>

              {/* Wallet — mobile only (visible below sm) */}
              <div className="pt-3 border-t border-[#21262d] sm:hidden">
                {session?.user?.email && (
                  <span className="text-xs text-[#8a939b] block mb-3 truncate">
                    {session.user.email}
                  </span>
                )}
                {status === "unauthenticated" && <ConnectRoninWalletButton />}
                {status === "authenticated" && (
                  <button
                    onClick={() => { signOut(); setMobileOpen(false); }}
                    className="btn-press bg-[#353840] hover:bg-[#404650] text-white text-sm px-4 py-2.5 rounded-xl transition-colors w-full"
                  >
                    Sign Out
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
