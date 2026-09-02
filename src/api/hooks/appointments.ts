import { useQuery } from "@tanstack/react-query";

import { protectedApi } from "@/lib/axios";

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
