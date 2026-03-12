import { format, formatDistanceToNow } from "date-fns";

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat().format(number);
};

export const formatAddress = (address: string) => {
  return address ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : "";
};

export const formatDate = (date: string) => {
  return format(new Date(date), "do MMMM yyyy h:mm:ss a");
};

export const formatTimeAgo = (date: string) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatNumberNotation = (number: number) => {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(number);
};

export function fmtUsd(value: string | number | undefined | null) {
  const n = typeof value === "string" ? parseFloat(value) : (value ?? 0);
  if (isNaN(n)) return "$0.00";
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(2)}K`;
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function fmtBalance(value: string, decimals: number) {
  const n = parseFloat(value) / Math.pow(10, decimals);
  if (isNaN(n)) return "0";
  if (n < 0.0001) return "<0.0001";
  return n.toLocaleString("en-US", { maximumFractionDigits: 4 });
}

export function fmtEth(wei: string | undefined | null) {
  if (!wei) return "—";
  const n = parseFloat(wei) / 1e18;
  if (isNaN(n) || n === 0) return "—";
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K Ξ`;
  return `${n.toFixed(4)} Ξ`;
}

export function parseNftMetadata(raw: string | object | undefined | null) {
  try {
    const meta = typeof raw === "string" ? JSON.parse(raw || "{}") : (raw ?? {});
    const name: string | undefined = (meta as any)?.name;
    let image: string | undefined = (meta as any)?.image;
    if (image) image = image.replace("ipfs://", "https://ipfs.io/ipfs/");
    return { name, image };
  } catch {
    return { name: undefined, image: undefined };
  }
}