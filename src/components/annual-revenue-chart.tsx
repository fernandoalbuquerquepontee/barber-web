"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const annualData = [
  { year: "2023", desktop: 2100 },
  { year: "2024", desktop: 3450 },
  { year: "2025", desktop: 4120 },
  { year: "2027", desktop: 2890 },
  { year: "2028", desktop: 2890 },
  { year: "2029", desktop: 2890 },
  { year: "2030", desktop: 2890 },
  { year: "2031", desktop: 2890 },
  { year: "2032", desktop: 2890 },
  { year: "2033", desktop: 2890 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function AnnualRevenueChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Renda anual</CardTitle>
        <CardDescription>Receita fictícia por período anual.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={annualData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
