import React from "react";

const milestones = [
  {
    title: "Token Launch",
    tag: "Completed",
    done: true,
    description:
      "Initial token distribution and public sale. Early supporters receive bonus allocations and governance rights.",
  },
  {
    title: "Mint NFT",
    tag: "Completed",
    done: true,
    description:
      "Launch of our first NFT collection on Ronin. Holders get exclusive access to future drops, community events, and staking rewards.",
  },
  {
    title: "Staking",
    tag: "Completed",
    done: true,
    description:
      "Stake your tokens to earn passive rewards. Flexible and locked staking pools with competitive APY rates for long-term holders.",
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
      "Full peer-to-peer marketplace for buying, selling, and auctioning NFTs directly on the Ronin network.",
  },
];

export default function Timeline() {
  return (
    <div className="space-y-10">
      <h2 className="text-white text-2xl font-semibold text-center">Roadmap</h2>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-[#353840]" />

        <div className="space-y-6">
          {milestones.map((m, i) => (
            <div key={i} className="relative flex gap-6 pl-16">
              {/* Icon dot */}
              <div
                className={`absolute left-0 top-1 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                  m.done
                    ? "bg-[#2081e2]/10 border-[#2081e2] text-[#2081e2]"
                    : "bg-[#262b2f] border-[#353840] text-[#8a939b]"
                }`}
              >
                {m.done ? (
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-current" />
                )}
              </div>

              {/* Content card */}
              <div className="flex-1 bg-[#262b2f] border border-[#353840] rounded-xl p-4 hover:border-[#2081e2]/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold">{m.title}</h3>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                      m.done
                        ? "bg-[#2081e2]/10 text-[#2081e2]"
                        : "bg-[#353840] text-[#8a939b]"
                    }`}
                  >
                    {m.tag}
                  </span>
                </div>
                <p className="text-[#8a939b] text-sm leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
