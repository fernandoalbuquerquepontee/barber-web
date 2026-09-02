import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useQueryState } from "nuqs";

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

export function AppointmentTabs() {
  const [dateParam, setDateParam] = useQueryState("date", {
    defaultValue: format(new Date(), "yyyy-MM-dd"),
    clearOnDefault: false,
  });

  const selectedDate = parseISO(dateParam);

  const handleSelectDate = (newDate: Date | undefined) => {
    if (newDate) {
      setDateParam(format(newDate, "yyyy-MM-dd"));
    }
  };

  const { data: availableHours } = useGetAvailableHours(dateParam);

  return (
    <div className="pt-8">
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
          <CardContent className="flex w-full flex-wrap items-center gap-2">
            {/* PEGAR HORÁRIOS DISPONÍVEIS */}
            {availableHours?.map((hour: string, index: number) => (
              <Button
                key={index}
                variant="secondary"
                size="lg"
                className="px-7"
              >
                {hour}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
