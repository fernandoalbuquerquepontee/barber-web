import z from "zod";

export const createAppointmentSchema = z.object({
  date: z.string(),
  hour: z.string(),
  barberId: z.string().min(1, "Selecione um barbeiro."),
  serviceId: z.string().min(1, "Selecione um serviço."),
});
