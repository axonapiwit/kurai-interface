"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import { Wallet, TrendingUp, TrendingDown, Image, Coins, AlertCircle } from "lucide-react";
import { getWalletNetWorth, getWalletTokens, getWalletNFTs } from "../api";
import ScrollReveal from "@/components/custom/ScrollReveal";

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmt(value: string | number, decimals = 2) {
  const n = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(n)) return "0.00";
  return n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function fmtUsd(value: string | number) {
  const n = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(n)) return "$0.00";
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(2)}K`;
  return `$${fmt(n)}`;
}

function fmtBalance(value: string, decimals: number) {
  const n = parseFloat(value) / Math.pow(10, decimals);
  if (isNaN(n)) return "0";
  if (n < 0.0001) return "<0.0001";
  return n.toLocaleString("en-US", { maximumFractionDigits: 4 });
}

// ── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-secondary/60 rounded-lg ${className}`} />;
}

// ── Net Worth Card ────────────────────────────────────────────────────────────

function NetWorthCard({ address }: { address: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["netWorth", address],
    queryFn: () => getWalletNetWorth(address),
    staleTime: 30_000,
  });

  const totalUsd = data?.total_networth_usd ?? "0";
  const chains = data?.chains ?? [];

  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6">
      <p className="text-muted-foreground text-sm mb-1">Total Portfolio Value</p>
      {isLoading ? (
        <Skeleton className="h-10 w-48 mb-3" />
      ) : (
        <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          {fmtUsd(totalUsd)}
        </h2>
      )}

      {/* Chain breakdown */}
      {!isLoading && chains.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-divider">
          {chains.map((c: any) => (
            <div key={c.chain} className="flex items-center gap-1.5 bg-secondary/40 rounded-xl px-3 py-1.5">
              <span className="text-xs text-muted-foreground uppercase font-medium">{c.chain_id === "0x1" ? "ETH" : c.chain}</span>
              <span className="text-xs text-white font-semibold">{fmtUsd(c.networth_usd)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Token Row ─────────────────────────────────────────────────────────────────

function TokenRow({ token }: { token: any }) {
  const priceChange = parseFloat(token.usd_price_24hr_percent_change ?? "0");
  const isUp = priceChange >= 0;
  const usdValue = parseFloat(token.usd_value ?? "0");
  const balance = fmtBalance(token.balance, token.decimals);

  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors rounded-xl">
      {/* Logo */}
      <div className="w-9 h-9 rounded-full flex-shrink-0 overflow-hidden bg-secondary flex items-center justify-center">
        {token.token_logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={token.token_logo} alt={token.symbol} className="w-full h-full object-cover" />
        ) : (
          <span className="text-xs font-bold text-muted-foreground">{token.symbol?.slice(0, 2)}</span>
        )}
      </div>

      {/* Name + balance */}
      <div className="flex-1 min-w-0">
        <div className="text-white text-sm font-medium truncate">{token.name}</div>
        <div className="text-muted-foreground text-xs">{balance} {token.symbol}</div>
      </div>

      {/* Price + change */}
      <div className="text-right flex-shrink-0">
        <div className="text-white text-sm font-semibold">{fmtUsd(usdValue)}</div>
        <div className={`flex items-center justify-end gap-0.5 text-xs ${isUp ? "text-green-400" : "text-red-400"}`}>
          {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(priceChange).toFixed(2)}%
        </div>
      </div>
    </div>
  );
}

// ── Tokens Tab ────────────────────────────────────────────────────────────────

function TokensTab({ address }: { address: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["walletTokens", address],
    queryFn: () => getWalletTokens(address),
    staleTime: 30_000,
  });

  const tokens = (data?.result ?? []).filter((t: any) => parseFloat(t.usd_value ?? "0") > 0.01);

  if (isLoading) {
    return (
      <div className="space-y-1 p-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3">
            <Skeleton className="w-9 h-9 rounded-full" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
            <div className="space-y-1.5 items-end flex flex-col">
              <Skeleton className="h-3.5 w-16" />
              <Skeleton className="h-3 w-10" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!tokens.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Coins className="w-10 h-10 text-muted-foreground mb-3" />
        <p className="text-white font-medium">No tokens found</p>
        <p className="text-muted-foreground text-sm mt-1">This wallet has no ERC-20 tokens on Ethereum.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-divider/40">
      {tokens.map((token: any, i: number) => (
        <TokenRow key={token.token_address ?? i} token={token} />
      ))}
    </div>
  );
}

// ── NFT Card ──────────────────────────────────────────────────────────────────

function NftCard({ nft }: { nft: any }) {
  let name = nft.name ?? `#${nft.token_id}`;
  let image: string | null = null;

  try {
    if (nft.metadata) {
      const meta = typeof nft.metadata === "string" ? JSON.parse(nft.metadata) : nft.metadata;
      if (meta?.name) name = meta.name;
      if (meta?.image) image = meta.image.replace("ipfs://", "https://ipfs.io/ipfs/");
    }
  } catch {}

  // fallback to media items
  if (!image && nft.media?.original_media_url) {
    image = nft.media.original_media_url;
  }

  return (
    <div className="card-lift group relative rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 cursor-pointer">
      <div className="relative overflow-hidden aspect-square bg-secondary">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            style={{ transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Image className="w-8 h-8 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="text-xs text-muted-foreground truncate mb-0.5">{nft.name ?? nft.token_address?.slice(0, 8)}</p>
        <h3 className="text-white font-medium text-sm truncate">{name}</h3>
        <p className="text-xs text-muted-foreground mt-1">#{nft.token_id}</p>
      </div>
    </div>
  );
}

// ── NFTs Tab ──────────────────────────────────────────────────────────────────

function NftsTab({ address }: { address: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["walletNFTs", address],
    queryFn: () => getWalletNFTs(address),
    staleTime: 30_000,
  });

  const nfts = data?.result ?? [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 p-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl overflow-hidden bg-card border border-border">
            <Skeleton className="aspect-square rounded-none" />
            <div className="p-3 space-y-1.5">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!nfts.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Image className="w-10 h-10 text-muted-foreground mb-3" />
        <p className="text-white font-medium">No NFTs found</p>
        <p className="text-muted-foreground text-sm mt-1">This wallet has no NFTs on Ethereum.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 p-4">
      {nfts.map((nft: any, i: number) => (
        <ScrollReveal key={`${nft.token_address}-${nft.token_id}`} className={`stagger-${Math.min(i + 1, 8)}`}>
          <NftCard nft={nft} />
        </ScrollReveal>
      ))}
    </div>
  );
}

// ── Not Connected ─────────────────────────────────────────────────────────────

function NotConnected() {
  const { open } = useAppKit();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
        <Wallet className="w-8 h-8 text-primary" />
      </div>
      <h2 className="text-white text-xl font-bold mb-2">Connect your wallet</h2>
      <p className="text-muted-foreground text-sm max-w-xs mb-6">
        Connect your wallet to view your token balances, NFTs, and total portfolio value.
      </p>
      <button
        onClick={() => open()}
        className="btn-press flex items-center gap-2 bg-primary hover:bg-primary/80 text-white text-sm font-medium px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-[0_0_16px_hsl(var(--primary)/0.3)]"
      >
        <Wallet className="w-4 h-4" />
        Connect Wallet
      </button>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

type Tab = "tokens" | "nfts";

export default function PortfolioPage() {
  const { address, isConnected } = useAppKitAccount();
  const [tab, setTab] = useState<Tab>("tokens");

  if (!isConnected || !address) return <NotConnected />;

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <div className="hero-entrance hero-entrance-1">
          <h1 className="text-white text-2xl sm:text-3xl font-bold">Portfolio</h1>
          <p className="text-muted-foreground text-sm mt-1 font-mono truncate">{address}</p>
        </div>

        {/* Net worth */}
        <div className="hero-entrance hero-entrance-2">
          <NetWorthCard address={address} />
        </div>

        {/* Tabs */}
        <div className="hero-entrance hero-entrance-3 bg-card border border-border rounded-2xl overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-divider">
            {(["tokens", "nfts"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-3 text-sm font-medium capitalize transition-colors duration-150 ${
                  tab === t
                    ? "text-white border-b-2 border-primary"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {t === "tokens" ? "Tokens" : "NFTs"}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {tab === "tokens" ? <TokensTab address={address} /> : <NftsTab address={address} />}
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 text-xs text-muted-foreground pb-4">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <span>Data sourced from Moralis. Ethereum mainnet only. Prices may be delayed.</span>
        </div>
      </div>
    </main>
  );
}
