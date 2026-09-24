import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { UpsertBarberDialog } from "./upsert-barber-dialog";

export function AddBarberButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button>
          <Plus />
          Adicionar médico
        </Button>
      </DialogTrigger>
      <UpsertBarberDialog />
    </Dialog>
  );
}
