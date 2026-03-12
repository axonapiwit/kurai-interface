import type { Metadata } from "next";

export const dynamic = 'force-dynamic';
import { Outfit } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";

import { ContextProvider } from "@/context";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kurai – NFT Marketplace on Ronin",
  description: "Discover, collect, and trade NFTs on the Ronin blockchain.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = headers().get('cookie');

  return (
    <html lang="en">
      <body className={outfit.className}>
        <ContextProvider cookies={cookies}>
          <ReactQueryProvider>
            <Navbar />
            {children}
            <Footer />
          </ReactQueryProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
