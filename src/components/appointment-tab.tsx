import { parseISO } from "date-fns";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useWatch } from "react-hook-form";

import {
  useGetAvailableBarbers,
  useGetAvailableHours,
} from "@/api/hooks/appointments";
import { useGetServices } from "@/api/hooks/barber";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateAppointmentForm } from "@/forms/hooks/appointment";
import { authClient } from "@/lib/auth-client";

import { DateSelectorCard } from "./date-selector-card";
import { FinalizeReservationCard } from "./finalize-reservation-card";
import { HourSelectorCard } from "./hour-selector-card";
import { Button } from "./ui/button";

export function AppointmentTabs() {
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

  const selectedBarber = useWatch({
    control: form.control,
    name: "barberId",
  });

  const selectedService = useWatch({
    control: form.control,
    name: "serviceId",
  });

  const selectedDate = parseISO(selectedDateString);

  const { data: availableHours } = useGetAvailableHours(selectedDateString);
  const { data: services } = useGetServices();
  const { data: availableBarbers } = useGetAvailableBarbers(
    selectedDateString,
    selectedHour,
  );

  const { data: session } = authClient.useSession();

  const isSubmitDisabled =
    form.formState.isSubmitting ||
    !selectedDateString ||
    !selectedHour ||
    !selectedBarber ||
    !selectedService;

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
            <div className="flex flex-col gap-5 md:flex-row">
              <DateSelectorCard form={form} selectedDate={selectedDate} />

              <HourSelectorCard
                form={form}
                selectedDate={selectedDate}
                availableHours={availableHours}
              />
            </div>
            {/* FINALIZE SUA RESERVA */}
            {!!selectedDateString && !!selectedHour && (
              <FinalizeReservationCard
                form={form}
                availableBarbers={availableBarbers}
                services={services}
                selectedBarber={selectedBarber}
                isSubmitDisabled={isSubmitDisabled}
              />
            )}
          </div>
        </form>
      ) : (
        <p>O usuário não está logado.</p>
      )}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
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
              variant="default"
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
    </div>
  );
}
