import { Calendar } from "lucide-react";

import { useGetAllUserAppointments } from "@/api/hooks/appointments";
import { AppointmentHistoryTable } from "@/components/appointment-history-table";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useSession } from "@/lib/auth-client";

export function AppointmentHistoryPage() {
  const { data: session } = useSession();
  const { data: appointmentsHistory } = useGetAllUserAppointments(
    session?.user.id,
  );
  return (
    <div className="container mx-auto flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto mb-12 w-full max-w-6xl flex-1 pt-8">
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-xs">B A R B E R & C O.</p>
          <h1 className="text-3xl font-semibold">Minhas reservas</h1>
          <h3 className="text-muted-foreground text-base">
            Acompanhe seus agendamentos e histórico de atendimentos.
          </h3>
        </div>

        <div className="space-y-2">
          <div className="text-muted-foreground flex items-center justify-end gap-2 text-right">
            <Calendar size={16} />
            <span>{appointmentsHistory?.length} visitas</span>
          </div>
          <AppointmentHistoryTable
            appointmentsHistory={appointmentsHistory || []}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
