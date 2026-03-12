import {
  Leaf,
  Shield,
  Zap,
  TrendingUp,
  ArrowRight,
  Twitter,
  Github,
} from "lucide-react";
import MaxWidthWrapper from "@/components/custom/MaxWidthWrapper";
import ScrollReveal from "@/components/custom/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import HeroBanner from "./_sections/HeroBanner";
import TrendingSection from "./_sections/TrendingSection";
import StatsSection from "./_sections/StatsSection";
import { LazyScrollToTop, LazyDonutChart, LazyCountdown, LazyTimeline } from "./_sections/ClientLazy";

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
    bio: "Frontend Developer",
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
    name: "Roxy",
    role: "Community Manager",
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

// ─── Curated Collections (static — server rendered) ──────────────────────────
function CuratedSection() {
  const [featured, ...rest] = CURATED_COLLECTIONS;

  return (
    <section className="border-b border-divider">
      <MaxWidthWrapper className="py-8 sm:py-10">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-5 sm:mb-6">
            <div>
              <h2 className="text-white text-lg sm:text-xl font-bold">Curated</h2>
            </div>
            <Link
              href="/collection"
              className="flex items-center gap-1 text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors"
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

// ─── Page (Server Component) ─────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <LazyScrollToTop
        smooth
        color="hsl(212, 72%, 51%)"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "hsl(204, 8%, 17%)",
          border: "1px solid hsl(208, 6%, 22%)",
          padding: "8px",
        }}
      />

      <HeroBanner />
      <TrendingSection />
      <CuratedSection />

      {/* Features Section */}
      <section className="border-b border-divider">
        <MaxWidthWrapper className="py-12 sm:py-16 lg:py-20">
          <ScrollReveal>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3">Why Kurai?</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Trade, collect, and grow your digital assets on Ronin.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.name} className={`stagger-${i + 1} h-full`}>
                <div className="card-lift h-full bg-card border border-border rounded-xl p-5 sm:p-6 hover:border-primary/40 group flex flex-col">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{feature.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Token Sale Section */}
      <section className="border-b border-divider">
        <MaxWidthWrapper className="py-12 sm:py-16 lg:py-20">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-medium px-3 py-1.5 rounded-full mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary pulse-dot" />
                  Live Sale
                </div>
                <h2 className="text-white text-2xl sm:text-3xl font-bold">KuraiToken (KRT)</h2>
                <p className="text-muted-foreground text-sm mt-1.5">1 RON = 100 KRT &nbsp;·&nbsp; Soft cap: 500,000 RON</p>
              </div>
              <button className="btn-press self-start flex-shrink-0 bg-primary hover:bg-primary/80 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2">
                Buy Tokens <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 mb-4">
              <div className="flex items-end justify-between mb-3">
                <div>
                  <span className="text-white font-bold text-xl sm:text-2xl tabular-nums">342,100</span>
                  <span className="text-muted-foreground text-sm ml-2">RON raised</span>
                </div>
                <span className="text-primary font-semibold text-sm tabular-nums">68.4%</span>
              </div>
              <div className="h-2.5 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: "68.4%", background: "linear-gradient(90deg, hsl(212, 78%, 38%) 0%, hsl(var(--primary)) 100%)" }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-muted-foreground text-xs">0 RON</span>
                <span className="text-muted-foreground text-xs">Goal: 500,000 RON</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <ScrollReveal className="stagger-1">
              <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 h-full">
                <h3 className="text-white font-semibold text-sm mb-5">Token Distribution</h3>
                <ul className="space-y-4">
                  {[
                    { label: "Financial Overhead", pct: 73, color: "hsl(var(--primary))" },
                    { label: "Bonus & Fund", pct: 55, color: "#7c3aed" },
                    { label: "IT Infrastructure", pct: 38, color: "#059669" },
                    { label: "Gift Code Inventory", pct: 21, color: "#d97706" },
                  ].map((item) => (
                    <li key={item.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-muted-foreground text-xs">{item.label}</span>
                        <span className="text-white text-xs font-semibold tabular-nums">{item.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-background rounded-full overflow-hidden">
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
              <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 h-full">
                <h3 className="text-white font-semibold text-sm mb-4">Allocation Chart</h3>
                <LazyDonutChart />
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
                    <div className="w-1.5 h-1.5 rounded-full bg-primary pulse-dot" />
                    <span className="text-primary text-xs font-medium">Ends soon</span>
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-5">Sale Countdown</h3>
                  <LazyCountdown />
                  <p className="text-muted-foreground/60 text-xs mt-5 leading-relaxed">
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
      <section className="border-b border-divider">
        <MaxWidthWrapper className="py-12 sm:py-16 lg:py-20 max-w-2xl">
          <LazyTimeline />
        </MaxWidthWrapper>
      </section>

      {/* Team Section */}
      <section className="border-b border-divider">
        <MaxWidthWrapper className="py-12 sm:py-16 lg:py-20">
          <ScrollReveal>
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-white text-2xl sm:text-3xl font-bold mb-2">Our Team</h2>
              <p className="text-muted-foreground text-sm">The people building Kurai</p>
            </div>
          </ScrollReveal>
          <div className="max-w-xl mx-auto space-y-3">
            {TEAM_MEMBERS.map((member, i) => (
              <ScrollReveal key={member.name} className={`stagger-${i + 1}`}>
                <div className="group card-lift flex items-center gap-4 sm:gap-5 p-4 sm:p-5 bg-surface border border-divider rounded-2xl hover:border-border transition-colors">
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

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-white font-semibold text-sm sm:text-base">{member.name}</span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-md font-medium"
                        style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" }}
                      >
                        {member.role}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">{member.bio}</p>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:border-accent transition-colors">
                      <Twitter className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:border-accent transition-colors">
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
      <section className="border-b border-divider">
        <MaxWidthWrapper className="py-12 sm:py-16 lg:py-20 max-w-2xl">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-white text-2xl sm:text-3xl font-bold mb-2">FAQ</h2>
              <p className="text-muted-foreground text-sm">Common questions about Kurai</p>
            </div>
          </ScrollReveal>
          <ScrollReveal className="stagger-1">
            <Accordion type="single" collapsible className="space-y-2">
              {FAQ_ITEMS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-surface border border-divider rounded-xl overflow-hidden data-[state=open]:border-primary/30 transition-colors"
                >
                  <AccordionTrigger className="text-white hover:no-underline px-5 py-4 text-sm font-medium text-left [&>svg]:text-muted-foreground">
                    <span className="flex items-center gap-3">
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold tabular-nums"
                        style={{ background: "hsl(var(--primary) / 0.12)", color: "hsl(var(--primary))" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {faq.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm px-5 pb-4 leading-relaxed pl-14">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal className="stagger-2">
            <div className="mt-8 text-center">
              <p className="text-muted-foreground text-sm mb-3">Still have questions?</p>
              <a
                href="#"
                className="btn-press inline-flex items-center gap-2 bg-card border border-border hover:border-primary/40 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
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
