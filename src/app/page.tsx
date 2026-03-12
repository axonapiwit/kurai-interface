"use client";

import { useEffect, useRef, useState } from "react";
import {
  Leaf,
  Shield,
  Zap,
  TrendingUp,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Twitter,
  Github,
} from "lucide-react";
import MaxWidthWrapper from "@/components/custom/MaxWidthWrapper";
import ScrollReveal from "@/components/custom/ScrollReveal";
import ScrollToTop from "react-scroll-to-top";
import DonutChart from "@/components/custom/DonutChart";
import Countdown from "@/components/custom/Countdown";
import Timeline from "@/components/custom/Timeline";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useQuery } from "react-query";
import { getCollections } from "./api";
import CardCollection from "@/components/custom/CardCollection";
import SkeletonCollection from "@/components/custom/SkeletonCollection";

// ─── Static data ──────────────────────────────────────────────────────────────

const features = [
  {
    name: "Secure by Design",
    Icon: Shield,
    description:
      "Audited smart contracts and self-custodied wallets. Your keys, your assets — no middlemen.",
  },
  {
    name: "Trade Anywhere",
    Icon: Leaf,
    description:
      "Seamless Ronin wallet integration lets you trade from any device, anywhere in the world.",
  },
  {
    name: "Early Bonus",
    Icon: Zap,
    description:
      "Early adopters earn bonus tokens and exclusive NFT drops. The sooner you join, the more you earn.",
  },
  {
    name: "Low Fees",
    Icon: TrendingUp,
    description:
      "Ronin's minimal gas fees mean you keep more of your earnings on every trade and mint.",
  },
];

const FEATURED_SLIDES = [
  {
    id: 0,
    name: "Kurai",
    creator: "KuraiDeployer",
    verified: true,
    stats: { floorPrice: "0.05 RON", items: "8,200", totalVolume: "12.4K RON" },
    bg: "linear-gradient(135deg, #0f0c29 0%, #302b63 55%, #1e1b4b 100%)",
    glow1: "radial-gradient(ellipse 70% 60% at 75% 30%, rgba(139,92,246,0.35) 0%, transparent 70%)",
    glow2: "radial-gradient(ellipse 50% 40% at 28% 70%, rgba(59,130,246,0.2) 0%, transparent 60%)",
  },
  {
    id: 1,
    name: "Ronin Warriors",
    creator: "WarriorStudios",
    verified: true,
    stats: { floorPrice: "0.12 RON", items: "3,333", totalVolume: "8.7K RON" },
    bg: "linear-gradient(135deg, #1c0500 0%, #431200 55%, #2d0800 100%)",
    glow1: "radial-gradient(ellipse 70% 60% at 75% 30%, rgba(234,88,12,0.35) 0%, transparent 70%)",
    glow2: "radial-gradient(ellipse 50% 40% at 25% 65%, rgba(239,68,68,0.2) 0%, transparent 60%)",
  },
  {
    id: 2,
    name: "Pixel Realm",
    creator: "PixelForge",
    verified: false,
    stats: { floorPrice: "0.02 RON", items: "10,000", totalVolume: "4.2K RON" },
    bg: "linear-gradient(135deg, #001a0f 0%, #003d28 55%, #001f18 100%)",
    glow1: "radial-gradient(ellipse 70% 60% at 75% 30%, rgba(16,185,129,0.3) 0%, transparent 70%)",
    glow2: "radial-gradient(ellipse 50% 40% at 30% 65%, rgba(6,182,212,0.18) 0%, transparent 60%)",
  },
];

