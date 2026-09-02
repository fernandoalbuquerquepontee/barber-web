import { useQuery } from "@tanstack/react-query";

import { publicApi } from "@/lib/axios";
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
