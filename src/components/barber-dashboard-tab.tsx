import { Loader2, Pencil, Trash, Trash2Icon } from "lucide-react";
import { useState } from "react";

import { useDeleteBarber } from "@/api/hooks/barber";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Barber } from "@/types/barber";

import { AddBarberButton } from "./add-barber-button";
import { AnnualRevenueChart } from "./annual-revenue-chart";
import { CardsInfoArea } from "./barber-info-cards-area";
import { MonthlyRevenueChart } from "./monthly-revenue-chart";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dialog } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { UpsertBarberDialog } from "./upsert-barber-dialog";

interface BarberDashboardTabProps {
  barbers: Barber[];
}

export function BarberDashboardTab({ barbers }: BarberDashboardTabProps) {
  const { mutateAsync: deleteBarber, isPending: isDeletingBarberLoading } =
    useDeleteBarber();

  const [editingBarber, setEditingBarber] = useState<Barber | null>(null);

  return (
    <div className="pt-8">
      <h1 className="text-lg font-medium">Agenda de atendimentos e equipe.</h1>
      <h3 className="text-muted-foreground text-sm">
        Agenda de atendimentos e equipe.
      </h3>

      <div className="space-y-2 pt-6">
        <CardsInfoArea />
      </div>

      <div className="grid grid-cols-1 gap-4 pt-6 md:grid-cols-2">
        <MonthlyRevenueChart />
        <AnnualRevenueChart />
      </div>

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
          <CardContent className="">
            <ScrollArea className="h-50 w-full p-2">
              {barbers.map((barber) => (
                <div
                  className="flex h-fit items-center justify-between py-4 first:pt-0 last:pb-0"
                  key={barber.id}
                >
                  <div className="flex items-center gap-3">
                    <Avatar size="lg">
                      <AvatarImage src={barber.avatarUrl || ""} />
                      <AvatarFallback>
                        {barber.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm">{barber.name}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="icon-lg"
                      variant="ghost"
                      onClick={() => setEditingBarber(barber)}
                    >
                      <Pencil />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger
                        render={
                          <Button size="icon-lg" variant="ghost">
                            <Trash />
                          </Button>
                        }
                      />
                      <AlertDialogContent size="sm">
                        <AlertDialogHeader>
                          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                            <Trash2Icon />
                          </AlertDialogMedia>
                          <AlertDialogTitle>Delete barbeiro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação excluirá permanentemente o cadastro deste
                            barbeiro. Esta operação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel variant="outline">
                            Cancelar
                          </AlertDialogCancel>
                          <AlertDialogAction
                            variant="destructive"
                            onClick={async () => await deleteBarber(barber.id)}
                          >
                            {isDeletingBarberLoading && (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {isDeletingBarberLoading ? "Excluindo" : "Excluir"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </ScrollArea>
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
