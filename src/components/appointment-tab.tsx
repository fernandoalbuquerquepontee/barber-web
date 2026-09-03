import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { useGetAvailableHours } from "@/api/hooks/appointments";
import { Calendar } from "@/components/ui/calendar";

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
  const [dateParam, setDateParam] = useQueryState("date", {
    defaultValue: format(new Date(), "yyyy-MM-dd"),
    clearOnDefault: false,
  });
  const [hour, setHour] = useQueryState("hour");
  const selectedDate = parseISO(dateParam);

  const handleSelectDate = (newDate: Date | undefined) => {
    if (newDate) {
      setDateParam(format(newDate, "yyyy-MM-dd"));
    }
  };

  const { data: availableHours } = useGetAvailableHours(dateParam);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: dateParam,
      hour: hour || "",
      barberId: "",
      serviceId: "",
    },
  });

  useEffect(() => {
    form.setValue("date", dateParam);
  }, [dateParam, form]);

  useEffect(() => {
    if (hour) {
      form.setValue("hour", hour);
    }
  }, [hour, form]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="pt-8">
      <h1 className="text-lg font-medium">Reservar horário</h1>
      <h3 className="text-muted-foreground text-sm">
        Escolha a data e o horário para o seu atendimento.
      </h3>

      <div className="flex w-full gap-6 pt-6">
        {/* CARD CALENDÁRIO */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Selecione a data</CardTitle>
            <CardDescription>
              Dias disponíveis para atendimento.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleSelectDate}
              required
              disabled={{ before: new Date() }}
              className="rounded-lg border"
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
                      setHour(h);
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
    </form>
  );
}
