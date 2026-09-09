import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/helpers/currency";
import type { Service } from "@/types/service";

interface ServicesPriceTableProps {
  services: Service[];
}

export function ServicesPriceTable({ services }: ServicesPriceTableProps) {
  return (
    <Table className="mt-8 w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Serviço</TableHead>
          <TableHead className="text-right">Preço</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service) => (
          <TableRow key={service.id}>
            <TableCell className="font-medium">{service.name}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(service.price)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
