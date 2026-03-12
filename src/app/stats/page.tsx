"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, TrendingDown, ArrowUpRight, Activity, Users, Tag, BarChart2, Clock, Repeat2 } from "lucide-react";
import ScrollReveal from "@/components/custom/ScrollReveal";
import { Skeleton } from "@/components/ui/skeleton";
import { formatAddress, formatTimeAgo, fmtUsd, fmtEth } from "@/helpers";
import { getCollectionStats, getNFTTrades, getEthPrice } from "../api";

// ── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  loading,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ElementType;
  loading: boolean;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{label}</span>
        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
      </div>
      {loading ? (
        <>
          <Skeleton className="h-8 w-32 bg-secondary/60" />
          <Skeleton className="h-3 w-20 bg-secondary/60" />
        </>
      ) : (
        <>
          <span className="text-white text-2xl font-bold tracking-tight tabular-nums">{value}</span>
          {sub && <span className="text-muted-foreground text-xs">{sub}</span>}
        </>
      )}
    </div>
  );
}

// ── ETH Price Banner ──────────────────────────────────────────────────────────

function EthPriceBanner() {
  const { data, isLoading } = useQuery({
    queryKey: ["ethPrice"],
    queryFn: getEthPrice,
    staleTime: 30_000,
    refetchInterval: 60_000,
  });

  const price = data?.usdPrice ?? 0;
  const change = parseFloat(data?.["24hrPercentChange"] ?? "0");
  const isUp = change >= 0;

  return (
    <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-5 py-3">
      <div className="w-7 h-7 rounded-full bg-[#627eea]/20 flex items-center justify-center flex-shrink-0">
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#627eea]">
          <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
        </svg>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-white text-sm font-semibold">ETH</span>
        {isLoading ? (
          <Skeleton className="h-4 w-20 bg-secondary/60" />
        ) : (
          <>
            <span className="text-white font-bold tabular-nums">
              ${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className={`flex items-center gap-0.5 text-xs font-medium ${isUp ? "text-green-400" : "text-red-400"}`}>
              {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {Math.abs(change).toFixed(2)}%
            </span>
          </>
        )}
      </div>
      <div className="ml-auto flex items-center gap-1 text-[10px] text-muted-foreground">
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        Live
      </div>
    </div>
  );
}

// ── Collection Stats Section ──────────────────────────────────────────────────

function CollectionStatsSection() {
  const { data, isLoading: statsLoading } = useQuery({
    queryKey: ["collectionStats"],
    queryFn: getCollectionStats,
    staleTime: 60_000,
  });
  const { data: tradesData, isLoading: tradesLoading } = useQuery({
    queryKey: ["nftTrades"],
    queryFn: getNFTTrades,
    staleTime: 30_000,
    refetchInterval: 60_000,
  });
  const { data: ethData } = useQuery({
    queryKey: ["ethPrice"],
    queryFn: getEthPrice,
    staleTime: 30_000,
  });

  const ethPrice = ethData?.usdPrice ?? 0;

  const cards = useMemo(() => {
    const trades = (tradesData as any)?.result ?? [];
    const totalTradeVolumeWei = trades.reduce((sum: number, t: any) => sum + parseFloat(t.price ?? "0"), 0);
    const totalTradeVolumeEth = totalTradeVolumeWei / 1e18;
    const avgPriceEth = trades.length ? totalTradeVolumeEth / trades.length : 0;

    return [
      {
        label: "Total NFTs",
        value: parseInt(data?.total_tokens ?? "0").toLocaleString("en-US"),
        sub: "items in collection",
        icon: Tag,
      },
      {
        label: "Current Owners",
        value: parseInt(data?.owners?.current ?? "0").toLocaleString("en-US"),
        sub: `of ${parseInt(data?.total_tokens ?? "0").toLocaleString("en-US")} items`,
        icon: Users,
      },
      {
        label: "Total Transfers",
        value: parseInt(data?.transfers?.total ?? "0").toLocaleString("en-US"),
        sub: "on-chain transfers",
        icon: Repeat2,
      },
      {
        label: "Recent Trades",
        value: trades.length.toString(),
        sub: "in last 100 blocks",
        icon: BarChart2,
      },
      {
        label: "Trade Volume",
        value: `${totalTradeVolumeEth.toFixed(4)} Ξ`,
        sub: fmtUsd(totalTradeVolumeEth * ethPrice),
        icon: TrendingUp,
      },
      {
        label: "Avg Trade Price",
        value: avgPriceEth > 0 ? `${avgPriceEth.toFixed(4)} Ξ` : "—",
        sub: avgPriceEth > 0 ? fmtUsd(avgPriceEth * ethPrice) : undefined,
        icon: ArrowUpRight,
      },
    ];
  }, [data, tradesData, ethPrice]);

  const isLoading = statsLoading || tradesLoading;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {cards.map((c, i) => (
        <ScrollReveal key={c.label} className={`stagger-${Math.min(i + 1, 8)}`}>
          <StatCard {...c} loading={isLoading} />
        </ScrollReveal>
      ))}
    </div>
  );
}

// ── Recent Trades ─────────────────────────────────────────────────────────────

function TradeRow({ trade, ethPrice }: { trade: any; ethPrice: number }) {
  const priceEth = parseFloat(trade.price ?? "0") / 1e18;

  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <span className="text-primary text-[10px] font-bold">#{trade.token_ids?.[0] ?? "?"}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span className="text-white font-medium truncate">{formatAddress(trade.buyer_address ?? "")}</span>
          <ArrowUpRight className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{formatAddress(trade.seller_address ?? "")}</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5 text-[11px] text-muted-foreground">
          <Clock className="w-3 h-3 flex-shrink-0" />
          {trade.block_timestamp ? formatTimeAgo(trade.block_timestamp) : "—"}
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <div className="text-white text-sm font-semibold tabular-nums">{priceEth.toFixed(4)} Ξ</div>
        <div className="text-muted-foreground text-xs tabular-nums">{fmtUsd(priceEth * ethPrice)}</div>
      </div>
    </div>
  );
}