const CURATED_COLLECTIONS = [
  {
    id: 1,
    name: "Kurai Genesis",
    items: "8,200 items",
    description: "The original Kurai collection on Ronin — where it all began.",
    bg: "linear-gradient(120deg, #2e1065 0%, #4338ca 60%, #1e1b4b 100%)",
  },
  {
    id: 2,
    name: "Ronin Warriors",
    items: "3,333 items",
    description: "Elite warriors defending the Ronin chain. Rare 1/1 variants available.",
    bg: "linear-gradient(120deg, #431407 0%, #c2410c 60%, #7c2d12 100%)",
  },
  {
    id: 3,
    name: "Pixel Realm",
    items: "10,000 items",
    description: "Enter the pixelated metaverse. 10K unique explorers, infinite worlds.",
    bg: "linear-gradient(120deg, #022c22 0%, #059669 60%, #064e3b 100%)",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Aont",
    role: "Lead Developer",
    bio: "Ronin smart contracts & backend",
    initial: "A",
    gradient: "linear-gradient(135deg, #2081e2 0%, #0d47a1 100%)",
  },
  {
    name: "Kurai",
    role: "Art Director",
    bio: "NFT design & collection curation",
    initial: "K",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)",
  },
  {
    name: "Ronin",
    role: "Community Lead",
    bio: "Growth, partnerships & events",
    initial: "R",
    gradient: "linear-gradient(135deg, #059669 0%, #064e3b 100%)",
  },
];

const FAQ_ITEMS = [
  {
    q: "How do I connect my Ronin wallet?",
    a: "Click \"Connect Wallet\" in the top navigation bar. If you don't have the Ronin wallet extension installed, you'll be redirected to download it first.",
  },
  {
    q: "What are the token sale allocation rates?",
    a: "Token allocations are split across Financial Overhead (73%), Bonus & Fund (55%), IT Infrastructure (38%), and Gift Code Inventory (20.93%). Early participants receive the best rates.",
  },
  {
    q: "When can I start minting NFTs?",
    a: "NFT minting is available now. Connect your Ronin wallet, browse the collection, and mint directly from the Collection page.",
  },
  {
    q: "How do NFT royalties work?",
    a: "Creators earn a 5% royalty on every secondary sale. Royalties are enforced on-chain via the Ronin smart contract, so creators always get paid automatically.",
  },
  {
    q: "Is there a mobile app?",
    a: "A dedicated mobile app is on our Q2 2025 roadmap. In the meantime, the platform is fully responsive and works on any modern mobile browser with the Ronin wallet app installed.",
  },
];

