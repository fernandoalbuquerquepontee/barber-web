import { useGetAvailableBarbers, useGetServices } from "@/api/hooks/barber";
import { BarbersAndServicesTab } from "@/components/barbers-and-services-tab";
import { Header } from "@/components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function HomePage() {
  const { data: barbers } = useGetAvailableBarbers();
  const { data: services } = useGetServices();

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
          <TabsContent value="appointment"></TabsContent>
          <TabsContent value="history"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
