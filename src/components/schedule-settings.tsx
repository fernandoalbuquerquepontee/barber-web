import { Save } from "lucide-react";
import { useState } from "react";

import {
  type DaySchedule,
  useGetSchedule,
  useUpdateSchedule,
} from "@/api/hooks/dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { toast } from "./ui/toast";

const INITIAL_SCHEDULE: DaySchedule[] = [
  {
    dayOfWeek: 1,
    label: "Segunda-feira",
    startTime: "09:00",
    endTime: "20:00",
    isClosed: false,
  },
  {
    dayOfWeek: 2,
    label: "Terça-feira",
    startTime: "09:00",
    endTime: "20:00",
    isClosed: false,
  },
  {
    dayOfWeek: 3,
    label: "Quarta-feira",
    startTime: "09:00",
    endTime: "20:00",
    isClosed: false,
  },
  {
    dayOfWeek: 4,
    label: "Quinta-feira",
    startTime: "09:00",
    endTime: "20:00",
    isClosed: false,
  },
  {
    dayOfWeek: 5,
    label: "Sexta-feira",
    startTime: "08:30",
    endTime: "21:00",
    isClosed: false,
  },
  {
    dayOfWeek: 6,
    label: "Sábado",
    startTime: "08:00",
    endTime: "19:00",
    isClosed: false,
  },
  {
    dayOfWeek: 0,
    label: "Domingo",
    startTime: "",
    endTime: "",
    isClosed: true,
  },
];

export function ScheduleSettings() {
  const { data: savedSchedule, isLoading } = useGetSchedule();

  if (isLoading) {
    return <Skeleton className="min-h-125 w-full rounded-xl" />;
  }

  const scheduleData = INITIAL_SCHEDULE.map((baseDay) => {
    const saved = savedSchedule?.find((d) => d.dayOfWeek === baseDay.dayOfWeek);

    if (!saved) return baseDay;

    return {
      ...baseDay,
      startTime: saved.startTime || "",
      endTime: saved.endTime || "",
      isClosed: saved.isClosed,
    };
  });

  return <ScheduleForm initialSchedules={scheduleData} />;
}

function ScheduleForm({
  initialSchedules,
}: {
  initialSchedules: DaySchedule[];
}) {
  const [schedules, setSchedules] = useState<DaySchedule[]>(initialSchedules);
  const { mutate: saveSchedule, isPending } = useUpdateSchedule();

  const toggleDay = (index: number, checked: boolean) => {
    setSchedules((prev) =>
      prev.map((day, i) =>
        i === index ? { ...day, isClosed: !checked } : day,
      ),
    );
  };

  const updateTime = (
    index: number,
    field: "startTime" | "endTime",
    value: string,
  ) => {
    setSchedules((prev) =>
      prev.map((day, i) => (i === index ? { ...day, [field]: value } : day)),
    );
  };

  const onSubmit = () => {
    saveSchedule(schedules, {
      onSuccess: () => {
        toast.add({ title: "Escala salva com sucesso!" });
      },
      onError: () => {
        toast.add({ title: "Erro ao salvar a escala." });
      },
    });
  };

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl font-semibold">
              {" "}
              Escala Semanal & Dias de Atendimento
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              Configuração
            </Badge>
          </div>
          <CardDescription>
            Defina os dias da semana em que a barbearia recebe agendamentos e os
            respectivos horários.
          </CardDescription>
        </div>

        <Button onClick={onSubmit} disabled={isPending} variant="secondary">
          <Save className="mr-2 h-4 w-4" />
          {isPending ? "Salvando..." : "Salvar Escala"}
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col">
        {schedules.map((day, index) => (
          <div
            key={day.dayOfWeek}
            className="flex items-center justify-between border-b border-zinc-800/50 p-4 transition-colors last:border-0 hover:bg-zinc-900/50"
          >
            <div className="flex items-center gap-4">
              <Switch
                checked={!day.isClosed}
                onCheckedChange={(checked) => toggleDay(index, checked)}
                className="data-[state=checked]:bg-white data-[state=unchecked]:bg-zinc-700"
              />
              <div>
                <p className="font-medium">{day.label}</p>
                <p className="text-xs text-zinc-500">
                  {day.isClosed
                    ? "Sem agendamento ativo"
                    : "Disponível para agendamento"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-muted-foreground text-sm">Horário:</span>
              {day.isClosed ? (
                <Badge variant="outline">Fechado</Badge>
              ) : (
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={day.startTime || ""}
                    onChange={(e) =>
                      updateTime(index, "startTime", e.target.value)
                    }
                    className="h-8 w-25 p-2"
                  />
                  <Input
                    type="time"
                    value={day.endTime || ""}
                    onChange={(e) =>
                      updateTime(index, "endTime", e.target.value)
                    }

                    className="h-8 w-25 p-2"
                  />
                </div>
              )}

              <Badge
                className={cn(
                  "w-20 justify-center rounded px-3 py-1.5 text-xs font-medium",
                  day.isClosed
                    ? "bg-zinc-800/50 text-zinc-500 hover:bg-zinc-800/50"
                    : "bg-zinc-800 text-white hover:bg-zinc-800",
                )}
              >
                {day.isClosed ? "Fechado" : "Aberto"}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