// ─── Verified badge ───────────────────────────────────────────────────────────
function VerifiedBadge() {
  return (
    <svg className="w-4 h-4 text-[#2081e2] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// ─── Hero Banner ──────────────────────────────────────────────────────────────
function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % FEATURED_SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  const slide = FEATURED_SLIDES[current];

  return (
    <section className="border-b border-[#21262d]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ height: "clamp(280px, 42vw, 480px)" }}
        >
          <div className="absolute inset-0 transition-all duration-700" style={{ background: slide.bg }} />
          <div className="absolute inset-0 transition-all duration-700" style={{ background: slide.glow1 }} />
          <div className="absolute inset-0 transition-all duration-700" style={{ background: slide.glow2 }} />

          <div
            className="absolute rounded-full blur-3xl pointer-events-none"
            style={{ top: "10%", right: "15%", width: 200, height: 200, background: "rgba(255,255,255,0.04)" }}
          />
          <div
            className="absolute border border-white/[0.06] rounded-full pointer-events-none"
            style={{ width: 340, height: 340, top: -80, right: -80 }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />

          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 md:p-8">
            <div className="text-white/55 text-xs mb-1.5">By {slide.creator}</div>
            <div className="flex items-center gap-2 mb-4">
              <h2
                className="text-white font-bold tracking-tight"
                style={{ fontSize: "clamp(1.25rem, 3vw, 1.875rem)" }}
              >
                {slide.name}
              </h2>
              {slide.verified && <VerifiedBadge />}
            </div>
            <div className="flex flex-wrap items-center gap-5 sm:gap-8">
              {[
                { label: "FLOOR", value: slide.stats.floorPrice },
                { label: "ITEMS", value: slide.stats.items },
                { label: "VOLUME", value: slide.stats.totalVolume },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-white font-bold text-sm sm:text-base tabular-nums">{stat.value}</div>
                  <div className="text-white/45 text-xs font-medium tracking-widest mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrent((c) => (c - 1 + FEATURED_SLIDES.length) % FEATURED_SLIDES.length)}
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-black/60 hover:border-white/20 hover:scale-105 transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrent((c) => (c + 1) % FEATURED_SLIDES.length)}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-black/60 hover:border-white/20 hover:scale-105 transition-all duration-200"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {FEATURED_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/35 hover:bg-white/55"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Trending Collections ─────────────────────────────────────────────────────
function TrendingSection() {
  const { data, isLoading } = useQuery("collections", getCollections, { staleTime: 60000 });
  const items = data?.result?.slice(0, 10) ?? [];

  return (
    <section className="border-b border-[#21262d]">
      <MaxWidthWrapper className="py-8 sm:py-10">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-5 sm:mb-6">
            <div>
              <h2 className="text-white text-lg sm:text-xl font-bold">Trending</h2>
            </div>
            <Link
              href="/collection"
              className="flex items-center gap-1 text-xs sm:text-sm text-[#2081e2] hover:text-[#4d9fe8] transition-colors"
            >
              View all <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3">
          {isLoading || !data
            ? Array.from({ length: 10 }).map((_, i) => <SkeletonCollection key={i} />)
            : items.map((item: any, i: number) => {
                const meta = JSON.parse(item?.metadata ?? "{}");
                return (
                  <ScrollReveal key={item.token_id} className={`stagger-${Math.min(i + 1, 8)}`}>
                    <CardCollection title={meta.name} ipfs={meta.image} />
                  </ScrollReveal>
                );
              })}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

// ─── Curated Collections ──────────────────────────────────────────────────────
function CuratedSection() {
  const [featured, ...rest] = CURATED_COLLECTIONS;

  return (
    <section className="border-b border-[#21262d]">
      <MaxWidthWrapper className="py-8 sm:py-10">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-5 sm:mb-6">
            <div>
              <h2 className="text-white text-lg sm:text-xl font-bold">Curated</h2>
            </div>
            <Link
              href="/collection"
              className="flex items-center gap-1 text-xs sm:text-sm text-[#2081e2] hover:text-[#4d9fe8] transition-colors"
            >
              View all <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
          <ScrollReveal className="stagger-1 lg:col-span-3">
            <Link href="/collection">
              <div
                className="card-lift group relative rounded-2xl overflow-hidden cursor-pointer"
                style={{ height: "clamp(220px, 30vw, 340px)" }}
              >
                <div className="absolute inset-0" style={{ background: featured.bg }} />
                <div
                  className="absolute inset-0"
                  style={{ background: "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(255,255,255,0.08) 0%, transparent 60%)" }}
                />
                <div
                  className="absolute border border-white/[0.06] rounded-full pointer-events-none"
                  style={{ width: 300, height: 300, top: -120, right: -80 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <div className="text-white/50 text-xs mb-1">Featured</div>
                  <h3 className="text-white font-bold text-xl sm:text-2xl mb-1">{featured.name}</h3>
                  <p className="text-white/55 text-sm mb-4 hidden sm:block">{featured.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-xs">{featured.items}</span>
                    <span className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors group-hover:border-white/25">
                      Explore <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          <div className="lg:col-span-2 flex flex-col gap-3">
            {rest.map((col, i) => (
              <ScrollReveal key={col.id} className={`stagger-${i + 2} flex-1`}>
                <Link href="/collection" className="block h-full">
                  <div
                    className="card-lift group relative rounded-2xl overflow-hidden cursor-pointer h-full"
                    style={{ minHeight: "clamp(100px, 13vw, 160px)" }}
                  >
                    <div className="absolute inset-0" style={{ background: col.bg }} />
                    <div
                      className="absolute inset-0"
                      style={{ background: "radial-gradient(ellipse 70% 55% at 75% 25%, rgba(255,255,255,0.08) 0%, transparent 65%)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold text-sm sm:text-base">{col.name}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-white/50 text-xs">{col.items}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white/70 transition-all duration-200 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

// ─── Platform Stats ───────────────────────────────────────────────────────────
function StatItem({ target, label, suffix = "+" }: { target: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const startTime = performance.now();
        const dur = 1600;
        const tick = (now: number) => {
          const t = Math.min((now - startTime) / dur, 1);
          const eased = 1 - Math.pow(1 - t, 4);
          setCount(Math.floor(eased * target));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center py-8 sm:py-10 px-4">
      <div
        className="text-white font-bold tabular-nums"
        style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)" }}
      >
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-[#8a939b] text-sm mt-1.5">{label}</div>
    </div>
  );
}

function StatsSection() {
  return (
    <section className="border-b border-[#21262d]">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#21262d]">
          <StatItem target={4200} label="RON Total Volume" />
          <StatItem target={42100} label="NFTs Minted" />
          <StatItem target={8247} label="Active Collectors" />
          <StatItem target={15} label="Collections" />
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="min-h-screen bg-[#1a1c1f]">
      <ScrollToTop
        smooth
        color="#2081e2"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#262b2f",
          border: "1px solid #353840",
        }}
      />

      <HeroBanner />
      <TrendingSection />
      <CuratedSection />

      {/* Features Section */}
      <section className="border-b border-[#21262d]">
        <MaxWidthWrapper className="py-12 sm:py-16 lg:py-20">
          <ScrollReveal>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3">Why Kurai?</h2>
              <p className="text-[#8a939b] max-w-md mx-auto">
                Trade, collect, and grow your digital assets on Ronin.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.name} className={`stagger-${i + 1} h-full`}>
                <div className="card-lift h-full bg-[#262b2f] border border-[#353840] rounded-xl p-5 sm:p-6 hover:border-[#2081e2]/40 group flex flex-col">
                  <div className="w-10 h-10 bg-[#2081e2]/10 rounded-xl flex items-center justify-center text-[#2081e2] mb-4 group-hover:bg-[#2081e2]/20 transition-colors">
                    <feature.Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{feature.name}</h3>
                  <p className="text-[#8a939b] text-sm leading-relaxed">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Token Sale Section */}
      <section className="border-b border-[#21262d]">
        <MaxWidthWrapper className="py-12 sm:py-16 lg:py-20">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#2081e2]/10 border border-[#2081e2]/20 text-[#2081e2] text-xs font-medium px-3 py-1.5 rounded-full mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2081e2] pulse-dot" />
                  Live Sale
                </div>
                <h2 className="text-white text-2xl sm:text-3xl font-bold">KuraiToken (KRT)</h2>
                <p className="text-[#8a939b] text-sm mt-1.5">1 RON = 100 KRT &nbsp;·&nbsp; Soft cap: 500,000 RON</p>
              </div>
              <button className="btn-press self-start flex-shrink-0 bg-[#2081e2] hover:bg-[#1868b7] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2">
                Buy Tokens <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#262b2f] border border-[#353840] rounded-2xl p-5 sm:p-6 mb-4">
              <div className="flex items-end justify-between mb-3">
                <div>
                  <span className="text-white font-bold text-xl sm:text-2xl tabular-nums">342,100</span>
                  <span className="text-[#8a939b] text-sm ml-2">RON raised</span>
                </div>
                <span className="text-[#2081e2] font-semibold text-sm tabular-nums">68.4%</span>
              </div>
              <div className="h-2.5 bg-[#1a1c1f] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: "68.4%", background: "linear-gradient(90deg, #1560b0 0%, #2081e2 100%)" }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[#8a939b] text-xs">0 RON</span>
                <span className="text-[#8a939b] text-xs">Goal: 500,000 RON</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <ScrollReveal className="stagger-1">
              <div className="bg-[#262b2f] border border-[#353840] rounded-2xl p-5 sm:p-6 h-full">
                <h3 className="text-white font-semibold text-sm mb-5">Token Distribution</h3>
                <ul className="space-y-4">
                  {[
                    { label: "Financial Overhead", pct: 73, color: "#2081e2" },
                    { label: "Bonus & Fund", pct: 55, color: "#7c3aed" },
                    { label: "IT Infrastructure", pct: 38, color: "#059669" },
                    { label: "Gift Code Inventory", pct: 21, color: "#d97706" },
                  ].map((item) => (
                    <li key={item.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[#8a939b] text-xs">{item.label}</span>
                        <span className="text-white text-xs font-semibold tabular-nums">{item.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-[#1a1c1f] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${item.pct}%`, background: item.color, opacity: 0.85 }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal className="stagger-2">
              <div className="bg-[#262b2f] border border-[#353840] rounded-2xl p-5 sm:p-6 h-full">
                <h3 className="text-white font-semibold text-sm mb-4">Allocation Chart</h3>
                <DonutChart />
              </div>
            </ScrollReveal>

            <ScrollReveal className="stagger-3">
              <div
                className="relative rounded-2xl overflow-hidden p-5 sm:p-6 h-full flex flex-col"
                style={{ background: "linear-gradient(135deg, #0d1b35 0%, #0f2347 55%, #0a1628 100%)" }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(32,129,226,0.18) 0%, transparent 70%)" }}
                />
                <div className="relative flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2081e2] pulse-dot" />
                    <span className="text-[#2081e2] text-xs font-medium">Ends soon</span>
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-5">Sale Countdown</h3>
                  <Countdown />
                  <p className="text-[#4a6080] text-xs mt-5 leading-relaxed">
                    Don&apos;t miss the early-adopter rate. Once the timer hits zero, public sale pricing ends.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Platform Stats Strip */}
      <StatsSection />

      {/* Roadmap Section */}
      <section className="border-b border-[#21262d]">
        <MaxWidthWrapper className="py-12 sm:py-16 lg:py-20 max-w-2xl">
          <Timeline />
        </MaxWidthWrapper>
      </section>

      {/* Team Section */}
      <section className="border-b border-[#21262d]">
        <MaxWidthWrapper className="py-12 sm:py-16 lg:py-20">
          <ScrollReveal>
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-white text-2xl sm:text-3xl font-bold mb-2">Our Team</h2>
              <p className="text-[#8a939b] text-sm">The people building Kurai</p>
            </div>
          </ScrollReveal>
          <div className="max-w-xl mx-auto space-y-3">
            {TEAM_MEMBERS.map((member, i) => (
              <ScrollReveal key={member.name} className={`stagger-${i + 1}`}>
                <div className="group card-lift flex items-center gap-4 sm:gap-5 p-4 sm:p-5 bg-[#1e2025] border border-[#2a2d34] rounded-2xl hover:border-[#353840] transition-colors">
                  {/* Avatar with glow */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
                      style={{ background: member.gradient }}
                    >
                      {member.initial}
                    </div>
                    <div
                      className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                      style={{ background: member.gradient, zIndex: -1 }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-white font-semibold text-sm sm:text-base">{member.name}</span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-md font-medium"
                        style={{ background: "rgba(32,129,226,0.1)", color: "#2081e2" }}
                      >
                        {member.role}
                      </span>
                    </div>
                    <p className="text-[#5a6070] text-xs leading-relaxed">{member.bio}</p>
                  </div>

                  {/* Social */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button className="w-8 h-8 rounded-lg bg-[#262b2f] border border-[#353840] flex items-center justify-center text-[#8a939b] hover:text-white hover:border-[#4a5060] transition-colors">
                      <Twitter className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-[#262b2f] border border-[#353840] flex items-center justify-center text-[#8a939b] hover:text-white hover:border-[#4a5060] transition-colors">
                      <Github className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* FAQ Section */}
      <section className="border-b border-[#21262d]">
        <MaxWidthWrapper className="py-12 sm:py-16 lg:py-20 max-w-2xl">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-white text-2xl sm:text-3xl font-bold mb-2">FAQ</h2>
              <p className="text-[#8a939b] text-sm">Common questions about Kurai</p>
            </div>
          </ScrollReveal>
          <ScrollReveal className="stagger-1">
            <Accordion type="single" collapsible className="space-y-2">
              {FAQ_ITEMS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-[#1e2025] border border-[#2a2d34] rounded-xl overflow-hidden data-[state=open]:border-[#2081e2]/30 transition-colors"
                >
                  <AccordionTrigger className="text-white hover:no-underline px-5 py-4 text-sm font-medium text-left [&>svg]:text-[#8a939b]">
                    <span className="flex items-center gap-3">
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold tabular-nums"
                        style={{ background: "rgba(32,129,226,0.12)", color: "#2081e2" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {faq.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[#8a939b] text-sm px-5 pb-4 leading-relaxed pl-14">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal className="stagger-2">
            <div className="mt-8 text-center">
              <p className="text-[#8a939b] text-sm mb-3">Still have questions?</p>
              <a
                href="#"
                className="btn-press inline-flex items-center gap-2 bg-[#262b2f] border border-[#353840] hover:border-[#2081e2]/40 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
              >
                Join our Discord
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>
        </MaxWidthWrapper>
      </section>
    </main>
  );
}
