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
