"use client"

import { useEffect, useState, useCallback, memo } from "react";
import Link from "next/link";
import MaxWidthWrapper from "../components/custom/MaxWidthWrapper";
import ConnectRoninWalletButton from "../components/ConnectWallet";
import { Search, Grid3X3, TrendingUp, ChevronDown, Gamepad2, Palette, Users, LayoutGrid, BarChart2 } from "lucide-react";

// ── Static data (defined once, never recreated) ──────────────────────────────

const CATEGORIES = [
  { label: "All",    icon: LayoutGrid },
  { label: "Gaming", icon: Gamepad2 },
  { label: "Art",    icon: Palette },
  { label: "PFPs",   icon: Users },
  { label: "More",   icon: ChevronDown },
] as const;

// Precompute gradient strings so render never creates new style objects
const CHAIN_ICONS = [
  { label: "ETH",  from: "#627eea", to: "#4a5ecc" },
  { label: "RON",  from: "#2081e2", to: "#1565c0" },
  { label: "SOL",  from: "#9945ff", to: "#14f195" },
  { label: "BNB",  from: "#f3ba2f", to: "#e0990a" },
  { label: "POL",  from: "#8247e5", to: "#6033b5" },
  { label: "BASE", from: "#0052ff", to: "#003ccc" },
].map((c) => ({
  ...c,
  dotStyle:    { background: `linear-gradient(135deg, ${c.from} 0%, ${c.to} 100%)` },
  activeStyle: { background: `linear-gradient(135deg, ${c.from}40 0%, ${c.to}40 100%)` },
}));

// ── Memoized filters row — never re-renders on scroll ────────────────────────

type FiltersProps = {
  activeCategory: string;
  onCategory: (v: string) => void;
  activeTab: "NFTs" | "Tokens";
  onTab: (v: "NFTs" | "Tokens") => void;
  activeChain: string | null;
  onChain: (v: string | null) => void;
};

const FiltersRow = memo(function FiltersRow({
  activeCategory, onCategory,
  activeTab, onTab,
  activeChain, onChain,
}: FiltersProps) {
  return (
    <div className="border-t border-divider/70">
      <MaxWidthWrapper>
        {/* Row 1: Categories + NFTs/Tokens toggle */}
        <div className="flex items-center h-10 gap-2">
          {/* Category pills — scrollable */}
          <div className="flex items-center gap-1 flex-1 min-w-0 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => onCategory(label)}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors duration-150 whitespace-nowrap flex-shrink-0 ${
                  activeCategory === label
                    ? "bg-card text-white border border-border/60"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-3 h-3 flex-shrink-0" />
                {label}
              </button>
            ))}
          </div>

          {/* NFTs / Tokens — sliding pill */}
          <div className="relative flex items-center bg-secondary/30 border border-border/50 rounded-full p-0.5 flex-shrink-0">
            <div
              className={`absolute top-0.5 bottom-0.5 rounded-full bg-card border border-border/40 transition-all duration-200 ${
                activeTab === "NFTs" ? "left-0.5 right-[calc(50%+1px)]" : "left-[calc(50%+1px)] right-0.5"
              }`}
            />
            {(["NFTs", "Tokens"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => onTab(tab)}
                className={`relative z-10 text-xs font-medium px-3 py-1 rounded-full transition-colors duration-150 ${
                  activeTab === tab ? "text-white" : "text-muted-foreground hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Chain filters */}
        <div className="flex items-center h-9 gap-2 border-t border-divider/40 overflow-x-auto scrollbar-hide">
          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider flex-shrink-0">
            Chains
          </span>
          <div className="w-px h-3 bg-secondary flex-shrink-0" />
          {CHAIN_ICONS.map(({ label, dotStyle, activeStyle }) => {
            const active = activeChain === label;
            return (
              <button
                key={label}
                onClick={() => onChain(active ? null : label)}
                title={label}
                className={`flex items-center gap-1.5 flex-shrink-0 transition-colors duration-150 rounded-full ${
                  active
                    ? "px-2.5 py-1 text-white text-xs font-medium bg-card border border-border/60"
                    : "p-0.5 hover:opacity-80"
                }`}
              >
                <span
                  className={`rounded-full flex-shrink-0 ${
                    active ? "w-2.5 h-2.5" : "w-4 h-4 opacity-70"
                  }`}
                  style={dotStyle}
                />
                {active && <span>{label}</span>}
                {!active && <span className="hidden sm:inline text-xs text-muted-foreground">{label}</span>}
              </button>
            );
          })}
          <button className="text-muted-foreground hover:text-white transition-colors flex-shrink-0 px-1 text-xs">
            ···
          </button>
        </div>
      </MaxWidthWrapper>
    </div>
  );
});

// ── Navbar ────────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [scrolled, setScrolled]           = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeTab, setActiveTab]           = useState<"NFTs" | "Tokens">("NFTs");
  const [activeChain, setActiveChain]       = useState<string | null>(null);

  // Guard: only trigger re-render when the boolean actually flips
  const handleScroll = useCallback(() => {
    const next = window.scrollY > 20;
    setScrolled((prev) => (prev === next ? prev : next));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Stable callbacks — FiltersRow won't re-render when scrolled changes
  const handleCategory = useCallback((v: string) => setActiveCategory(v), []);
  const handleTab      = useCallback((v: "NFTs" | "Tokens") => setActiveTab(v), []);
  const handleChain    = useCallback((v: string | null) => setActiveChain(v), []);

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
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-[#2081e2]/80 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-xs">K</span>
            </div>
            <span className="text-white font-bold text-base hidden sm:block">Kurai</span>
          </Link>

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
            <Link
              href="/portfolio"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white hover:bg-card px-3 py-2 rounded-xl transition-colors"
            >
              <BarChart2 className="w-4 h-4" />
              Portfolio
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-2 flex-shrink-0 ml-auto">
            <ConnectRoninWalletButton />
          </div>
        </div>
      </MaxWidthWrapper>

      {/* Filters — memoized, isolated from scroll re-renders */}
      <FiltersRow
        activeCategory={activeCategory} onCategory={handleCategory}
        activeTab={activeTab}           onTab={handleTab}
        activeChain={activeChain}       onChain={handleChain}
      />
    </header>
  );
};

export default Navbar;
