import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
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
}

export function HourSelectorCard({
  form,
  selectedDate,
  availableHours,
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
  );
}
