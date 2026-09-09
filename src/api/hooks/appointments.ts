import { useMutation, useQuery } from "@tanstack/react-query";

import { protectedApi } from "@/lib/axios";
import type { Barber } from "@/types/barber";

interface AppointmentProps {
  serviceId: string;
  userId: string;
  barberId: string;
  date: string;
  status: string;
}

export const useCreateAppointment = () => {
  return useMutation({
    mutationKey: ["create-appointment"],
    mutationFn: async (data: AppointmentProps) => {
      const response = await protectedApi.post("/appointments", data);

      return response.data;
    },
  });
};

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
