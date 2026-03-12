'use client'

import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import { useBalance, useDisconnect } from 'wagmi'
import { Wallet, Copy, ExternalLink, LogOut, Check, ChevronDown } from 'lucide-react'
import { useState, useRef, useCallback } from 'react'

function formatAddress(address: string): string {
  if (address.length < 10) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

function formatBalance(value: bigint, decimals: number): string {
  const divisor = BigInt(10 ** decimals)
  const whole = value / divisor
  const fraction = value % divisor
  const fractionStr = fraction.toString().padStart(decimals, '0').slice(0, 4)
  const trimmed = fractionStr.replace(/0+$/, '')
  return trimmed ? `${whole}.${trimmed}` : `${whole}`
}

function AddressAvatar({ address }: { address: string }) {
  const colors = [
    ['#2081e2', '#1565c0'],
    ['#9945ff', '#6433a0'],
    ['#f3ba2f', '#c88a00'],
    ['#14f195', '#0a8a58'],
    ['#8247e5', '#5a2fa0'],
    ['#ff6b6b', '#c0392b'],
  ]
  const idx = parseInt(address.slice(2, 4), 16) % colors.length
  const [from, to] = colors[idx]
  const initials = address.slice(2, 4).toUpperCase()

  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ring-2 ring-white/10"
      style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
    >
      {initials}
    </div>
  )
}

function ConnectRoninWalletButton() {
  const { open } = useAppKit()
  const { address, isConnected } = useAppKitAccount()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({ address: address as `0x${string}` | undefined, chainId: 2020 })
  const [open_, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  const handleCopy = useCallback(async () => {
    if (!address) return
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [address])

  if (!isConnected || !address) {
    return (
      <button
        onClick={() => open()}
        className="btn-press flex items-center gap-2 bg-primary hover:bg-primary/80 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-[0_0_16px_hsl(var(--primary)/0.3)]"
      >
        <Wallet className="w-4 h-4" />
        Connect Wallet
      </button>
    )
  }

  const balanceStr = balance
    ? `${formatBalance(balance.value, balance.decimals)} ${balance.symbol}`
    : '— RON'

  return (
    <div ref={ref} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 bg-card border text-white text-sm px-3 py-2 rounded-xl transition-all duration-200 group ${
          open_
            ? 'border-primary/60 shadow-[0_0_12px_hsl(var(--primary)/0.15)]'
            : 'border-border hover:border-primary/40'
        }`}
      >
        <AddressAvatar address={address} />
        <div className="flex flex-col items-start leading-none">
          <span className="text-white text-xs font-medium">{formatAddress(address)}</span>
          <span className="text-muted-foreground text-[11px] mt-0.5">{balanceStr}</span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ml-0.5 ${
            open_ ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown panel */}
      {open_ && (
        <div className="dropdown-enter absolute right-0 top-full mt-2 w-64 bg-[hsl(var(--popover))] border border-border rounded-2xl shadow-2xl shadow-black/40 z-[100] overflow-hidden">
          {/* Header — address + balance */}
          <div className="px-4 py-4 flex items-center gap-3 border-b border-divider">
            <AddressAvatar address={address} />
            <div className="flex flex-col min-w-0">
              <span className="text-white text-sm font-semibold truncate">{formatAddress(address)}</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot" />
                <span className="text-muted-foreground text-xs">{balanceStr}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="py-1.5">
            <button
              onClick={handleCopy}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary/60 transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
              ) : (
                <Copy className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
              <span className={copied ? 'text-green-400' : ''}>{copied ? 'Copied!' : 'Copy Address'}</span>
            </button>

            <a
              href={`https://app.roninchain.com/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary/60 transition-colors"
              onClick={() => setOpen(false)}
            >
              <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              View on Explorer
            </a>
          </div>

          {/* Divider */}
          <div className="h-px bg-divider mx-3" />

          {/* Sign out */}
          <div className="py-1.5">
            <button
              onClick={() => { disconnect(); setOpen(false) }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors group/out"
            >
              <LogOut className="w-4 h-4 flex-shrink-0 group-hover/out:translate-x-0.5 transition-transform" />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ConnectRoninWalletButton
