import { Controller, type UseFormReturn } from "react-hook-form";

import { formatCurrency } from "@/helpers/currency";
import type { AppointmentFormValues, Barber } from "@/types/barber";
import type { Service } from "@/types/service";

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
  availableBarbers?: Barber[];
  services?: Service[];
  selectedBarber: string;
  isSubmitDisabled: boolean;
}

export function FinalizeReservationCard({
  form,
  availableBarbers,
  services,
  selectedBarber,
  isSubmitDisabled,
}: FinalizeReservationCardProps) {
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
                    {availableBarbers?.map((barber) => (
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

          {selectedBarber && (
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
