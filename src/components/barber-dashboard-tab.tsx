import { PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

import { useDeleteBarber } from "@/api/hooks/barber";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Barber } from "@/types/barber";

import { AddBarberButton } from "./add-barber-button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dialog } from "./ui/dialog";
import { UpsertBarberDialog } from "./upsert-barber-dialog";

interface BarberDashboardTabProps {
  barbers: Barber[];
}

export function BarberDashboardTab({ barbers }: BarberDashboardTabProps) {
  const { mutateAsync: deleteBarber } = useDeleteBarber();
  const [editingBarber, setEditingBarber] = useState<Barber | null>(null);

  return (
    <div className="pt-8">
      <h1 className="text-lg font-medium">Agenda de atendimentos e equipe.</h1>
      <h3 className="text-muted-foreground text-sm">
        Agenda de atendimentos e equipe.
      </h3>

      <div className="space-y-2 pt-6">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle className="font-medium">
                Equipe ({barbers.length})
              </CardTitle>
              <CardDescription className="text-sm">
                Barbeiros disponíveis para agendamento.
              </CardDescription>
            </div>

            <AddBarberButton />
          </CardHeader>
          <CardContent className="flex w-full items-center gap-4">
            {barbers.map((barber) => (
              <DropdownMenu key={barber.id}>
                <DropdownMenuTrigger
                  render={
                    <Button className="p-0 px-3 py-7" variant="outline">
                      <Avatar size="lg">
                        <AvatarImage src={barber.avatarUrl} />
                      </Avatar>
                      <div className="flex flex-col items-start">
                        <h3 className="text-sm font-medium">{barber.name}</h3>
                        <p className="text-muted-foreground text-xs">
                          {barber.specialty}
                        </p>
                      </div>
                    </Button>
                  }
                ></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    {/* BOTÃO DE EDITAR: Altera o estado para abrir o modal de forma limpa fora do dropdown */}
                    <DropdownMenuItem
                      onClick={() => setEditingBarber(barber)}
                      className="w-full cursor-pointer"
                    >
                      <PencilIcon className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => deleteBarber(barber.id)}
                    >
                      <TrashIcon />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </CardContent>
        </Card>
      </div>
      <Dialog
        open={!!editingBarber}
        onOpenChange={(open) => !open && setEditingBarber(null)}
      >
        <UpsertBarberDialog barber={editingBarber ?? undefined} />
      </Dialog>
    </div>
  );
}
