import { OurBarberCard } from "@/components/our-barbers-card";
import { ServicesPriceTable } from "@/components/services-price-table";
import type { Barber } from "@/types/barber";
import type { Service } from "@/types/service";

export interface BarbersAndServicesTabProps {
  barbers: Barber[];
  services: Service[];
}

export function BarbersAndServicesTab({
  barbers,
  services,
}: BarbersAndServicesTabProps) {
  return (
    <div className="pt-8">
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
        <div>
          <h1 className="text-lg font-medium">Serviços & Preços</h1>
          <h3 className="text-muted-foreground text-sm">
            Escolha o serviço que deseja agendar.
          </h3>
        </div>

        <ServicesPriceTable services={services} />
      </div>
    </div>
  );
}
