import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";

import { useCreateService, useUpdateService } from "@/api/hooks/dashboard";
import { toast } from "@/components/ui/toast";
import { upsertServiceSchema } from "@/schemas/dashboard";
import type { Service } from "@/types/service";

interface UseUpsertServiceFormProps {
  onSuccess?: () => void;
  service?: Service;
}

export const useUpsertServiceForm = ({
  onSuccess,
  service,
}: UseUpsertServiceFormProps = {}) => {
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

  const { isSubmitting } = form.formState;

  async function onSubmit(data: z.infer<typeof upsertServiceSchema>) {
    try {
      if (isEditing && service) {
        await editService({ id: service.id, ...data });
        toast.add({
          type: "success",
          description: "Serviço editado com sucesso.",
        });
        return;
      }

      await createService(data);
      form.reset();

      toast.add({
        type: "success",
        description: "Serviço criado com sucesso.",
      });
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao salvar barbeiro:", error);
      toast.add({
        type: "error",
        description: "Erro ao salvar barbeiro.",
        priority: "high",
      });
    }
  }

  return { form, isSubmitting, onSubmit };
};
