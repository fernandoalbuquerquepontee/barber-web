import { Loader2, Pencil, Phone, Trash2, Trash2Icon } from "lucide-react";
import { useState } from "react";

import { useDeleteBarber, useGetAvailableBarbers } from "@/api/hooks/barber";
import { AddBarberButton } from "@/components/add-barber-button";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UpsertBarberDialog } from "@/components/upsert-barber-dialog";
import type { Barber } from "@/types/barber";

export function BarbersDashboard() {
  const { data: barbers } = useGetAvailableBarbers();
  const { mutateAsync: deleteBarber, isPending: isDeletingBarberLoading } =
    useDeleteBarber();
  const [editingBarber, setEditingBarber] = useState<Barber | null>(null);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex items-center border-b px-4 py-3 md:hidden">
        <SidebarTrigger />
      </div>

      <div className="hidden p-4 md:flex">
        <SidebarTrigger className="-ml-1" />
      </div>

      <div className="container mx-auto max-w-6xl p-4 md:px-8 md:pb-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs">B A R B E R & C O.</p>
            <h1 className="text-3xl font-semibold">Barbeiros</h1>
            <h3 className="text-muted-foreground text-base">
              Gerencie e acompanhe a equipe de barbeiros.
            </h3>
          </div>

          <AddBarberButton />
        </div>

        <div className="flex items-center gap-4 pt-6">
          {barbers?.map((barber) => (
            <Card className="max-w-100 min-w-100">
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Avatar size="lg">
                    <AvatarImage src={barber.avatarUrl || ""} />
                    <AvatarFallback>
                      {barber.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col gap-2">
                    <h1>{barber.name}</h1>
                    <Badge variant="outline">{barber.specialty}</Badge>
                  </div>
                </div>

                <Separator />

                <div className="text-muted-foreground flex items-center gap-2">
                  <Phone size={12} />
                  <p className="text-xs">(11) 98451-2093</p>
                </div>

                <Separator />

                <div className="flex gap-4">
                  <Button
                    variant="secondary"
                    onClick={() => setEditingBarber(barber)}
                  >
                    <Pencil />
                    Editar
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button variant="destructive">
                        <Trash2 />
                        Excluir
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent size="sm">
                      <AlertDialogHeader>
                        <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                          <Trash2Icon />
                        </AlertDialogMedia>
                        <AlertDialogTitle>Eliminar barbeiro?</AlertDialogTitle>
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
                          {isDeletingBarberLoading ? "A excluir" : "Excluir"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Dialog
          open={!!editingBarber}
          onOpenChange={(open) => !open && setEditingBarber(null)}
        >
          <UpsertBarberDialog barber={editingBarber ?? undefined} />
        </Dialog>
      </div>
    </div>
  );
}
