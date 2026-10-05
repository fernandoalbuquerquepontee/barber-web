import { useQuery } from "@tanstack/react-query";

import { protectedApi } from "@/lib/axios";
import type { TeamPerformance } from "@/types/dashboard";

export interface DailyRevenue {
  date: string;
  revenue: number;
}

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
