import { Loader2 } from "lucide-react";
import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import { useUpsertServiceForm } from "@/forms/hooks/dashboard";
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
  onSuccess?: () => void;
}

export function UpsertServiceDialog({
  service,
  onSuccess,
}: UpsertServiceDialogProps) {
  const { form, isSubmitting, onSubmit } = useUpsertServiceForm({
    service,
    onSuccess,
  });
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
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Carregando...
              </>
            ) : service ? (
              "Salvar alterações"
            ) : (
              "Criar serviço"
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
