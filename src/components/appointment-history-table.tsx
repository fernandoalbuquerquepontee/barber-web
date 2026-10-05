import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MoreHorizontal } from "lucide-react";

import { useCancellAppointment } from "@/api/hooks/appointments";
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

  return (
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
            {appointmentsHistory.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">
                  {format(new Date(appointment.date), "dd/MM/yyyy 'às' HH:mm", {
                    locale: ptBR,
                  })}
                </TableCell>
                <TableCell>{appointment.barber.name}</TableCell>
                <TableCell>{appointment.service.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={
                      ({
                        PENDING: "secondary",
                        CONFIRMED: "default",
                        CANCELED: "destructive",
                      }[appointment.status] as
                        "default" | "secondary" | "destructive" | "outline") ||
                      "outline"
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
                        {appointment.status === "PENDING" && (
                          <DropdownMenuItem
                            onClick={() => cancelAppointment(appointment.id)}
                          >
                            Cancelar Reserva
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
