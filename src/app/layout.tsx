import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";
import SessionProvider from "@/providers/SessionProvider";
import { getSession } from "../../auth";

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
  const session = await getSession();

  return (
    <html lang="en">
      <body className={outfit.className}>
        <SessionProvider session={session}>
          <ReactQueryProvider>
            <Navbar />
            {children}
            <Footer />
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
