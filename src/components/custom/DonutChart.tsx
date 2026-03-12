"use client";

import { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function cssVar(name: string): string {
  if (typeof window === "undefined") return "";
  return `hsl(${getComputedStyle(document.documentElement).getPropertyValue(name).trim()})`;
}

const LABELS = ["Financial Overhead", "Bonus & Fund", "IT Infrastructure", "Gift Code Inventory"];
const VALUES = [73, 55, 38, 21];
const CHART_VARS = ["--chart-1", "--chart-2", "--chart-3", "--chart-4"];

export default function DonutChart() {
  const data = useMemo(() => {
    const colors = CHART_VARS.map((v) => cssVar(v));
    return {
      labels: LABELS,
      datasets: [
        {
          data: VALUES,
          label: "Allocation %",
          backgroundColor: colors.map((c) => c.replace("hsl(", "hsl(").replace(")", " / 0.25)")),
          borderColor: colors,
          borderWidth: 2,
        },
      ],
    };
  }, []);

  return <Doughnut data={data} />;
}
