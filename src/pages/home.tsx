import { useGetAllUserAppointments } from "@/api/hooks/appointments";
import { useGetAvailableBarbers, useGetServices } from "@/api/hooks/barber";
import { AppointmentHistoryTab } from "@/components/appointment-history-tab";
import { AppointmentTabs } from "@/components/appointment-tab";
import { BarbersAndServicesTab } from "@/components/barbers-and-services-tab";
import { Header } from "@/components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "@/lib/auth-client";

export function HomePage() {
  const { data: session } = useSession();

  const { data: barbers } = useGetAvailableBarbers();
  const { data: services } = useGetServices();
  const { data: appointmentsHistory } = useGetAllUserAppointments(
    session?.user.id,
  );

  return (
    <div className="container mx-auto">
      <Header />

      <div className="py-11">
        <Tabs defaultValue="barbers" className="w-240">
          <TabsList variant="line" className="w-full">
            <TabsTrigger value="barbers">Cortes & Barbeiros</TabsTrigger>
            <TabsTrigger value="appointment">Reservar Horário</TabsTrigger>
            <TabsTrigger value="history">Agendamentos</TabsTrigger>
          </TabsList>
          <TabsContent value="barbers">
            <BarbersAndServicesTab
              barbers={barbers}
              services={services ?? []}
            />
          </TabsContent>
          <TabsContent value="appointment">
            <AppointmentTabs />
          </TabsContent>
          <TabsContent value="history">
            <AppointmentHistoryTab
              appointmentsHistory={appointmentsHistory ?? []}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
