"use client";

import { useEffect, useRef, useState } from "react";

const milestones = [
  {
    title: "Token Launch",
    tag: "Q1 2024",
    done: true,
    description:
      "Initial token distribution and public sale. Early supporters receive bonus allocations and governance rights.",
  },
  {
    title: "Mint NFT",
    tag: "Q2 2024",
    done: true,
    description:
      "Launch of our first NFT collection on Ronin. Holders get exclusive access to future drops and community events.",
  },
  {
    title: "Staking",
    tag: "Q2 2024",
    done: true,
    description:
      "Stake tokens to earn passive rewards. Flexible and locked staking pools with competitive APY rates.",
  },
  {
    title: "Mystery Box",
    tag: "Q3 2024",
    done: false,
    description:
      "Randomized NFT drops with rare collectibles. Each mystery box contains unique items with varying rarity tiers.",
  },
  {
    title: "NFT Marketplace",
    tag: "Q4 2024",
    done: false,
    description:
      "Full peer-to-peer marketplace for buying, selling, and auctioning NFTs on the Ronin network.",
  },
];

const doneCount = milestones.filter((m) => m.done).length;

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-10">
        <div>
          <h2 className="text-foreground text-2xl font-bold">Roadmap</h2>
          <p className="text-muted-foreground text-sm mt-1">Building the future of Ronin NFTs</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-28 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-primary"
              style={{
                width: revealed ? `${(doneCount / milestones.length) * 100}%` : "0%",
                transition: "width 1s cubic-bezier(0.25, 1, 0.5, 1) 200ms",
              }}
            />
          </div>
          <span className="text-muted-foreground text-sm whitespace-nowrap">
            <span className="text-foreground font-semibold">{doneCount}</span>
            <span> / {milestones.length}</span>
          </span>
        </div>
      </div>

      {/* Timeline list */}
      <div className="relative">
        {/* Static background line */}
        <div className="absolute left-[21px] top-6 bottom-6 w-px bg-border" />

        {/* Animated fill line */}
        <div
          className="absolute left-[21px] top-6 w-px rounded-full bg-primary"
          style={{
            height: revealed ? `${(doneCount / milestones.length) * 100}%` : "0%",
            transition: "height 1s cubic-bezier(0.25, 1, 0.5, 1) 100ms",
          }}
        />

        <div className="space-y-4">
          {milestones.map((m, i) => (
            <div
              key={i}
              className="relative flex gap-5"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.5s ease, transform 0.5s ease`,
                transitionDelay: `${150 + i * 100}ms`,
              }}
            >
              {/* Node */}
              <div className="relative z-10 flex-shrink-0 mt-0.5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center border"
                  style={{
                    background: m.done ? "hsl(var(--primary) / 0.12)" : "hsl(var(--background))",
                    borderColor: m.done ? "hsl(var(--primary) / 0.5)" : "hsl(var(--border))",
                    color: m.done ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                  }}
                >
                  {m.done ? (
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span className="text-xs font-bold">{i + 1}</span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div
                className="flex-1 rounded-xl p-4 border mb-1 transition-colors"
                style={{
                  background: m.done ? "hsl(var(--card))" : "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  opacity: m.done ? 1 : 0.65,
                }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h3
                    className="font-semibold text-sm"
                    style={{ color: m.done ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}
                  >
                    {m.title}
                  </h3>
                  <span
                    className="text-xs px-2 py-0.5 rounded-lg font-medium flex-shrink-0"
                    style={{
                      background: m.done ? "hsl(var(--primary) / 0.1)" : "hsl(var(--secondary))",
                      color: m.done ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                    }}
                  >
                    {m.tag}
                  </span>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
