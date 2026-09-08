import { useQuery } from "@tanstack/react-query";

import { protectedApi } from "@/lib/axios";
import type { Barber } from "@/types/barber";

export const useGetAvailableHours = (date: string) => {
  return useQuery({
    queryKey: ["available-hours", date],
    queryFn: async () => {
      const response = await protectedApi.get("/appointments/hours", {
        params: {
          date: date,
        },
      });

      return response.data;
    },
  });
};

export const useGetAvailableBarbers = (date: string, time: string | null) => {
  return useQuery({
    queryKey: ["available-barbers", date, time],
    queryFn: async () => {
      const response = await protectedApi.get<Barber[]>(
        "/appointments/available-barbers",
        {
          params: {
            date: date,
            time: time,
          },
        },
      );

      return response.data;
    },

    enabled: !!date && !!time,
  });
};
