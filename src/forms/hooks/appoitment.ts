import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import z from "zod";

import { useCreateAppointment } from "@/api/hooks/appointments";
import { authClient } from "@/lib/auth-client";

import { createAppointmentSchema } from "../schemas/appointment";

export const useCreateAppointmentForm = () => {
  const { mutateAsync: createAppointment } = useCreateAppointment();
  const { data: session } = authClient.useSession();

  const form = useForm<z.infer<typeof createAppointmentSchema>>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: {
      date: format(new Date(), "yyyy-MM-dd"),
      hour: "",
      barberId: "",
      serviceId: "",
    },
  });

  async function onSubmit(data: z.infer<typeof createAppointmentSchema>) {
    if (!session?.user?.id) {
      console.error("Usuário não está logado!");
      return;
    }

    const payload = {
      ...data,
      userId: session?.user.id,
      status: "PENDING",
    };
    await createAppointment(payload);
  }

  return { form, onSubmit };
};
