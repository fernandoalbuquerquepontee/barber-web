import type { Barber } from "@/types/barber";

import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

export interface OurBarberCardProps {
  barber: Barber;
}

export function OurBarberCard({ barber }: OurBarberCardProps) {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center space-y-3">
        <div>
          <img
            src={barber.avatarUrl}
            alt={barber.name}
            className="h-16 w-16 rounded-full shadow"
          />
        </div>

        <div className="space-y-1 text-center">
          <h3 className="truncate text-base font-medium">{barber.name}</h3>
          <p className="text-muted-foreground truncate text-sm">
            {barber.specialty}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Escolher
        </Button>
      </CardFooter>
    </Card>
  );
}
