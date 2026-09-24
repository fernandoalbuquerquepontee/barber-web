import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type z from "zod";

import type { createBarberSchema } from "@/forms/schemas/barber";
import { protectedApi, publicApi } from "@/lib/axios";
import type { Service } from "@/types/service";

type CreateBarberInput = z.infer<typeof createBarberSchema>;
type UpdateBarberInput = z.infer<typeof createBarberSchema> & { id: string };

export const useGetAvailableBarbers = () => {
  return useQuery({
    queryKey: ["barbers"],
    queryFn: async () => {
      const response = await publicApi.get("/barbers");

      return response.data;
    },
  });
};

export const useGetServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await publicApi.get<Service[]>("/barbers/services");

      return response.data;
    },
  });
};

export const useDeleteBarber = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-barber"],
    mutationFn: async (userId: string | undefined) => {
      const response = await protectedApi.delete(`/barbers/${userId}`);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["barbers"] });
    },
  });
};

export const useCreateBarber = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-barber"],
    mutationFn: async (data: CreateBarberInput) => {
      const response = await protectedApi.post("/barbers", data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["barbers"] });
    },
  });
};

export const useUpdateBarber = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-barber"],
    mutationFn: async ({ id, ...data }: UpdateBarberInput) => {
      const response = await protectedApi.patch(`/barbers/${id}`, data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["barbers"] });
    },
  });
};
