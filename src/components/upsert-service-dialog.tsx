import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import type z from "zod";

import { useCreateService, useUpdateService } from "@/api/hooks/dashboard";
import { upsertServiceSchema } from "@/schemas/dashboard";
import type { Service } from "@/types/service";

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

interface UpsertServiceDialogProps {
  service?: Service;
}

export function UpsertServiceDialog({ service }: UpsertServiceDialogProps) {
  const isEditing = !!service;
  const { mutateAsync: createService } = useCreateService();
  const { mutateAsync: editService } = useUpdateService();

  const form = useForm<z.infer<typeof upsertServiceSchema>>({
    resolver: zodResolver(upsertServiceSchema),
    values: service ?? {
      name: "",
      price: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof upsertServiceSchema>) {
    try {
      if (isEditing && service) {
        await editService({ id: service.id, ...data });
        console.log("Editado com sucesso!");
        return;
      }

      console.log("Criado com sucesso!");
      await createService(data);
    } catch (error) {
      console.error("Erro ao salvar barbeiro:", error);
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {service ? service.name : "Adicionar Serviço"}
        </DialogTitle>
        <DialogDescription>
          {service
            ? "Edite as informações desse serviço"
            : "Adicione um novo serviço"}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="pt-3 pb-6">
          <Controller
            control={form.control}
            name="name"
            render={({ field }) => (
              <Field>
                <Label htmlFor="name">Nome do serviço</Label>
                <Input
                  id="name"
                  placeholder="Ex: Corte de Cabelo Masculino"
                  {...field}
                />
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="price"
            render={({ field }) => (
              <Field>
                <Label htmlFor="price">Preço</Label>
                <NumericFormat
                  id="price"
                  customInput={Input}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="R$ "
                  decimalScale={2}
                  fixedDecimalScale
                  allowNegative={false}
                  placeholder="R$ 0,00"
                  name={field.name}
                  onBlur={field.onBlur}
                  value={field.value}
                  onValueChange={(values) => {
                    field.onChange(values.floatValue);
                  }}
                />
              </Field>
            )}
          />
        </FieldGroup>
        <DialogFooter>
          <Button type="submit">
            {service ? "Salvar alterações" : "Criar serviço"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
