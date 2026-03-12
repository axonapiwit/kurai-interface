"use client";

import {
  CheckCircle,
  Leaf,
  Package,
  Shield,
  Zap,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import MaxWidthWrapper from "@/components/custom/MaxWidthWrapper";
import ScrollToTop from "react-scroll-to-top";
import DonutChart from "@/components/custom/DonutChart";
import Countdown from "@/components/custom/Countdown";
import Timeline from "@/components/custom/Timeline";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const features = [
  {
    name: "Safe & Secure",
    Icon: Shield,
    description:
      "Your assets are protected by smart contracts audited by leading security firms, with multi-layer encryption at every step.",
  },
  {
    name: "Universal Access",
    Icon: Leaf,
    description:
      "Trade from anywhere in the world. Our platform supports the Ronin blockchain with seamless wallet integration.",
  },
  {
    name: "Early Bonus",
    Icon: Zap,
    description:
      "Early adopters receive bonus tokens and exclusive NFT drops. The sooner you join, the more you earn.",
  },
  {
    name: "Secure Storage",
    Icon: CheckCircle,
    description:
      "Your digital assets are stored in decentralized wallets you control. No custodial risk, no middlemen.",
  },
  {
    name: "Low Cost",
    Icon: TrendingUp,
    description:
      "Ronin's low gas fees mean you keep more of your earnings. Trade and mint without worrying about transaction costs.",
  },
  {
    name: "Multiple Revenue Streams",
    Icon: Package,
    description:
      "Earn through staking, trading, and NFT royalties. Diversify your crypto income with multiple built-in tools.",
  },
];

const platformStats = [
  { label: "Total Volume", value: "12.4K RON" },
  { label: "NFTs", value: "8,200+" },
  { label: "Collections", value: "140+" },
  { label: "Users", value: "20,000+" },
];

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

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#21262d]">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1c1f] via-[#1a1c1f] to-[#2081e2]/10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2081e2]/5 rounded-full blur-3xl pointer-events-none" />

        <MaxWidthWrapper>
          <div className="relative py-24 flex flex-col lg:flex-row items-center gap-16">
            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#2081e2]/10 border border-[#2081e2]/20 text-[#2081e2] text-xs font-medium px-3 py-1.5 rounded-full mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2081e2]" />
                Built on Ronin Blockchain
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Discover &amp; Collect
                <br />
                <span className="text-[#2081e2]">Extraordinary NFTs</span>
              </h1>
              <p className="text-[#8a939b] text-lg mb-8 max-w-lg">
                Buy, sell, and trade digital collectibles on the Ronin
                blockchain. Join a growing community of collectors and creators
                building the next generation of digital ownership.
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Link
                  href="/collection"
                  className="flex items-center gap-2 bg-[#2081e2] hover:bg-[#1868b7] text-white font-medium px-6 py-3 rounded-xl transition-colors"
                >
                  Explore Collection
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button className="flex items-center gap-2 bg-[#262b2f] hover:bg-[#353840] border border-[#353840] text-white font-medium px-6 py-3 rounded-xl transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* Stats cards (decorative) */}
            <div className="flex-1 grid grid-cols-2 gap-4 max-w-sm w-full">
              {platformStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#262b2f] border border-[#353840] rounded-xl p-4 text-center"
                >
                  <div className="text-white text-2xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-[#8a939b] text-sm mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Features Section */}
      <section className="border-b border-[#21262d]">
        <MaxWidthWrapper className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-white text-3xl font-bold mb-3">Why Kurai?</h2>
            <p className="text-[#8a939b] max-w-xl mx-auto">
              Everything you need to trade, collect, and grow your digital
              assets on the Ronin blockchain.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="bg-[#262b2f] border border-[#353840] rounded-xl p-6 hover:border-[#2081e2]/40 transition-colors group"
              >
                <div className="w-10 h-10 bg-[#2081e2]/10 rounded-xl flex items-center justify-center text-[#2081e2] mb-4 group-hover:bg-[#2081e2]/20 transition-colors">
                  <feature.Icon className="w-5 h-5" />
                </div>
                <h3 className="text-white font-semibold mb-2">
                  {feature.name}
                </h3>
                <p className="text-[#8a939b] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Token Sale Section */}
      <section className="border-b border-[#21262d]">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#2081e2]/10 border border-[#2081e2]/20 text-[#2081e2] text-xs font-medium px-3 py-1.5 rounded-full mb-6">
                Live Sale
              </div>
              <h2 className="text-white text-3xl font-bold mb-4">Token Sale</h2>
              <p className="text-[#8a939b] mb-6">
                Token distribution breakdown. Purchase tokens during the sale to
                get the best allocation rates.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  { label: "Financial Overhead", pct: "73%" },
                  { label: "Bonus & Fund", pct: "55%" },
                  { label: "IT Infrastructure", pct: "38%" },
                  { label: "Gift Code Inventory", pct: "20.93%" },
                ].map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-[#8a939b]">{item.label}</span>
                    <span className="text-white font-semibold">{item.pct}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-[#262b2f] border border-[#353840] rounded-xl p-4">
                <p className="text-[#8a939b] text-sm mb-2">
                  Token Sale ends in:
                </p>
                <Countdown />
              </div>
            </div>
            <div className="bg-[#262b2f] border border-[#353840] rounded-xl p-6">
              <DonutChart />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Roadmap Section */}
      <section className="border-b border-[#21262d]">
        <MaxWidthWrapper className="py-20 max-w-2xl">
          <Timeline />
        </MaxWidthWrapper>
      </section>

      {/* Team Section */}
      <section className="border-b border-[#21262d]">
        <MaxWidthWrapper className="py-20">
          <h2 className="text-white text-2xl font-bold text-center mb-10">
            Our Team
          </h2>
          <div className="flex justify-center gap-4">
            <div className="bg-[#262b2f] border border-[#353840] rounded-xl p-6 text-center w-48 hover:border-[#2081e2]/40 transition-colors">
              <Avatar className="block mx-auto mb-3">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  className="w-16 h-16 rounded-full"
                />
                <AvatarFallback className="w-16 h-16 rounded-full bg-[#2081e2]/20 text-[#2081e2] font-bold flex items-center justify-center">
                  AO
                </AvatarFallback>
              </Avatar>
              <div className="text-white font-semibold">Aont</div>
              <div className="text-[#8a939b] text-sm mt-1">Developer</div>
            </div>
            <div className="bg-[#262b2f] border border-[#353840] rounded-xl p-6 text-center w-48 hover:border-[#2081e2]/40 transition-colors">
              <Avatar className="block mx-auto mb-3">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  className="w-16 h-16 rounded-full"
                />
                <AvatarFallback className="w-16 h-16 rounded-full bg-[#2081e2]/20 text-[#2081e2] font-bold flex items-center justify-center">
                  AO
                </AvatarFallback>
              </Avatar>
              <div className="text-white font-semibold">Aont</div>
              <div className="text-[#8a939b] text-sm mt-1">Developer</div>
            </div>
            <div className="bg-[#262b2f] border border-[#353840] rounded-xl p-6 text-center w-48 hover:border-[#2081e2]/40 transition-colors">
              <Avatar className="block mx-auto mb-3">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  className="w-16 h-16 rounded-full"
                />
                <AvatarFallback className="w-16 h-16 rounded-full bg-[#2081e2]/20 text-[#2081e2] font-bold flex items-center justify-center">
                  AO
                </AvatarFallback>
              </Avatar>
              <div className="text-white font-semibold">Aont</div>
              <div className="text-[#8a939b] text-sm mt-1">Developer</div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* FAQ Section */}
      <section>
        <MaxWidthWrapper className="py-20 max-w-2xl">
          <h2 className="text-white text-2xl font-bold text-center mb-10">
            FAQ
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            <AccordionItem
              value="item-1"
              className="bg-[#262b2f] border border-[#353840] rounded-xl px-5 data-[state=open]:border-[#2081e2]/40"
            >
              <AccordionTrigger className="text-white hover:no-underline py-4">
                How do I connect my Ronin wallet?
              </AccordionTrigger>
              <AccordionContent className="text-[#8a939b] pb-4">
                Click &quot;Connect Wallet&quot; in the top navigation bar. If
                you don&apos;t have the Ronin wallet extension installed,
                you&apos;ll be redirected to download it first.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-2"
              className="bg-[#262b2f] border border-[#353840] rounded-xl px-5 data-[state=open]:border-[#2081e2]/40"
            >
              <AccordionTrigger className="text-white hover:no-underline py-4">
                What are the token sale allocation rates?
              </AccordionTrigger>
              <AccordionContent className="text-[#8a939b] pb-4">
                Token allocations are split across Financial Overhead (73%),
                Bonus &amp; Fund (55%), IT Infrastructure (38%), and Gift Code
                Inventory (20.93%). Early participants receive the best rates.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-3"
              className="bg-[#262b2f] border border-[#353840] rounded-xl px-5 data-[state=open]:border-[#2081e2]/40"
            >
              <AccordionTrigger className="text-white hover:no-underline py-4">
                When can I start minting NFTs?
              </AccordionTrigger>
              <AccordionContent className="text-[#8a939b] pb-4">
                NFT minting is available now. Connect your Ronin wallet, browse
                the collection, and mint directly from the Collection page.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </MaxWidthWrapper>
      </section>
    </main>
  );
}
