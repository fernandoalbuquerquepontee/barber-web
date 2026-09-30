import { useQuery } from "@tanstack/react-query";

import { protectedApi } from "@/lib/axios";

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
