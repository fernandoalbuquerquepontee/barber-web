import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type z from "zod";

import { useCreateBarber, useUpdateBarber } from "@/api/hooks/barber";
import { createBarberSchema } from "@/forms/schemas/barber";
import type { Barber } from "@/types/barber";

import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Field, FieldGroup } from "./ui/field";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface UpsertBarberDialogProps {
  barber?: Barber;
}

export function UpsertBarberDialog({ barber }: UpsertBarberDialogProps) {
  const isEditing = !!barber;
  const { mutateAsync: createBarber } = useCreateBarber();
  const { mutateAsync: editBarber } = useUpdateBarber();

  const form = useForm<z.infer<typeof createBarberSchema>>({
    resolver: zodResolver(createBarberSchema),
    values: barber ?? {
      name: "",
      specialty: "",
      avatarUrl: "",
    },
  });

  async function onSubmit(data: z.infer<typeof createBarberSchema>) {
    try {
      if (isEditing && barber) {
        await editBarber({ id: barber.id, ...data });
        console.log("Editado com sucesso!");
        return;
      }

      console.log("Criado com sucesso!");
      await createBarber(data);
    } catch (error) {
      console.error("Erro ao salvar barbeiro:", error);
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{barber ? barber.name : "Adicionar Barbeiro"}</DialogTitle>
        <DialogDescription>
          {barber
            ? "Edite as informações desse barbeiro"
            : "Adicione um novo barbeiro"}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="pt-3 pb-6">
          <Controller
            control={form.control}
            name="name"
            render={({ field }) => (
              <Field>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Ex: Fernando Albuquerque"
                  {...field}
                />
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="specialty"
            render={({ field }) => (
              <Field>
                <Label htmlFor="specialty">Especialidade</Label>
                <Input
                  id="specialty"
                  placeholder="Ex: Degradê e Pigmentação"
                  {...field}
                />
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="avatarUrl"
            render={({ field }) => (
              <Field>
                <Label htmlFor="avatarUrl">URL da Foto</Label>
                <Input id="avatarUrl" placeholder="https://..." {...field} />
              </Field>
            )}
          />
        </FieldGroup>
        <DialogFooter>
          <Button type="submit">
            {barber ? "Salvar alterações" : "Criar barbeiro"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
