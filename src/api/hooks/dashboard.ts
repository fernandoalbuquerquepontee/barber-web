import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type z from "zod";

import type { UpsertServiceDialog } from "@/components/upsert-service-dialog";
import { protectedApi } from "@/lib/axios";
import type { Appointment } from "@/types/appointment";
import type { TeamPerformance } from "@/types/dashboard";
import type { Service } from "@/types/service";

export interface DailyRevenue {
  date: string;
  revenue: number;
}

export type DaySchedule = {
  dayOfWeek: number;
  label: string;
  startTime: string;
  endTime: string;
  isClosed: boolean;
};

type UpdateServiceInput = z.infer<typeof UpsertServiceDialog> & { id: string };

export const useGetMetrics = () => {
  return useQuery({
    queryKey: ["get-metrics"],
    queryFn: async () => {
      const response = await protectedApi.get("/dashboard/metrics");

      return response.data;
    },
  });
};

export const useRevenueMonthly = () => {
  return useQuery({
    queryKey: ["get-revenue-monthly"],
    queryFn: async () => {
      const response = await protectedApi.get("/dashboard/revenue/monthly");

      return response.data;
    },
  });
};

export const useRevenueAnnual = () => {
  return useQuery({
    queryKey: ["get-revenue-annual"],
    queryFn: async () => {
      const response = await protectedApi.get("/dashboard/revenue/annual");

      return response.data;
    },
  });
};

export const useGetTeamPerformance = () => {
  return useQuery({
    queryKey: ["get-team-performance"],
    queryFn: async () => {
      const response = await protectedApi.get<TeamPerformance[]>(
        "/dashboard/team-performance",
      );

      return response.data;
    },
  });
};

export function useDailyRevenue(range: string) {
  return useQuery({
    queryKey: ["daily-revenue", range],
    queryFn: async () => {
      const response = await protectedApi.get<DailyRevenue[]>(
        "/dashboard/revenue/perDay",
        {
          params: { range },
        },
      );
      return response.data;
    },
  });
}

export const useGetSchedule = () => {
  return useQuery({
    queryKey: ["get-schedule"],
    queryFn: async () => {
      const response = await protectedApi.get<DaySchedule[]>(
        "/dashboard/schedule",
      );
      return response.data;
    },
  });
};

export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (schedules: DaySchedule[]) => {
      const response = await protectedApi.put("/dashboard/schedule", {
        schedules,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["availability"] });
      queryClient.invalidateQueries({ queryKey: ["get-schedule"] });
    },
  });
};

export const useGetAppointments = () => {
  return useQuery({
    queryKey: ["get-appointments"],
    queryFn: async () => {
      const response = await protectedApi.get<Appointment[]>(
        "/dashboard/appointments",
      );
      return response.data;
    },
  });
};

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (appointmentId: string) => {
      const response = await protectedApi.delete(
        `/dashboard/appointments/${appointmentId}`,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-appointments"] });
    },
  });
};

export const useGetServices = () => {
  return useQuery({
    queryKey: ["get-services"],
    queryFn: async () => {
      const response = await protectedApi.get<Service[]>("/dashboard/services");
      return response.data;
    },
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<Service, "id">) => {
      const response = await protectedApi.post("/dashboard/services", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-services"] });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateServiceInput) => {
      const response = await protectedApi.patch(`/dashboard/services/${id}`, {
        ...data,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-services"] });
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await protectedApi.delete(`/dashboard/services/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-services"] });
    },
  });
};
