import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { UpsertServiceDialog } from "./upsert-service-dialog";

export function AddServiceButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button>
            <Plus />
            Adicionar serviço
          </Button>
        }
      />
      <UpsertServiceDialog onSuccess={() => setIsOpen(false)} />
    </Dialog>
  );
}
