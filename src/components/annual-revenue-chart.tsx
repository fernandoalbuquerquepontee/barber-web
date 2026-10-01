import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { useRevenueAnnual } from "@/api/hooks/dashboard";
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
import { formatCurrency } from "@/helpers/currency";

import { Skeleton } from "./ui/skeleton";

const chartConfig = {
  revenue: {
    label: "Renda",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function AnnualRevenueChart() {
  const { data: chartData, isLoading } = useRevenueAnnual();

  if (isLoading) {
    return <Skeleton className="w-full" />;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Renda anual</CardTitle>
        <CardDescription>Receita consolidada por período.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData ?? []}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value, _name, item) => {
                    return (
                      <>
                        <div
                          className="h-2.5 w-2.5 shrink-0 rounded-xs"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-muted-foreground">Renda</span>
                        <span className="text-foreground ml-auto font-mono font-medium">
                          {formatCurrency(Number(value))}
                        </span>
                      </>
                    );
                  }}
                />
              }
            />
            <Bar
              dataKey="revenue"
              fill="var(--color-revenue)"
              radius={8}
              maxBarSize={60}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
