"use client";

import React, { useState } from "react";
import { useQuery } from "react-query";
import CardCollection from "@/components/custom/CardCollection";
import SkeletonCollection from "@/components/custom/SkeletonCollection";
import { getCollections } from "../api";
import { SlidersHorizontal, ChevronDown, LayoutGrid } from "lucide-react";

const SORT_OPTIONS = [
  "Recently listed",
  "Price: Low to High",
  "Price: High to Low",
  "Most favorited",
];

const STATS = [
  { label: "Total volume", value: "1,240 RON" },
  { label: "Floor price", value: "0.05 RON" },
  { label: "Best offer", value: "0.04 RON" },
  { label: "Listed", value: "12%" },
  { label: "Owners", value: "847" },
];

export default function Collection() {
  const { data, isLoading } = useQuery("collections", getCollections, {
    staleTime: 3000,
  });
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Recently listed");

  const renderSkeletons = () =>
    Array.from({ length: 8 }).map((_, i) => <SkeletonCollection key={i} />);

  return (
    <main className="min-h-screen bg-[#1a1c1f]">
      {/* Collection Header */}
      <div className="border-b border-[#21262d] px-6 py-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-end gap-6">
            <div className="w-20 h-20 rounded-2xl bg-[#2081e2] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-3xl font-bold">K</span>
            </div>
            <div>
              <h1 className="text-white text-3xl font-bold">Kurai Collection</h1>
              <p className="text-[#8a939b] mt-1">Unique digital collectibles on the Ronin blockchain</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-6 pt-6 border-t border-[#21262d]">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-white font-bold text-lg">{stat.value}</div>
                <div className="text-[#8a939b] text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex max-w-screen-xl mx-auto">
        {/* Sidebar filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-[#21262d] p-4 space-y-6 min-h-screen">
          <div className="flex items-center gap-2 text-white font-medium">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </div>

          {/* Status */}
          <div>
            <div className="flex items-center justify-between text-white text-sm font-medium mb-3">
              Status
              <ChevronDown className="w-4 h-4 text-[#8a939b]" />
            </div>
            <div className="flex flex-wrap gap-2">
              {["Buy now", "On auction", "New"].map((s) => (
                <button
                  key={s}
                  className="px-3 py-1.5 rounded-xl text-xs border border-[#353840] text-[#8a939b] hover:border-[#2081e2] hover:text-white transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <div className="flex items-center justify-between text-white text-sm font-medium mb-3">
              Price
              <ChevronDown className="w-4 h-4 text-[#8a939b]" />
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                placeholder="Min"
                className="w-full bg-[#262b2f] border border-[#353840] rounded-xl px-3 py-2 text-sm text-white placeholder:text-[#8a939b] focus:outline-none focus:border-[#2081e2]"
              />
              <span className="text-[#8a939b] text-sm">to</span>
              <input
                type="number"
                placeholder="Max"
                className="w-full bg-[#262b2f] border border-[#353840] rounded-xl px-3 py-2 text-sm text-white placeholder:text-[#8a939b] focus:outline-none focus:border-[#2081e2]"
              />
            </div>
          </div>

          {/* Chains */}
          <div>
            <div className="flex items-center justify-between text-white text-sm font-medium mb-3">
              Chains
              <ChevronDown className="w-4 h-4 text-[#8a939b]" />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" defaultChecked />
              <span className="text-sm text-white">Ronin</span>
            </label>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 p-6">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-[#8a939b] text-sm">
              {isLoading ? "Loading..." : `${data?.result?.length ?? 0} items`}
            </span>
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 bg-[#262b2f] border border-[#353840] rounded-xl px-4 py-2 text-sm text-white hover:border-[#2081e2] transition-colors"
                >
                  {sortBy}
                  <ChevronDown className="w-4 h-4 text-[#8a939b]" />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-[#262b2f] border border-[#353840] rounded-xl overflow-hidden shadow-xl z-10 w-52">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { setSortBy(opt); setSortOpen(false); }}
                        className="block w-full text-left px-4 py-2.5 text-sm text-white hover:bg-[#353840] transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button className="p-2 bg-[#262b2f] border border-[#353840] rounded-xl text-[#8a939b] hover:text-white transition-colors">
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {!data || isLoading
              ? renderSkeletons()
              : data?.result.map((items: any) => (
                  <CardCollection
                    key={items.token_id}
                    title={JSON.parse(items?.metadata).name}
                    ipfs={JSON.parse(items?.metadata).image}
                  />
                ))}
          </div>
        </div>
      </div>
    </main>
  );
}
