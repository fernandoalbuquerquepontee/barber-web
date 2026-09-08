import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Controller, useForm, useWatch } from "react-hook-form";
import * as z from "zod";

import {
  useGetAvailableBarbers,
  useGetAvailableHours,
} from "@/api/hooks/appointments";
import { Calendar } from "@/components/ui/calendar";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const formSchema = z.object({
  date: z.string(),
  hour: z.string(),
  barberId: z.string().min(1, "Selecione um barbeiro."),
  serviceId: z.string().min(1, "Selecione um serviço."),
});

export function AppointmentTabs() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: format(new Date(), "yyyy-MM-dd"),
      hour: "",
      barberId: "",
      serviceId: "",
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

  const selectedDate = parseISO(selectedDateString);

  const { data: availableHours } = useGetAvailableHours(selectedDateString);
  const { data: availableBarbers } = useGetAvailableBarbers(
    selectedDateString,
    selectedHour,
  );

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
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
                render={({ field }) => (
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
              render={({ field }) => (
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
                </CardContent>
              )}
            />
          </Card>
        </div>
        {/* FINALIZE SUA RESERVA */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Finalize sua reserva</CardTitle>
            <CardDescription>
              Escolha o barbeiro e o serviço desejado.
            </CardDescription>
          </CardHeader>
          <Controller
            control={form.control}
            name="barberId"
            render={({ field }) => (
              <CardContent>
                <div className="flex flex-col gap-3">
                  <h2 className="text=[#E4E4E7] text-sm font-medium">
                    Escolha o Barbeiro
                  </h2>

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
                </div>
              </CardContent>
            )}
          />
        </Card>
      </div>
    </form>
  );
}
