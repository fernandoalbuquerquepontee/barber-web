import { parseISO } from "date-fns";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Controller, useWatch } from "react-hook-form";

import {
  useGetAvailableBarbers,
  useGetAvailableHours,
} from "@/api/hooks/appointments";
import { useGetServices } from "@/api/hooks/barber";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateAppointmentForm } from "@/forms/hooks/appoitment";
import { formatCurrency } from "@/helpers/currency";
import { authClient } from "@/lib/auth-client";

import { DateSelectorCard } from "./date-selector-card";
import { HourSelectorCard } from "./hour-selector-card";
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

export function AppointmentTabs() {
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const { form, onSubmit } = useCreateAppointmentForm({
    onSuccess: () => {
      setIsSuccessDialogOpen(true);
    },
  });

  const selectedDateString = useWatch({
    control: form.control,
    name: "date",
  });

  const selectedHour = useWatch({
    control: form.control,
    name: "hour",
  });

  const selectedBarber = useWatch({
    control: form.control,
    name: "barberId",
  });

  const selectedService = useWatch({
    control: form.control,
    name: "serviceId",
  });

  const selectedDate = parseISO(selectedDateString);

  const { data: availableHours } = useGetAvailableHours(selectedDateString);
  const { data: services } = useGetServices();
  const { data: availableBarbers } = useGetAvailableBarbers(
    selectedDateString,
    selectedHour,
  );

  const { data: session } = authClient.useSession();

  return (
    <div>
      {session ? (
        <form onSubmit={form.handleSubmit(onSubmit)} className="pt-8">
          <h1 className="text-lg font-medium">Reservar horário</h1>
          <h3 className="text-muted-foreground text-sm">
            Escolha a data e o horário para o seu atendimento.
          </h3>

          <div className="grid w-full gap-6 pt-6">
            {/* CARD CALENDÁRIO */}
            <div className="flex gap-5">
              <DateSelectorCard form={form} selectedDate={selectedDate} />

              {/* CARD HORÁRIOS */}
              <HourSelectorCard
                form={form}
                selectedDate={selectedDate}
                availableHours={availableHours}
              />
            </div>
            {/* FINALIZE SUA RESERVA */}
            {!!selectedDateString && !!selectedHour && (
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
                                    field.value === barber.id
                                      ? "default"
                                      : "secondary"
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
                                      field.value === service.id
                                        ? "default"
                                        : "secondary"
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
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={
                      form.formState.isSubmitting ||
                      !selectedDateString ||
                      !selectedHour ||
                      !selectedBarber ||
                      !selectedService
                    }
                  >
                    Confirmar Reserva
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </form>
      ) : (
        <p>O usuário não está logado.</p>
      )}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              Reserva Confirmada!
            </DialogTitle>
            <DialogDescription>
              Seu horário foi agendado com sucesso no sistema.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <Button
              type="button"
              variant="default"
              onClick={() => {
                setIsSuccessDialogOpen(false);
                form.reset();
              }}
            >
              Concluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
