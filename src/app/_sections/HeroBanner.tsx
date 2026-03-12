"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

function VerifiedBadge() {
  return (
    <svg className="w-4 h-4 text-primary flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % FEATURED_SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  const slide = FEATURED_SLIDES[current];

  return (
    <section className="border-b border-divider">
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
