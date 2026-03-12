"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CardCollection from "@/components/custom/CardCollection";
import SkeletonCollection from "@/components/custom/SkeletonCollection";
import ScrollReveal from "@/components/custom/ScrollReveal";
import { getCollections } from "../api";
import { SlidersHorizontal, ChevronDown, LayoutGrid, X } from "lucide-react";
import { parseNftMetadata } from "@/helpers";

const SORT_OPTIONS = [
  "Recently listed",
  "Price: Low to High",
  "Price: High to Low",
  "Most favorited",
];

function FilterPanel() {
  return (
    <>
      <div>
        <div className="flex items-center justify-between text-white text-sm font-medium mb-3">
          Status
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex flex-wrap gap-2">
          {["Buy now", "On auction", "New"].map((s) => (
            <button
              key={s}
              className="btn-press px-3 py-1.5 rounded-xl text-xs border border-border text-muted-foreground hover:border-primary hover:text-white transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between text-white text-sm font-medium mb-3">
          Price
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            className="search-glow w-full bg-card border border-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all duration-200"
          />
          <span className="text-muted-foreground text-sm">to</span>
          <input
            type="number"
            placeholder="Max"
            className="search-glow w-full bg-card border border-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all duration-200"
          />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between text-white text-sm font-medium mb-3">
          Chains
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="rounded" defaultChecked />
          <span className="text-sm text-white">Ronin</span>
        </label>
      </div>
    </>
  );
}

export default function CollectionClient() {
  const { data, isLoading } = useQuery({ queryKey: ["collections"], queryFn: getCollections, staleTime: 3000 });
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Recently listed");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const renderSkeletons = () =>
    Array.from({ length: 8 }).map((_, i) => <SkeletonCollection key={i} />);

  return (
    <>
      <div className="flex max-w-screen-xl mx-auto">
        <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-divider p-4 space-y-6 min-h-screen">
          <div className="flex items-center gap-2 text-white font-medium">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </div>
          <FilterPanel />
        </aside>

        <div className="flex-1 p-4 sm:p-6">
          <div className="hero-entrance hero-entrance-3 relative z-20 flex items-center justify-between mb-4 sm:mb-6 gap-2">
            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden btn-press flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2 text-sm text-muted-foreground hover:text-white hover:border-primary transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
            <span className="text-muted-foreground text-sm">
              {isLoading ? "Loading..." : `${data?.result?.length ?? 0} items`}
            </span>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="btn-press flex items-center gap-2 bg-card border border-border rounded-xl px-3 sm:px-4 py-2 text-sm text-white hover:border-primary transition-colors"
                >
                  <span className="hidden sm:inline">{sortBy}</span>
                  <span className="sm:hidden">Sort</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`} />
                </button>
                {sortOpen && (
                  <div className="dropdown-enter absolute right-0 top-full mt-1 bg-card border border-border rounded-xl overflow-hidden shadow-xl z-50 w-52">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { setSortBy(opt); setSortOpen(false); }}
                        className="block w-full text-left px-4 py-2.5 text-sm text-white hover:bg-secondary transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button className="btn-press p-2 bg-card border border-border rounded-xl text-muted-foreground hover:text-white transition-colors">
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {!data || isLoading
              ? renderSkeletons()
              : data?.result.map((items: any, i: number) => {
                  const { name, image } = parseNftMetadata(items?.metadata);
                  return (
                    <ScrollReveal key={items.token_id} className={`stagger-${Math.min(i + 1, 8)}`}>
                      <CardCollection title={name} ipfs={image ?? ""} />
                    </ScrollReveal>
                  );
                })}
          </div>
        </div>
      </div>

      {filtersOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="filter-sheet fixed bottom-0 left-0 right-0 bg-background border-t border-divider z-50 lg:hidden rounded-t-2xl max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-divider px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-medium">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </div>
              <button
                onClick={() => setFiltersOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-white hover:bg-card transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-6">
              <FilterPanel />
              <button
                onClick={() => setFiltersOpen(false)}
                className="btn-press w-full bg-primary hover:bg-primary/80 text-white font-medium py-3 rounded-xl transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
