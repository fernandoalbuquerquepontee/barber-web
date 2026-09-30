import { type LucideIcon } from "lucide-react";

import { Card, CardContent } from "./ui/card";

interface CardInfoProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export function CardInfo({ title, value, icon: Icon }: CardInfoProps) {
  return (
    <Card className="w-full px-4 py-6">
      <CardContent className="flex items-center gap-3">
        <div className="rounded-xl bg-[#27272A] p-3">
          <Icon className="h-5 w-5 text-white" />
        </div>

        <div className="flex flex-col">
          <span className="text-muted-foreground text-xs">{title}</span>
          <h1 className="text-lg font-semibold">{value}</h1>
        </div>
      </CardContent>
    </Card>
  );
}
