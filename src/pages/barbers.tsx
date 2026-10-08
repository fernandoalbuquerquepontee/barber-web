import { useGetAvailableBarbers, useGetServices } from "@/api/hooks/barber";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroCard } from "@/components/hero-card";
import { OurBarberCard } from "@/components/our-barbers-card";
import { ServicesPriceTable } from "@/components/services-price-table";

export function BarbersPage() {
  const { data: barbers } = useGetAvailableBarbers();
  const { data: services } = useGetServices();
  return (
    <div className="container mx-auto flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto mb-12 w-full max-w-6xl flex-1 pt-8">
        <HeroCard />

        <h1 className="text-lg font-medium">Nossos Barbeiros</h1>
        <h3 className="text-muted-foreground text-sm">
          Escolha seu profissional de confiança.
        </h3>

        <div className="flex w-full items-center justify-between gap-4 pt-8">
          {barbers?.map((barber) => (
            <OurBarberCard key={barber.id} barber={barber} />
          ))}
        </div>

        <div className="pt-8">
          <ServicesPriceTable services={services || []} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
