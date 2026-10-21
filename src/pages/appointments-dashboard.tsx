import { useGetAppointments } from "@/api/hooks/dashboard";
import { AppointmentHistoryTable } from "@/components/appointment-history-table";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppointmentsDashboard() {
  const { data: appointmentsHistory } = useGetAppointments();

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
          <h1 className="text-3xl font-semibold">Agendamentos</h1>
          <h3 className="text-muted-foreground text-base">
            Gerencie os horários e acompanhe as reservas dos seus clientes.
          </h3>
        </div>

        <div className="space-y-6 pt-6">
          <AppointmentHistoryTable
            appointmentsHistory={appointmentsHistory || []}
          />
        </div>
      </div>
    </div>
  );
}
