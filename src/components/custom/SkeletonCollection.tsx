import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function SkeletonCollection() {
  return (
    <div className="rounded-xl overflow-hidden bg-[#262b2f] border border-[#353840]">
      <Skeleton className="w-full aspect-square bg-[#353840]" />
      <div className="p-3 space-y-2">
        <Skeleton className="w-24 h-3 bg-[#353840]" />
        <Skeleton className="w-3/4 h-4 bg-[#353840]" />
        <div className="flex justify-between items-center pt-1">
          <div className="space-y-1">
            <Skeleton className="w-10 h-2 bg-[#353840]" />
            <Skeleton className="w-16 h-4 bg-[#353840]" />
          </div>
          <Skeleton className="w-6 h-6 rounded bg-[#353840]" />
        </div>
      </div>
    </div>
  );
}
