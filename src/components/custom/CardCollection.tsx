import React from "react";
import { IpfsImage } from "react-ipfs-image";
import { Heart } from "lucide-react";

export default function CardCollection({
  title,
  ipfs,
}: Readonly<{
  title?: string;
  ipfs: string;
}>) {
  return (
    <div className="group relative rounded-xl overflow-hidden bg-[#262b2f] border border-[#353840] hover:border-[#2081e2]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#2081e2]/10 cursor-pointer">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-[#1a1c1f]">
        <IpfsImage hash={ipfs} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-center pb-4">
          <button className="bg-[#2081e2] hover:bg-[#1868b7] text-white px-6 py-2.5 rounded-xl text-sm font-medium translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
            Buy Now
          </button>
        </div>
      </div>

      {/* Card body */}
      <div className="p-3">
        <div className="flex items-center gap-1 mb-1">
          <span className="text-xs text-[#8a939b] truncate">CryptoRonin</span>
          <svg className="w-3 h-3 text-[#2081e2] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-white font-medium text-sm truncate">{title}</h3>
        <div className="flex items-center justify-between mt-2">
          <div>
            <div className="text-xs text-[#8a939b]">Price</div>
            <div className="flex items-center gap-1 text-white text-sm font-semibold">
              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
              </svg>
              0.05 RON
            </div>
          </div>
          <button className="text-[#8a939b] hover:text-[#2081e2] transition-colors p-1">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
