"use client";

import dynamic from "next/dynamic";

export const LazyScrollToTop = dynamic(() => import("react-scroll-to-top"), { ssr: false });
export const LazyDonutChart = dynamic(() => import("@/components/custom/DonutChart"), { ssr: false });
export const LazyCountdown = dynamic(() => import("@/components/custom/Countdown"), { ssr: false });
export const LazyTimeline = dynamic(() => import("@/components/custom/Timeline"), { ssr: false });
