import { useGetAvailableBarbers } from "@/api/hooks/barber";
import { Header } from "@/components/header";
import {
  OurBarberCard,
  type OurBarberCardProps,
} from "@/components/our-barbers-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function HomePage() {
  const { data: barbers } = useGetAvailableBarbers();

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
            <div className="pt-8">
              <h1 className="text-lg font-medium">Nossos Barbeiros</h1>
              <h3 className="text-muted-foreground text-sm">
                Escolha seu profissional de confiança.
              </h3>

              <div className="flex w-full items-center justify-between gap-4 pt-8">
                {barbers.map((barber: OurBarberCardProps) => (
                  <OurBarberCard
                    key={barber.id}
                    name={barber.name}
                    specialty={barber.specialty}
                    avatarUrl={barber.avatarUrl}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="appointment"></TabsContent>
          <TabsContent value="history"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
