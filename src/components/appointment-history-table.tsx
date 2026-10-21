import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

import { useCancellAppointment } from "@/api/hooks/appointments";
import { useDeleteAppointment } from "@/api/hooks/dashboard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Appointment } from "@/types/appointment";

import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

interface ServicesPriceTableProps {
  appointmentsHistory: Appointment[];
}

const statusTranslation: Record<string, string> = {
  PENDING: "Pendente",
  CONFIRMED: "Concluído",
  CANCELLED: "Cancelado",
};

export function AppointmentHistoryTable({
  appointmentsHistory,
}: ServicesPriceTableProps) {
  const { mutate: cancelAppointment } = useCancellAppointment();
  const { mutate: deleteAppointment } = useDeleteAppointment();

  console.log(appointmentsHistory);

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  return (
    <>
      <Card>
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Data e Hora</TableHead>
                <TableHead>Barbeiro</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead className="text-right">Status</TableHead>
                <TableHead className="w-12.5"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointmentsHistory && appointmentsHistory.length > 0 ? (
                appointmentsHistory.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">
                      {format(
                        new Date(appointment.date),
                        "dd/MM/yyyy 'às' HH:mm",
                        {
                          locale: ptBR,
                        },
                      )}
                    </TableCell>
                    <TableCell>{appointment.barber.name}</TableCell>
                    <TableCell>{appointment.service.name}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          ({
                            PENDING: "secondary",
                            CONFIRMED: "default",
                            CANCELLED: "destructive",
                          }[appointment.status] as
                            | "default"
                            | "secondary"
                            | "destructive"
                            | "outline") || "outline"
                        }
                      >
                        {statusTranslation[appointment.status] ||
                          appointment.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          }
                        />
                        <DropdownMenuContent align="end">
                          <DropdownMenuGroup>
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>

                            <DropdownMenuItem
                              onClick={() =>
                                setSelectedAppointment(appointment)
                              }
                            >
                              Ver Detalhes
                            </DropdownMenuItem>

                            {appointment.status === "PENDING" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  cancelAppointment(appointment.id)
                                }
                              >
                                Cancelar Reserva
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => deleteAppointment(appointment.id)}
                              className="text-destructive"
                            >
                              Excluir Reserva
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-muted-foreground h-24 text-center"
                  >
                    Você ainda não possui nenhum agendamento.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet
        open={!!selectedAppointment}
        onOpenChange={(isOpen) => {
          if (!isOpen) setSelectedAppointment(null);
        }}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Detalhes do Agendamento</SheetTitle>
            <SheetDescription>
              Informações completas sobre o cliente e o serviço.
            </SheetDescription>
          </SheetHeader>

          {selectedAppointment && (
            <div className="flex flex-col gap-6 p-5">
              <div>
                <h4 className="text-sm font-semibold">Cliente</h4>
                <p className="text-muted-foreground text-sm">
                  Nome: {selectedAppointment.user?.name}
                </p>
                <p className="text-muted-foreground text-sm">
                  Telefone: {selectedAppointment.user?.phoneNumber}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold">Serviço</h4>
                <p className="text-muted-foreground text-sm">
                  {selectedAppointment.service.name}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold">Barbeiro</h4>
                <p className="text-muted-foreground text-sm">
                  {selectedAppointment.barber.name}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold">Data</h4>
                <p className="text-muted-foreground text-sm">
                  {format(
                    new Date(selectedAppointment.date),
                    "dd 'de' MMMM 'às' HH:mm",
                    { locale: ptBR },
                  )}
                </p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
