import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CloudSunIcon, Loader2, MoonIcon, SunIcon } from "lucide-react";
import { Controller, type UseFormReturn } from "react-hook-form";

import type { AppointmentFormValues } from "@/types/barber";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface HourSelectorCardProps {
  form: UseFormReturn<AppointmentFormValues>;
  selectedDate: Date;
  availableHours: string[];
  isLoading?: boolean;
}

export function HourSelectorCard({
  form,
  selectedDate,
  availableHours,
  isLoading,
}: HourSelectorCardProps) {
  const groupedHours = (availableHours || []).reduce(
    (acc, hour) => {
      const hourNumber = parseInt(hour.split(":")[0], 10);

      if (hourNumber < 12) {
        acc.morning.push(hour);
      } else if (hourNumber >= 12 && hourNumber < 18) {
        acc.afternoon.push(hour);
      } else {
        acc.night.push(hour);
      }

      return acc;
    },
    { morning: [], afternoon: [], night: [] } as Record<string, string[]>,
  );

  return (
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
            {isLoading ? (
              <div className="text-muted-foreground flex w-full items-center justify-center py-6 text-sm">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Buscando horários...
              </div>
            ) : availableHours && availableHours.length > 0 ? (
              <div className="flex flex-col gap-5">
                {groupedHours.morning.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CloudSunIcon size={16} />
                      <h3 className="text-muted-foreground text-sm font-medium">
                        Manhã
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {groupedHours.morning.map((h: string) => (
                        <Button
                          key={h}
                          type="button"
                          variant={field.value === h ? "default" : "secondary"}
                          size="lg"
                          className="px-7"
                          onClick={() => field.onChange(h)}
                        >
                          {h}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* TARDE */}
                {groupedHours.afternoon.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <SunIcon size={16} />
                      <h3 className="text-muted-foreground text-sm font-medium">
                        Tarde
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {groupedHours.afternoon.map((h: string) => (
                        <Button
                          key={h}
                          type="button"
                          variant={field.value === h ? "default" : "secondary"}
                          size="lg"
                          className="px-7"
                          onClick={() => field.onChange(h)}
                        >
                          {h}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* NOITE */}
                {groupedHours.night.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MoonIcon size={16} />
                      <h3 className="text-muted-foreground text-sm font-medium">
                        Noite
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {groupedHours.night.map((h: string) => (
                        <Button
                          key={h}
                          type="button"
                          variant={field.value === h ? "default" : "secondary"}
                          size="lg"
                          className="px-7"
                          onClick={() => field.onChange(h)}
                        >
                          {h}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-muted-foreground flex w-full items-center justify-center py-6 text-sm">
                Nenhum horário disponível para esta data.
              </div>
            )}
            {fieldState.error && (
              <span className="text-sm text-red-500">
                {fieldState.error.message}
              </span>
            )}
          </CardContent>
        )}
      />
    </Card>
  );
}
