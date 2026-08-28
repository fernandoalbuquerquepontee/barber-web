import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

export interface OurBarberCardProps {
  id?: number | string;
  name: string;
  specialty: string;
}

export function OurBarberCard({ name, specialty }: OurBarberCardProps) {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center space-y-3">
        <div>
          <img
            src="https://github.com/shadcn.png"
            alt="Barber Image"
            className="h-16 w-16 rounded-full"
          />
        </div>

        <div className="space-y-1 text-center">
          <h3 className="truncate text-base font-medium">{name}</h3>
          <p className="text-muted-foreground truncate text-sm">{specialty}</p>
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
