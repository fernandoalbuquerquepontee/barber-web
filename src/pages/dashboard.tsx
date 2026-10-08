import { Loader2, Pencil, Trash, Trash2Icon } from "lucide-react";
import { useState } from "react";

import { useDeleteBarber, useGetAvailableBarbers } from "@/api/hooks/barber";
import { useGetTeamPerformance } from "@/api/hooks/dashboard";
import { AddBarberButton } from "@/components/add-barber-button";
import { AnnualRevenueChart } from "@/components/annual-revenue-chart";
import { CardsInfoArea } from "@/components/barber-info-cards-area";
import { DailyRevenueChart } from "@/components/daily-revenue-chart";
import { MonthlyRevenueChart } from "@/components/monthly-revenue-chart";
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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UpsertBarberDialog } from "@/components/upsert-barber-dialog";
import { formatCurrency } from "@/helpers/currency";
import type { Barber } from "@/types/barber";

export function DashboardPage() {
  const { data: barbers } = useGetAvailableBarbers();
  const [editingBarber, setEditingBarber] = useState<Barber | null>(null);
  const { mutateAsync: deleteBarber, isPending: isDeletingBarberLoading } =
    useDeleteBarber();

  const { data: teamPerformance } = useGetTeamPerformance();

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex items-center border-b px-4 py-3 md:hidden">
        <SidebarTrigger />
      </div>

      <div className="hidden p-4 md:flex">
        <SidebarTrigger className="-ml-1" />
      </div>

      <div className="container mx-auto max-w-6xl p-4 md:px-8 md:pb-8">
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-xs">B A R B E R & C O.</p>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <h3 className="text-muted-foreground text-base">
            Visão geral do faturamento e desempenho da sua barbearia.
          </h3>
        </div>

        {/* Métricas */}
        <div className="pt-6">
          <div>
            <CardsInfoArea />
          </div>

          <div className="grid grid-cols-1 gap-4 pt-6 md:grid-cols-2">
            <MonthlyRevenueChart />
            <AnnualRevenueChart />
          </div>

          <div className="pt-6">
            <DailyRevenueChart />
          </div>

          <div className="grid grid-cols-1 gap-4 pt-6 md:grid-cols-2">
            <Card className="w-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-medium">
                    Equipe ({barbers?.length ?? 0})
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Barbeiros disponíveis para agendamento.
                  </CardDescription>
                </div>

                <AddBarberButton />
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-75 w-full pr-4">
                  {barbers?.map((barber) => (
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
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Button size="icon-lg" variant="ghost">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent size="sm">
                            <AlertDialogHeader>
                              <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                                <Trash2Icon />
                              </AlertDialogMedia>
                              <AlertDialogTitle>
                                Eliminar barbeiro?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta ação excluirá permanentemente o cadastro
                                deste barbeiro. Esta operação não pode ser
                                desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel variant="outline">
                                Cancelar
                              </AlertDialogCancel>
                              <AlertDialogAction
                                variant="destructive"
                                onClick={async () =>
                                  await deleteBarber(barber.id)
                                }
                              >
                                {isDeletingBarberLoading && (
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {isDeletingBarberLoading
                                  ? "A excluir"
                                  : "Excluir"}
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

            <Card className="w-full">
              <CardHeader>
                <CardTitle>Desempenho da equipa</CardTitle>
                <CardDescription>
                  Atendimentos e receita por barbeiro.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-75 w-full pr-4">
                  <div className="flex flex-col gap-5">
                    {teamPerformance?.map((barber) => (
                      <div
                        className="flex items-center justify-between"
                        key={barber.id}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar size="lg">
                            <AvatarImage src={barber.avatarUrl || ""} />
                            <AvatarFallback>
                              {barber.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex flex-col">
                            <p className="text-sm font-medium">{barber.name}</p>
                            <p className="text-muted-foreground text-xs">
                              {barber.totalAppointments} clientes atendidos
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">
                            {formatCurrency(barber.revenue)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
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
      </div>
    </div>
  );
}
