"use client";

import React, { useState, useCallback } from "react";
import { IpfsImage } from "../IpfsImage";
import { Heart } from "lucide-react";

export default function CardCollection({
  title,
  ipfs,
}: Readonly<{
  title?: string;
  ipfs: string;
}>) {
  const [liked, setLiked] = useState(false);

  const toggleLike = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked((prev) => !prev);
  }, []);

  return (
    <div className="card-anime card-lift group relative rounded-xl cursor-pointer">
      {/* Rotating energy aura border */}
      <div className="anime-aura" aria-hidden="true" />

      {/* Card content — z-index above aura, clipped corners */}
      <div className="relative rounded-xl overflow-hidden bg-card z-[2]">
        {/* Image */}
        <div className="relative overflow-hidden aspect-square bg-background">
          <IpfsImage
            hash={ipfs}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            style={{ transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)" }}
          />
          {/* Scanlines overlay */}
          <div className="anime-scanlines" aria-hidden="true" />
          {/* Speed lines sweep */}
          <div className="anime-speed-lines" aria-hidden="true" />
          {/* Hover overlay + Buy button */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 z-[4]">
            <button
              className="btn-press bg-primary hover:bg-primary/80 text-foreground px-6 py-2.5 rounded-xl text-sm font-medium translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
              style={{
                transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
                transitionDelay: "75ms",
              }}
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Card body */}
        <div className="p-3">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-xs text-muted-foreground truncate">Kurai</span>
            <svg className="w-3 h-3 text-primary flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-foreground font-medium text-sm truncate">{title}</h3>
          <div className="flex items-center justify-between mt-2">
            <div>
              <div className="text-xs text-muted-foreground">Price</div>
              <div className="flex items-center gap-1 text-foreground text-sm font-semibold">
                <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
                </svg>
                0.05 RON
              </div>
            </div>
            <button
              onClick={toggleLike}
              className={`heart-like p-1.5 -mr-1 rounded-lg transition-colors duration-200 ${
                liked
                  ? "text-destructive bg-destructive/10"
                  : "text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              }`}
            >
              <Heart
                className={`w-4 h-4 transition-transform duration-200 ${liked ? "fill-current" : ""}`}
                style={{ transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
