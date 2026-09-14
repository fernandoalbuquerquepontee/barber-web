import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Controller, useWatch } from "react-hook-form";

import {
  useGetAvailableBarbers,
  useGetAvailableHours,
} from "@/api/hooks/appointments";
import { useGetServices } from "@/api/hooks/barber";
import { Calendar } from "@/components/ui/calendar";
import { useCreateAppointmentForm } from "@/forms/hooks/appoitment";
import { formatCurrency } from "@/helpers/currency";
import { authClient } from "@/lib/auth-client";

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
  const { form, onSubmit } = useCreateAppointmentForm();

  const selectedDateString = useWatch({
    control: form.control,
    name: "date",
  });

  const selectedHour = useWatch({
    control: form.control,
    name: "hour",
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
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Selecione a data</CardTitle>
                  <CardDescription>
                    Dias disponíveis para atendimento.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Controller
                    control={form.control}
                    name="date"
                    render={({ field, fieldState }) => (
                      <div>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(newDate) => {
                            if (newDate) {
                              field.onChange(format(newDate, "yyyy-MM-dd"));
                              form.setValue("hour", "");
                            }
                          }}
                          required
                          disabled={{ before: new Date() }}
                          className="rounded-lg border"
                        />
                        {fieldState.error && (
                          <span className="text-sm text-red-500">
                            {fieldState.error.message}
                          </span>
                        )}
                      </div>
                    )}
                  />
                </CardContent>
              </Card>

              {/* CARD HORÁRIOS */}
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Horários disponíveis</CardTitle>
                  <CardDescription>
                    {format(new Date(selectedDate), "dd 'de' MMMM 'de' yyyy", {
                      locale: ptBR,
                    })}
                  </CardDescription>
                </CardHeader>
                <Controller
                  control={form.control}
                  name="hour"
                  render={({ field, fieldState }) => (
                    <CardContent className="flex w-full flex-wrap items-center gap-2">
                      {/* PEGAR HORÁRIOS DISPONÍVEIS */}
                      {availableHours?.map((h: string, index: number) => (
                        <Button
                          key={index}
                          type="button"
                          variant={field.value === h ? "default" : "secondary"}
                          size="lg"
                          className="px-7"
                          onClick={() => {
                            field.onChange(h);
                          }}
                        >
                          {h}
                        </Button>
                      ))}
                      {fieldState.error && (
                        <span className="text-sm text-red-500">
                          {fieldState.error.message}
                        </span>
                      )}
                    </CardContent>
                  )}
                />
              </Card>
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
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    size="lg"
                    type="submit"
                    className="ml-auto"
                    onClick={form.handleSubmit(onSubmit)}
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
    </div>
  );
}
