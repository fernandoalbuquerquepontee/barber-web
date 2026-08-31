import { useQuery } from "@tanstack/react-query";

import { publicApi } from "@/lib/axios";

export const useGetAvailableBarbers = () => {
  return useQuery({
    queryKey: ["barbers"],
    queryFn: async () => {
      const response = await publicApi.get("/barbers");

      return response.data;
    },
  });
};