function RecentTradesSection() {
  const { data: tradesData, isLoading: tradesLoading } = useQuery({
    queryKey: ["nftTrades"],
    queryFn: getNFTTrades,
    staleTime: 30_000,
    refetchInterval: 60_000,
  });
  const { data: ethData } = useQuery({
    queryKey: ["ethPrice"],
    queryFn: getEthPrice,
    staleTime: 30_000,
  });

  const trades = (tradesData as any)?.result ?? [];
  const ethPrice = ethData?.usdPrice ?? 0;

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-4 border-b border-divider">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          <span className="text-white font-semibold text-sm">Recent Trades</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Live
        </div>
      </div>

      {tradesLoading ? (
        <div className="divide-y divide-divider/40">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <Skeleton className="w-8 h-8 rounded-lg bg-secondary/60" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-40 bg-secondary/60" />
                <Skeleton className="h-3 w-20 bg-secondary/60" />
              </div>
              <div className="space-y-1.5 flex flex-col items-end">
                <Skeleton className="h-3.5 w-16 bg-secondary/60" />
                <Skeleton className="h-3 w-12 bg-secondary/60" />
              </div>
            </div>
          ))}
        </div>
      ) : trades.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Activity className="w-8 h-8 text-muted-foreground mb-2" />
          <p className="text-muted-foreground text-sm">No recent trades found.</p>
        </div>
      ) : (
        <div className="divide-y divide-divider/40">
          {trades.map((trade: any, i: number) => (
            <TradeRow key={`${trade.transaction_hash}-${i}`} trade={trade} ethPrice={ethPrice} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function StatsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <div className="hero-entrance hero-entrance-1 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xl font-bold">K</span>
          </div>
          <div>
            <h1 className="text-white text-2xl sm:text-3xl font-bold">Kurai Stats</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Live collection analytics · Ethereum</p>
          </div>
        </div>

        <div className="hero-entrance hero-entrance-2">
          <EthPriceBanner />
        </div>

        <div className="hero-entrance hero-entrance-3">
          <h2 className="text-muted-foreground font-semibold text-xs mb-3 uppercase tracking-wider">Collection Metrics</h2>
          <CollectionStatsSection />
        </div>

        <div className="hero-entrance hero-entrance-4">
          <RecentTradesSection />
        </div>
      </div>
    </main>
  );
}
