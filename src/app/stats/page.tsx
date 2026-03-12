"use client";

import { useQuery } from "@tanstack/react-query";
import { TrendingUp, TrendingDown, ArrowUpRight, Activity, Users, Tag, BarChart2, Clock } from "lucide-react";
import ScrollReveal from "@/components/custom/ScrollReveal";
import { getCollectionStats, getNFTTrades, getEthPrice } from "../api";

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtUsd(value: string | number | undefined | null) {
  const n = parseFloat(String(value ?? "0"));
  if (isNaN(n)) return "$0.00";
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(2)}K`;
  return `$${n.toFixed(2)}`;
}

function fmtEth(value: string | number | undefined | null) {
  const n = parseFloat(String(value ?? "0"));
  if (isNaN(n) || n === 0) return "—";
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K Ξ`;
  return `${n.toFixed(4)} Ξ`;
}

function fmtNum(value: string | number | undefined | null) {
  const n = parseFloat(String(value ?? "0"));
  if (isNaN(n)) return "0";
  return n.toLocaleString("en-US");
}

function timeAgo(dateStr: string) {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function shortAddr(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-secondary/60 rounded-lg ${className}`} />;
}

// ── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  loading,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ElementType;
  loading: boolean;
  accent?: string;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{label}</span>
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${accent ?? "bg-primary/10"}`}>
          <Icon className={`w-4 h-4 ${accent ? "text-white/70" : "text-primary"}`} />
        </div>
      </div>
      {loading ? (
        <>
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-3 w-20" />
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

  const price = parseFloat(data?.usdPrice ?? "0");
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
          <Skeleton className="h-4 w-20" />
        ) : (
          <>
            <span className="text-white font-bold tabular-nums">${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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
  const { data, isLoading } = useQuery({
    queryKey: ["collectionStats"],
    queryFn: getCollectionStats,
    staleTime: 60_000,
  });

  const s = data;

  const cards = [
    {
      label: "Total Volume",
      value: fmtEth(s?.total_trades != null ? undefined : undefined) || fmtUsd(s?.volume?.total_volume_usd),
      sub: s?.volume?.total_volume ? `${fmtEth(s.volume.total_volume)} all time` : undefined,
      icon: BarChart2,
    },
    {
      label: "24h Volume",
      value: fmtUsd(s?.volume?.["24h_volume_usd"]),
      sub: s?.volume?.["24h_volume"] ? `${fmtEth(s.volume["24h_volume"])} today` : undefined,
      icon: Activity,
    },
    {
      label: "Floor Price",
      value: fmtEth(s?.floor_price?.floor_price),
      sub: s?.floor_price?.floor_price_usd ? fmtUsd(s.floor_price.floor_price_usd) : undefined,
      icon: Tag,
    },
    {
      label: "Owners",
      value: fmtNum(s?.owners?.owner_count),
      sub: s?.items?.item_count ? `of ${fmtNum(s.items.item_count)} items` : undefined,
      icon: Users,
    },
    {
      label: "Total Sales",
      value: fmtNum(s?.total_trades),
      sub: s?.trades?.["24h_trades"] ? `${fmtNum(s.trades["24h_trades"])} in 24h` : undefined,
      icon: TrendingUp,
    },
    {
      label: "Avg Sale Price",
      value: fmtEth(s?.average_price?.average_price),
      sub: s?.average_price?.average_price_usd ? fmtUsd(s.average_price.average_price_usd) : undefined,
      icon: ArrowUpRight,
    },
  ];

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
  const priceUsd = priceEth * ethPrice;

  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors">
      {/* Token ID */}
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <span className="text-primary text-[10px] font-bold">#{trade.token_ids?.[0] ?? "?"}</span>
      </div>

      {/* Buyer / Seller */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span className="text-white font-medium truncate">{shortAddr(trade.buyer_address ?? "")}</span>
          <ArrowUpRight className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{shortAddr(trade.seller_address ?? "")}</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5 text-[11px] text-muted-foreground">
          <Clock className="w-3 h-3 flex-shrink-0" />
          {trade.block_timestamp ? timeAgo(trade.block_timestamp) : "—"}
        </div>
      </div>

      {/* Price */}
      <div className="text-right flex-shrink-0">
        <div className="text-white text-sm font-semibold tabular-nums">{priceEth.toFixed(4)} Ξ</div>
        <div className="text-muted-foreground text-xs tabular-nums">{fmtUsd(priceUsd)}</div>
      </div>
    </div>
  );
}

function RecentTradesSection() {
  const { data: tradesData, isLoading: tradesLoading } = useQuery({
    queryKey: ["nftTrades"],
    queryFn: () => getNFTTrades(20),
    staleTime: 30_000,
    refetchInterval: 60_000,
  });
  const { data: ethData } = useQuery({
    queryKey: ["ethPrice"],
    queryFn: getEthPrice,
    staleTime: 30_000,
  });

  const trades = tradesData?.result ?? [];
  const ethPrice = parseFloat(ethData?.usdPrice ?? "0");

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
              <Skeleton className="w-8 h-8 rounded-lg" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-40" />
                <Skeleton className="h-3 w-20" />
              </div>
              <div className="space-y-1.5 flex flex-col items-end">
                <Skeleton className="h-3.5 w-16" />
                <Skeleton className="h-3 w-12" />
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
        {/* Header */}
        <div className="hero-entrance hero-entrance-1 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xl font-bold">K</span>
          </div>
          <div>
            <h1 className="text-white text-2xl sm:text-3xl font-bold">Kurai Stats</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Live collection analytics · Ethereum</p>
          </div>
        </div>

        {/* ETH Price */}
        <div className="hero-entrance hero-entrance-2">
          <EthPriceBanner />
        </div>

        {/* Collection Metrics */}
        <div className="hero-entrance hero-entrance-3">
          <h2 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider text-muted-foreground">Collection Metrics</h2>
          <CollectionStatsSection />
        </div>

        {/* Recent Trades */}
        <div className="hero-entrance hero-entrance-4">
          <RecentTradesSection />
        </div>
      </div>
    </main>
  );
}
