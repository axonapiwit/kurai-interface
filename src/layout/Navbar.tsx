"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import MaxWidthWrapper from "../components/custom/MaxWidthWrapper";
import ConnectRoninWalletButton from "../components/ConnectWallet";
import { Search, Grid3X3, TrendingUp, ChevronDown } from "lucide-react";

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
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"NFTs" | "Tokens">("NFTs");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md navbar-scroll ${
        scrolled
          ? "bg-background/98 border-b border-divider"
          : "bg-background/80 border-b border-transparent"
      }`}
    >
      {/* Primary row */}
      <MaxWidthWrapper>
        <div className="flex h-14 lg:h-16 items-center gap-3 sm:gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-[#2081e2] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">K</span>
            </div>
            <span className="text-white font-bold text-base hidden sm:block">Kurai</span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="search-glow w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all duration-200"
              />
            </div>
          </div>

          {/* Nav links — desktop only */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/collection"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white hover:bg-card px-3 py-2 rounded-xl transition-colors"
            >
              <Grid3X3 className="w-4 h-4" />
              Explore
            </Link>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white hover:bg-card px-3 py-2 rounded-xl transition-colors"
            >
              <TrendingUp className="w-4 h-4" />
              Stats
            </Link>
          </nav>

          {/* Wallet — desktop only */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0 ml-auto">
            <ConnectRoninWalletButton />
          </div>
        </div>
      </MaxWidthWrapper>

      {/* Secondary row — filters */}
      <div className="border-t border-divider/70">
        <MaxWidthWrapper>
          <div className="flex items-center h-10 gap-3 overflow-x-auto scrollbar-hide">
            {/* Category pills */}
            <div className="flex items-center gap-0.5 flex-shrink-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-150 whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-white text-[#1a1c1f]"
                      : "text-muted-foreground hover:text-white hover:bg-card"
                  }`}
                >
                  {cat}
                  {cat === "More" && <ChevronDown className="w-3 h-3" />}
                </button>
              ))}
            </div>

            {/* Vertical divider */}
            <div className="w-px h-4 bg-secondary flex-shrink-0" />

            {/* Chain icons */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {CHAIN_ICONS.map((icon) => (
                <button
                  key={icon.label}
                  title={icon.label}
                  style={icon.style}
                  className="w-6 h-6 rounded-full flex-shrink-0 hover:ring-2 hover:ring-white/25 transition-all duration-150"
                />
              ))}
              <button className="text-muted-foreground hover:text-white transition-colors flex-shrink-0">
                <span className="text-sm tracking-widest leading-none">···</span>
              </button>
            </div>

            {/* NFTs / Tokens toggle */}
            <div className="flex items-center bg-card border border-border rounded-lg p-0.5 flex-shrink-0">
              {(["NFTs", "Tokens"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs font-medium px-3 py-1 rounded-md transition-all duration-150 ${
                    activeTab === tab
                      ? "bg-secondary text-white"
                      : "text-muted-foreground hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </header>
  );
};

export default Navbar;
