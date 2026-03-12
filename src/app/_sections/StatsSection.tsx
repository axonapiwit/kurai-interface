"use client";

import { useEffect, useRef, useState } from "react";

function StatItem({ target, label, suffix = "+" }: { target: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const startTime = performance.now();
        const dur = 1600;
        const tick = (now: number) => {
          const t = Math.min((now - startTime) / dur, 1);
          const eased = 1 - Math.pow(1 - t, 4);
          setCount(Math.floor(eased * target));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center py-8 sm:py-10 px-4">
      <div
        className="text-white font-bold tabular-nums"
        style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)" }}
      >
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-muted-foreground text-sm mt-1.5">{label}</div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="border-b border-divider">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-divider">
          <StatItem target={4200} label="RON Total Volume" />
          <StatItem target={42100} label="NFTs Minted" />
          <StatItem target={8247} label="Active Collectors" />
          <StatItem target={15} label="Collections" />
        </div>
      </div>
    </section>
  );
}
