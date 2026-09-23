import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { protectedApi, publicApi } from "@/lib/axios";
import type { Service } from "@/types/service";

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
