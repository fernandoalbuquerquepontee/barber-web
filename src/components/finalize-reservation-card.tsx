import { Loader2 } from "lucide-react";
import { Controller, type UseFormReturn, useWatch } from "react-hook-form";

import { useGetAvailableBarbers } from "@/api/hooks/appointments";
import { useGetServices } from "@/api/hooks/barber";
import { formatCurrency } from "@/helpers/currency";
import type { AppointmentFormValues } from "@/types/barber";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface FinalizeReservationCardProps {
  form: UseFormReturn<AppointmentFormValues>;
}

export function FinalizeReservationCard({
  form,
}: FinalizeReservationCardProps) {
  const [date, hour, barberId, serviceId] = useWatch({
    control: form.control,
    name: ["date", "hour", "barberId", "serviceId"],
  });

  const { data: services } = useGetServices();
  const { data: availableBarbers, isLoading: isAvailableBarbersLoading } =
    useGetAvailableBarbers(date, hour);

  const isSubmitDisabled =
    form.formState.isSubmitting || !date || !hour || !barberId || !serviceId;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Finalize sua reserva</CardTitle>
        <CardDescription>
          Escolha o barbeiro e o serviço desejado.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5">
          <div className="space-y-3">
            <h2 className="text=[#E4E4E7] text-sm font-medium">
              Escolha o Barbeiro
            </h2>
            <Controller
              control={form.control}
              name="barberId"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1">
                  <div className="flex w-full items-center gap-3">
                    {isAvailableBarbersLoading ? (
                      <div className="text-muted-foreground flex w-full items-center justify-center py-6 text-sm">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Buscando barbeiros...
                      </div>
                    ) : availableBarbers && availableBarbers.length > 0 ? (
                      availableBarbers?.map((barber) => (
                        <Button
                          key={barber.id}
                          type="button"
                          size="lg"
                          className="flex items-center gap-2 rounded-full"
                          variant={
                            field.value === barber.id ? "default" : "secondary"
                          }
                          onClick={() => {
                            field.onChange(barber.id);
                          }}
                        >
                          <Avatar size="sm">
                            <AvatarImage src={barber.avatarUrl} />
                            <AvatarFallback>
                              {barber.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .substring(0, 2)
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{barber.name}</span>
                        </Button>
                      ))
                    ) : (
                      <div className="text-muted-foreground flex w-full items-center justify-center py-6 text-sm">
                        Nenhum barbeiro disponível para este horário.
                      </div>
                    )}
                  </div>
                  {fieldState.error && (
                    <span className="text-sm text-red-500">
                      {fieldState.error.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>

          {barberId && (
            <div className="space-y-3">
              <h2 className="text=[#E4E4E7] text-sm font-medium">
                Escolha o Serviço
              </h2>

              <Controller
                control={form.control}
                name="serviceId"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-4">
                      {services?.map((service) => (
                        <Button
                          key={service.id}
                          type="button"
                          variant={
                            field.value === service.id ? "default" : "secondary"
                          }
                          size="lg"
                          className="flex h-auto flex-col items-start gap-1 px-8 py-3"
                          onClick={() => field.onChange(service.id)}
                        >
                          <span className="text-sm font-medium">
                            {service.name}
                          </span>

                          <span className="text-muted-foreground text-sm">
                            {formatCurrency(service.price)}
                          </span>
                        </Button>
                      ))}
                    </div>
                    {fieldState.error && (
                      <span className="text-sm text-red-500">
                        {fieldState.error.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          size="lg"
          type="submit"
          className="ml-auto"
          disabled={isSubmitDisabled}
        >
          Confirmar Reserva
        </Button>
      </CardFooter>
    </Card>
  );
}
