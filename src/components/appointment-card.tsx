import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Clock, DollarSign } from "lucide-react";

import { useCancellAppointment } from "@/api/hooks/appointments";
import { useSession } from "@/lib/auth-client";
import type { Appointment } from "@/types/appointment";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface AppointmentCardProps {
  appointment: Appointment;
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const { data: session } = useSession();
  const { mutate: cancelAppointment } = useCancellAppointment();
  const appointmentDate = new Date(appointment.date);
  const passed = isPast(appointmentDate);

  let statusText: string;
  if (appointment.status === "CANCELLED") statusText = "Cancelado";
  else if (appointment.status === "PENDING") statusText = "Pendente";
  else if (appointment.status === "CONFIRMED" && passed)
    statusText = "Finalizado";
  else statusText = "Confirmado";
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Card key={appointment.id} className="min-w-full">
            <CardContent className="flex p-0">
              <div className="flex flex-1 flex-col gap-3 py-5 pr-5 pl-5">
                <Badge className="w-fit" variant="secondary">
                  {statusText}
                </Badge>

                <h2 className="text-base font-semibold">
                  {appointment.service.name}
                </h2>

                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7 cursor-pointer">
                    <AvatarImage src={session?.user.image || ""} />
                    <AvatarFallback>
                      {session?.user?.name
                        ? session.user.name.substring(0, 2).toUpperCase()
                        : "US"}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-muted-foreground text-sm">
                    {appointment.barber.name}
                  </p>
                </div>
              </div>

              <Separator orientation="vertical" className="h-auto" />

              <div className="flex flex-col items-center justify-center px-8">
                <p className="text-muted-foreground text-xs capitalize">
                  {format(appointmentDate, "MMMM", { locale: ptBR })}
                </p>
                <p className="text-3xl font-semibold">
                  {format(appointmentDate, "dd")}
                </p>
                <p className="text-muted-foreground text-xs">
                  {format(appointmentDate, "HH:mm")}
                </p>
              </div>
            </CardContent>
          </Card>
        }
      />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Detalhes do Agendamento</SheetTitle>
          <SheetDescription>#AG-8492</SheetDescription>
        </SheetHeader>

        <div className="space-y-5 p-4 pt-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-xs font-semibold">
              STATUS
            </p>
            <Badge variant="secondary">Finalizado</Badge>
          </div>

          <div className="flex flex-col gap-4">
            <Card>
              <CardContent className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-muted-foreground text-[11px] font-medium">
                    SERVIÇO SOLICITADO
                  </p>
                  <p>Corte de Cabelo</p>
                </div>

                <div>
                  <p className="text-sm font-bold">R$ 55,00</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col gap-1">
                <p className="text-muted-foreground text-[11px] font-medium">
                  PROFISSIONAL / UNIDADE
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-7 w-7 cursor-pointer">
                    <AvatarImage src={session?.user.image || ""} />
                    <AvatarFallback>
                      {session?.user?.name
                        ? session.user.name.substring(0, 2).toUpperCase()
                        : "US"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-semibold">Vintage Barber</p>
                    <p className="text-muted-foreground text-[11px]">
                      Atendimento presencial
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <p className="text-muted-foreground text-[12px] font-medium">
                    DATA E HORÁRIO
                  </p>
                  <p className="text-xs font-medium">
                    06 de Fevereiro de 2026 às 09:45
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-muted-foreground text-[12px] font-medium">
                    DURAÇÃO ESTIMADA
                  </p>
                  <p className="flex items-center gap-1 text-xs font-medium">
                    <Clock className="h-4 w-4" /> 45 min
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col gap-2">
                <p className="text-muted-foreground text-[11px] font-medium">
                  FORMA DE PAGAMENTO
                </p>
                <p className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />{" "}
                  <span className="text-muted-foreground text-xs">
                    Pagamento no local (Cartão ou PIX)
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        <SheetFooter>
          <Button
            onClick={() => cancelAppointment(appointment.id)}
            disabled={appointment.status !== "PENDING"}
            variant="destructive"
          >
            Cancelar reserva
          </Button>
          <SheetClose render={<Button>Fechar</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
