import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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

interface ServicesPriceTableProps {
  appointmentsHistory: Appointment[];
}

const statusTranslation: Record<string, string> = {
  PENDING: "Pendente",
  CONFIRMED: "Concluído",
  CANCELED: "Cancelado",
};

export function AppointmentHistoryTable({
  appointmentsHistory,
}: ServicesPriceTableProps) {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Data e Hora</TableHead>
          <TableHead>Barbeiro</TableHead>
          <TableHead>Serviço</TableHead>
          <TableHead className="text-right">Status</TableHead>
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
                {statusTranslation[appointment.status] || appointment.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
