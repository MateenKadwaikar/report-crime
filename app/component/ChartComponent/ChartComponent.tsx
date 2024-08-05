"use client"
import React from "react";

import { Bar, BarChart } from "recharts";

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { type ChartConfig } from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]
export default function ChartComponent() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[50px] w-full">
      <BarChart data={chartData}>
        <Bar dataKey="value" />
      </BarChart>
    </ChartContainer>
  );
}
