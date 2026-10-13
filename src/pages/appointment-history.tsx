import { isPast } from "date-fns";
import { Calendar, Plus } from "lucide-react";

import { useGetAllUserAppointments } from "@/api/hooks/appointments";
import { AppointmentCard } from "@/components/appointment-card";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";

export function AppointmentHistoryPage() {
  const { data: session } = useSession();
  const { data: appointmentsHistory } = useGetAllUserAppointments(
    session?.user.id,
  );

  const pendingAppointments =
    appointmentsHistory?.filter(
      (a) => a.status === "PENDING" && !isPast(new Date(a.date)),
    ) || [];

  const confirmedAppointments =
    appointmentsHistory?.filter(
      (a) => a.status === "CONFIRMED" && !isPast(new Date(a.date)),
    ) || [];

  const completedAppointments =
    appointmentsHistory?.filter(
      (a) => a.status === "CONFIRMED" && isPast(new Date(a.date)),
    ) || [];

  const canceledAppointments =
    appointmentsHistory?.filter((a) => a.status === "CANCELLED") || [];

  return (
    <div className="container mx-auto flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto mb-12 w-full max-w-6xl flex-1 px-4 pt-8">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-xs">B A R B E R & C O.</p>
            <h1 className="text-3xl font-semibold">Minhas reservas</h1>
            <h3 className="text-muted-foreground text-base">
              Acompanhe seus agendamentos e histórico de atendimentos.
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-muted-foreground flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm">
              <Calendar size={16} />
              <span>{appointmentsHistory?.length || 0} visitas</span>
            </div>
            <Button variant="secondary" className="flex items-center gap-2">
              <Plus size={16} /> Novo Agendamento
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          {pendingAppointments.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-muted-foreground text-xs font-semibold uppercase">
                Pendentes
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {pendingAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))}
              </div>
            </div>
          )}

          {confirmedAppointments.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-muted-foreground text-xs font-semibold uppercase">
                Confirmados
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {confirmedAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))}
              </div>
            </div>
          )}

          {completedAppointments.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-muted-foreground text-xs font-semibold uppercase">
                Finalizados
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {completedAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))}
              </div>
            </div>
          )}

          {canceledAppointments.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-muted-foreground text-xs font-semibold uppercase">
                Cancelados
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {canceledAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
