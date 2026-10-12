import { CheckCircle2, Loader2 } from "lucide-react";
import { Controller, type UseFormReturn, useWatch } from "react-hook-form";

import { useGetAvailableBarbers } from "@/api/hooks/appointments";
import { useGetServices } from "@/api/hooks/barber";
import { formatCurrency } from "@/helpers/currency";
import type { AppointmentFormValues } from "@/types/barber";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

interface FinalizeReservationCardProps {
  form: UseFormReturn<AppointmentFormValues>;
  createAppointmentIsLoading: boolean;
}

export function FinalizeReservationCard({
  form,
  createAppointmentIsLoading,
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
        <CardTitle className="text-xl font-semibold">
          Finalize sua reserva
        </CardTitle>
        <CardDescription className="text-xs font-medium">
          Escolha o barbeiro e o serviço desejado.
        </CardDescription>

        <Separator className="my-4" />
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

                          className={`flex items-center gap-2 px-5 py-6 transition-all duration-200 ${
                            field.value === barber.id
                              ? "opacity-100 shadow-md"
                              : "opacity-50 grayscale-50 hover:opacity-75"
                          }`}
                          variant={
                            field.value === barber.id ? "default" : "secondary"
                          }
                          onClick={() => {
                            field.onChange(barber.id);
                          }}
                        >
                          <Avatar size="default">
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
                          <span className="text-sm font-medium">
                            {barber.name}
                          </span>
                          {field.value === barber.id && <CheckCircle2 />}
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
                          className={`flex h-auto items-start justify-between px-8 py-4 transition-all duration-200 ${
                            field.value === service.id
                              ? "opacity-100 shadow-md"
                              : "opacity-50 hover:opacity-75"
                          }`}
                          onClick={() => field.onChange(service.id)}
                        >
                          <div className="flex flex-col gap-1 text-start">
                            <span className="text-sm font-medium">
                              {service.name}
                            </span>
                            <span
                              className={`text-sm ${
                                field.value === service.id
                                  ? "text-primary-foreground/80"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {formatCurrency(service.price)}
                            </span>
                          </div>

                          <Badge
                            className={
                              field.value === service.id
                                ? "bg-primary-foreground/20 text-primary-foreground border-none"
                                : "text-muted-foreground"
                            }
                            variant={
                              field.value === service.id
                                ? "outline"
                                : "secondary"
                            }
                          >
                            25min
                          </Badge>
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
          disabled={isSubmitDisabled || createAppointmentIsLoading}
        >
          {createAppointmentIsLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />A agendar...
            </>
          ) : (
            "Confirmar"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
