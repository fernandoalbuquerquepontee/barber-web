import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { protectedApi } from "@/lib/axios";
import type { Appointment, CreateAppointmentInput } from "@/types/appointment";
import type { Barber } from "@/types/barber";

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-appointment"],
    mutationFn: async (data: CreateAppointmentInput) => {
      const response = await protectedApi.post("/appointments", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-appointment-history"],
      });
      queryClient.invalidateQueries({
        queryKey: ["available-hours"],
      });
      queryClient.invalidateQueries({
        queryKey: ["available-barbers"],
      });
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

export const useGetAllUserAppointments = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["get-appointment-history", userId],
    queryFn: async () => {
      const response = await protectedApi.get<Appointment[]>(
        `/appointments/${userId}`,
      );
      return response.data;
    },
  });
};
