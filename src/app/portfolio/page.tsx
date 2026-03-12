import { AlertCircle } from "lucide-react";
import PortfolioClient from "./page.client";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background">
      <PortfolioClient />
      {/* Disclaimer — server rendered */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="flex items-start gap-2 text-xs text-muted-foreground pb-4">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <span>Data sourced from Moralis. Ethereum mainnet only. Prices may be delayed.</span>
        </div>
      </div>
    </main>
  );
}
