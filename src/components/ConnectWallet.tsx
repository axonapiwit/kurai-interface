'use client'

import { useState } from 'react'
import { WalletSDK } from '@roninnetwork/wallet-sdk'
import { SiweMessage } from "siwe"
import { Wallet } from 'lucide-react'

function ConnectRoninWalletButton(props: any) {
  const [userAddress, setUserAddress] = useState<string[]>()

  function checkRoninInstalled() {
    if ('ronin' in window) {
      return true
    }
    window.open('https://wallet.roninchain.com', '_blank')
    return false
  }

  async function connectRoninWallet(props: any) {
    const sdk = new WalletSDK()
    await sdk.connectInjected()

    const isInstalled = checkRoninInstalled()
    if (isInstalled === false) return

    const accounts = await sdk.requestAccounts()
    if (accounts) setUserAddress(accounts)
  }

  function formatAddress(address: string): string {
    if (address.length < 12) return address
    return `${address.slice(0, 3)}x${address.slice(3, 6)}...${address.slice(-4)}xd`
  }

  if (userAddress === undefined) {
    return (
      <button
        onClick={connectRoninWallet}
        className="flex items-center gap-2 bg-[#2081e2] hover:bg-[#1868b7] text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
      >
        <Wallet className="w-4 h-4" />
        Connect Wallet
      </button>
    )
  }

  if (userAddress) {
    return (
      <div className="flex items-center gap-2 bg-[#262b2f] border border-[#353840] text-white text-sm px-4 py-2 rounded-xl">
        <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
        <span>{formatAddress(userAddress[0])}</span>
      </div>
    )
  }
}

export default ConnectRoninWalletButton