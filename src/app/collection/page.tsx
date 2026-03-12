import CollectionClient from "./page.client";
import MaxWidthWrapper from "@/components/custom/MaxWidthWrapper";

const STATS = [
  { label: "Total volume", value: "1,240 RON" },
  { label: "Floor price", value: "0.05 RON" },
  { label: "Best offer", value: "0.04 RON" },
  { label: "Listed", value: "12%" },
  { label: "Owners", value: "847" },
];

export default function Collection() {
  return (
    <main className="min-h-screen bg-background">
      {/* Collection Header — server rendered */}
      <div className="border-b border-divider py-6 sm:py-8">
        <MaxWidthWrapper>
          <div className="hero-entrance hero-entrance-1 flex items-center sm:items-end gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground text-2xl sm:text-3xl font-bold">K</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-foreground text-xl sm:text-3xl font-bold truncate">Kurai Collection</h1>
              <p className="text-muted-foreground text-sm mt-1 hidden sm:block">Unique digital collectibles on the Ronin blockchain</p>
            </div>
          </div>

          <div className="hero-entrance hero-entrance-2 flex gap-4 sm:gap-8 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-divider overflow-x-auto scrollbar-hide">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex-shrink-0">
                <div className="text-foreground font-bold text-sm sm:text-lg">{stat.value}</div>
                <div className="text-muted-foreground text-xs sm:text-sm whitespace-nowrap">{stat.label}</div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </div>

      {/* Interactive content — client rendered */}
      <CollectionClient />
    </main>
  );
}
