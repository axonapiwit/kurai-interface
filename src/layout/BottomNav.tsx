"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAppKit, useAppKitAccount } from "@reown/appkit/react"
import { Home, Grid3X3, TrendingUp } from "lucide-react"
import { Wallet } from "lucide-react"

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
      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold ring-2 ring-white/20"
      style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
    >
      {initials}
    </div>
  )
}

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/collection", label: "Explore", icon: Grid3X3 },
  { href: "/stats", label: "Stats", icon: TrendingUp },
]

export default function BottomNav() {
  const pathname = usePathname()
  const { open } = useAppKit()
  const { address, isConnected } = useAppKitAccount()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-divider">
      <div className="flex items-center justify-around h-16 px-2 max-w-screen-sm mx-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 flex-1 py-2 group"
            >
              <Icon
                className={`w-5 h-5 transition-colors ${
                  active ? "text-primary" : "text-muted-foreground group-hover:text-white"
                }`}
              />
              <span
                className={`text-[10px] font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground group-hover:text-white"
                }`}
              >
                {label}
              </span>
            </Link>
          )
        })}

        {/* Wallet / Profile tab */}
        <button
          onClick={() => open()}
          className="flex flex-col items-center gap-1 flex-1 py-2 group"
        >
          {isConnected && address ? (
            <>
              <AddressAvatar address={address} />
              <span className="text-[10px] font-medium text-white">Profile</span>
            </>
          ) : (
            <>
              <Wallet className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
              <span className="text-[10px] font-medium text-muted-foreground group-hover:text-white transition-colors">
                Connect
              </span>
            </>
          )}
        </button>
      </div>

      {/* Safe area spacer for phones with home indicator */}
      <div className="h-safe-bottom bg-background/95" />
    </nav>
  )
}
