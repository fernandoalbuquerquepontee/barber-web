import { ArrowRight, Calendar } from "lucide-react";

import type { Barber } from "@/types/barber";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

export interface OurBarberCardProps {
  barber: Barber;
}

export function OurBarberCard({ barber }: OurBarberCardProps) {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center space-y-4 py-4">
        <div className="flex items-center gap-4">
          <img
            src={barber.avatarUrl}
            alt={barber.name}
            className="h-14 w-14 rounded-full shadow"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-base font-semibold">
                {barber.name}
              </h3>
              <Badge variant="secondary">Especialista</Badge>
            </div>
            <p className="text-muted-foreground truncate text-[13px]">
              {barber.specialty}
            </p>
          </div>
        </div>

        <Separator />

        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar size={12} />
            <p className="text-muted-foreground text-xs font-medium">
              Disponível hoje
            </p>
          </div>
          <Button className="text-xs font-medium" variant="secondary">
            Agendar <ArrowRight className="text-xs" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
