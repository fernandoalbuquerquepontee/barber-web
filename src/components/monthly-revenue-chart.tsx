import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { useRevenueMonthly } from "@/api/hooks/dashboard";
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

const chartConfig = {
  revenue: {
    label: "Renda",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function MonthlyRevenueChart() {
  const { data: chartData, isLoading } = useRevenueMonthly();

  if (isLoading) {
    return (
      <div className="min-h-full w-full animate-pulse rounded-lg bg-zinc-700"></div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Renda mensal</CardTitle>
        <CardDescription>Receita consolidada por período.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData ?? []}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
