import StatsClient from "./page.client";

export default function StatsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Header — server rendered */}
        <div className="hero-entrance hero-entrance-1 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xl font-bold">K</span>
          </div>
          <div>
            <h1 className="text-white text-2xl sm:text-3xl font-bold">Kurai Stats</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Live collection analytics · Ethereum</p>
          </div>
        </div>

        {/* Interactive content — client rendered */}
        <StatsClient />
      </div>
    </main>
  );
}
