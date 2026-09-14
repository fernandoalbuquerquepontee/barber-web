import { format } from "date-fns";
import { Controller, type UseFormReturn } from "react-hook-form";

import type { AppointmentFormValues } from "@/types/barber";

import { Calendar } from "./ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface DateSelectorCardProps {
  form: UseFormReturn<AppointmentFormValues>;
  selectedDate?: Date;
}

export function DateSelectorCard({
  form,
  selectedDate,
}: DateSelectorCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Selecione a data</CardTitle>
        <CardDescription>Dias disponíveis para atendimento.</CardDescription>
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
  );
}
