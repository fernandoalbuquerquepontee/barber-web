import { Calendar, Users, Wallet } from "lucide-react";

import { useGetMetrics } from "@/api/hooks/dashboard";
import { formatCurrency } from "@/helpers/currency";

import { CardInfo } from "./card-info";

export function CardsInfoArea() {
  const { data: metrics, isLoading: isMetricsLoading } = useGetMetrics();

  if (isMetricsLoading) {
    return <p>Carregando métricas...</p>;
  }

  return (
    <div className="flex w-full items-center gap-3">
      <CardInfo
        icon={Wallet}
        title="Faturamento Hoje"
        value={formatCurrency(metrics.revenueToday)}
      />
      <CardInfo
        icon={Calendar}
        title="Total de Reservas (Hoje)"
        value={metrics.totalReservations}
      />
      <CardInfo
        icon={Users}
        title="Clientes Atendidos"
        value={metrics.attendedClients}
      />
    </div>
  );
}
