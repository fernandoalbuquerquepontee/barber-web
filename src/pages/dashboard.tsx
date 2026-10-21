import { AnnualRevenueChart } from "@/components/annual-revenue-chart";
import { CardsInfoArea } from "@/components/barber-info-cards-area";
import { DailyRevenueChart } from "@/components/daily-revenue-chart";
import { MonthlyRevenueChart } from "@/components/monthly-revenue-chart";
import { ScheduleSettings } from "@/components/schedule-settings";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex items-center border-b px-4 py-3 md:hidden">
        <SidebarTrigger />
      </div>

      <div className="hidden p-4 md:flex">
        <SidebarTrigger className="-ml-1" />
      </div>

      <div className="container mx-auto max-w-6xl p-4 md:px-8 md:pb-8">
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-xs">B A R B E R & C O.</p>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <h3 className="text-muted-foreground text-base">
            Visão geral do faturamento e desempenho da sua barbearia.
          </h3>
        </div>

        {/* Métricas */}
        <div className="space-y-6 pt-6">
          <div>
            <CardsInfoArea />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <MonthlyRevenueChart />
            <AnnualRevenueChart />
          </div>

          <div>
            <DailyRevenueChart />
          </div>

          <div className="w-full">
            <ScheduleSettings />
          </div>
        </div>
      </div>
    </div>
  );
}
