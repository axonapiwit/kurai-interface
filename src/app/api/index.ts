import Moralis from "moralis";

export type User = {
  id: number;
  name: string;
  email: string;
};

export type Currency = {
  id: number;
  markets: number;
};

Moralis.start({
  apiKey: `${process.env.NEXT_PUBLIC_MORALIS_API_KEY}`,
});

const contractAddress = "0xED5AF388653567Af2F388E6224dC7C4b3241C544";

export async function getCollections() {
  try {
    const response = await Moralis.EvmApi.nft.getContractNFTs({
      chain: "0x1",
      format: "decimal",
      address: contractAddress,
    });

    // console.log(response.raw);
    return response.raw;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = (await res.json()) as User[];
  return users;
}

export async function getWalletNetWorth(address: string) {
  try {
    const response = await Moralis.EvmApi.wallets.getWalletNetWorth({
      address,
      chains: ["0x1"],
    });
    return response.raw;
  } catch (error) {
    console.error("Error fetching net worth:", error);
    return null;
  }
}

export async function getWalletTokens(address: string) {
  try {
    const balancesRes = await Moralis.EvmApi.token.getWalletTokenBalances({
      address,
      chain: "0x1",
    });
    const tokens = balancesRes.raw;
    if (!tokens.length) return { result: [] };

    // Fetch prices for all tokens at once
    const pricesRes = await Moralis.EvmApi.token.getMultipleTokenPrices(
      { chain: "0x1" },
      { tokens: tokens.map((t: any) => ({ tokenAddress: t.token_address })) }
    );
    const prices: Record<string, any> = {};
    for (const p of pricesRes.raw) {
      if (p.tokenAddress) prices[p.tokenAddress.toLowerCase()] = p;
    }

    const result = tokens.map((t: any) => {
      const price = prices[t.token_address?.toLowerCase()] ?? {};
      const balance = parseFloat(t.balance) / Math.pow(10, t.decimals);
      const usdPrice = parseFloat(price.usdPrice ?? "0");
      return {
        ...t,
        token_logo: price.tokenLogo ?? null,
        usd_price: usdPrice,
        usd_value: (balance * usdPrice).toFixed(2),
        usd_price_24hr_percent_change: price["24hrPercentChange"] ?? "0",
      };
    });

    return { result };
  } catch (error) {
    console.error("Error fetching token balances:", error);
    return null;
  }
}

export async function getCollectionStats() {
  try {
    const response = await Moralis.EvmApi.nft.getNFTCollectionStats({
      chain: "0x1",
      address: contractAddress,
    });
    return response.raw;
  } catch (error) {
    console.error("Error fetching collection stats:", error);
    return null;
  }
}

export async function getNFTTrades(limit = 20) {
  try {
    const response = await Moralis.EvmApi.nft.getNFTTrades({
      chain: "0x1",
      address: contractAddress,
      limit,
    });
    return response.raw;
  } catch (error) {
    console.error("Error fetching NFT trades:", error);
    return null;
  }
}

export async function getEthPrice() {
  try {
    const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const response = await Moralis.EvmApi.token.getTokenPrice({
      chain: "0x1",
      address: WETH,
    });
    return response.raw;
  } catch (error) {
    console.error("Error fetching ETH price:", error);
    return null;
  }
}

export async function getWalletNFTs(address: string) {
  try {
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain: "0x1",
      mediaItems: true,
    });
    return response.raw;
  } catch (error) {
    console.error("Error fetching wallet NFTs:", error);
    return null;
  }
}

// export async function getGlobal() {
//   try {
//     const response = await fetch("https://coingecko.p.rapidapi.com/global", {
//       method: "GET",
//       headers: {
//         "X-RapidAPI-Key": `${process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY}`,
//         "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Error fetching data: ${response.statusText}`);
//     }

//     const data = (await response.json()) as Currency[];
//     console.log(data);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }
