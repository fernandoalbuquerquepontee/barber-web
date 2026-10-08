import { parseISO } from "date-fns";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useWatch } from "react-hook-form";

import { useGetAvailableHours } from "@/api/hooks/appointments";
import { DateSelectorCard } from "@/components/date-selector-card";
import { FinalizeReservationCard } from "@/components/finalize-reservation-card";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HourSelectorCard } from "@/components/hour-selector-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateAppointmentForm } from "@/forms/hooks/appointment";

export function AppointmentPage() {
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

  const selectedDate = parseISO(selectedDateString);

  const { data: availableHours, isLoading: isAvailableHoursLoading } =
    useGetAvailableHours(selectedDateString);

  return (
    <div className="container mx-auto flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto mb-12 w-full max-w-6xl flex-1 pt-8">
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-xs">B A R B E R & C O.</p>
          <h1 className="text-3xl font-semibold">Reservar horário</h1>
          <h3 className="text-muted-foreground text-base">
            Escolha o profissional, serviço e melhor horário para você.
          </h3>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid w-full gap-6 pt-6">
            {/* CARD CALENDÁRIO */}
            <div className="flex flex-col gap-5 md:flex-row">
              <DateSelectorCard form={form} selectedDate={selectedDate} />

              <HourSelectorCard
                form={form}
                selectedDate={selectedDate}
                availableHours={availableHours}
                isLoading={isAvailableHoursLoading}
              />
            </div>
            {/* FINALIZE SUA RESERVA */}
            {!!selectedDateString && !!selectedHour && (
              <FinalizeReservationCard form={form} />
            )}
          </div>
        </form>

        <Dialog
          open={isSuccessDialogOpen}
          onOpenChange={setIsSuccessDialogOpen}
        >
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
      </main>

      <Footer />
    </div>
  );
}
