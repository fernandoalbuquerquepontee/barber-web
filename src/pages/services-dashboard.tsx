import { AddServiceButton } from "@/components/add-service-button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function ServicesDashboard() {
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
      </div>
    </div>
  );
}
