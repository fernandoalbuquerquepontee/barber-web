import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2 } from "lucide-react";
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
              availableHours.map((h: string, index: number) => (
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
              ))
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
