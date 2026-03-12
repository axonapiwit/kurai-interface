'use client'

import { useAppKit } from '@reown/appkit/react'
import { useAccount, useDisconnect } from 'wagmi'
import { Wallet } from 'lucide-react'

function formatAddress(address: string): string {
  if (address.length < 10) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

function ConnectRoninWalletButton() {
  const { open } = useAppKit()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  if (isConnected && address) {
    return (
      <button
        onClick={() => disconnect()}
        className="flex items-center gap-2 bg-card border border-border text-white text-sm px-4 py-2 rounded-xl hover:border-red-500/50 transition-all duration-200 group"
      >
        <div className="w-2 h-2 rounded-full bg-green-400 pulse-dot flex-shrink-0" />
        <span className="group-hover:text-red-400 transition-colors">{formatAddress(address)}</span>
      </button>
    )
  }

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

export default ConnectRoninWalletButton
