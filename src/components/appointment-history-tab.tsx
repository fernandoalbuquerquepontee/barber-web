import { Calendar } from "lucide-react";

import type { Appointment } from "@/types/appointment";

import { AppointmentHistoryTable } from "./appointment-history-table";

interface AppointmentHistoryTabProps {
  appointmentsHistory: Appointment[];
}

export function AppointmentHistoryTab({
  appointmentsHistory,
}: AppointmentHistoryTabProps) {
  return (
    <div className="pt-8">
      <h1 className="text-lg font-medium">Histórico de Agendamentos</h1>
      <h3 className="text-muted-foreground text-sm">
        Acompanhe suas reservas e visitas recentes.
      </h3>

      <div className="space-y-2 pt-6">
        <div className="text-muted-foreground flex items-center justify-end gap-2 text-right">
          <Calendar size={16} />
          <span>{appointmentsHistory.length} visitas</span>
        </div>
        <AppointmentHistoryTable appointmentsHistory={appointmentsHistory} />
      </div>
    </div>
  );
}
