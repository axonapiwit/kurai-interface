"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getCollections } from "../api";
import MaxWidthWrapper from "@/components/custom/MaxWidthWrapper";
import ScrollReveal from "@/components/custom/ScrollReveal";
import CardCollection from "@/components/custom/CardCollection";
import SkeletonCollection from "@/components/custom/SkeletonCollection";
import { parseNftMetadata } from "@/helpers";

export default function TrendingSection() {
  const { data, isLoading } = useQuery({ queryKey: ["collections"], queryFn: getCollections, staleTime: 60000 });
  const items = data?.result?.slice(0, 10) ?? [];

  return (
    <section className="border-b border-divider">
      <MaxWidthWrapper className="py-8 sm:py-10">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-5 sm:mb-6">
            <div>
              <h2 className="text-white text-lg sm:text-xl font-bold">Trending</h2>
            </div>
            <Link
              href="/collection"
              className="flex items-center gap-1 text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors"
            >
              View all <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3">
          {isLoading || !data
            ? Array.from({ length: 10 }).map((_, i) => <SkeletonCollection key={i} />)
            : items.map((item: any, i: number) => {
                const { name, image } = parseNftMetadata(item?.metadata);
                return (
                  <ScrollReveal key={item.token_id} className={`stagger-${Math.min(i + 1, 8)}`}>
                    <CardCollection title={name} ipfs={image ?? ""} />
                  </ScrollReveal>
                );
              })}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
