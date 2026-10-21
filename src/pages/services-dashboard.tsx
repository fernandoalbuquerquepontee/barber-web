import { Loader2, Pencil, Trash2, Trash2Icon } from "lucide-react";

import { useDeleteService, useGetServices } from "@/api/hooks/dashboard";
import { AddServiceButton } from "@/components/add-service-button";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { formatCurrency } from "@/helpers/currency";

export function ServicesDashboard() {
  const { data: services } = useGetServices();
  const { mutateAsync: deleteService, isPending: isDeletingServiceLoading } =
    useDeleteService();

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
            <h1 className="text-3xl font-semibold">Serviços</h1>
            <h3 className="text-muted-foreground text-base">
              Configure o catálogo de serviços, durações e preços da sua
              barbearia.
            </h3>
          </div>

          <AddServiceButton />
        </div>

        <div className="grid grid-cols-1 gap-4 py-7 sm:grid-cols-2 lg:grid-cols-3">
          {services?.map((service) => (
            <Card key={service.id}>
              <CardContent className="flex flex-col space-y-2">
                <div>
                  <h1 className="font-semibold">{service.name}</h1>
                </div>

                <h2 className="text-xl font-bold">
                  {formatCurrency(service.price)}
                </h2>

                <Separator />

                <div className="flex items-center gap-3">
                  <Button variant="ghost">
                    <Pencil className="h-4 w-4" />
                    Editar
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button variant="ghost" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                        Excluir
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent size="sm">
                      <AlertDialogHeader>
                        <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                          <Trash2Icon />
                        </AlertDialogMedia>
                        <AlertDialogTitle>Excluir serviço?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação excluirá permanentemente o cadastro deste
                          serviço. Esta operação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel variant="outline">
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                          variant="destructive"
                          onClick={async () => await deleteService(service.id)}
                        >
                          {isDeletingServiceLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          {isDeletingServiceLoading ? "Excluindo" : "Excluir"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
