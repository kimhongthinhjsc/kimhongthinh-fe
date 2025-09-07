import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCompanyProfile } from "~/services/publicAPI";
import { mockProfile } from "~/mock/mockProfile";

const CACHE_KEY = "companyProfile";
export const useCompanyInfo = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["companyProfile"],
    queryFn: async () => {
      const data = await getCompanyProfile();
      if (data) localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      return data;
    },
    initialData: () => {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) return JSON.parse(cached);
      return mockProfile; // fallback nếu chưa có localStorage
    },
    refetchOnMount: true, // ⚡ force gọi queryFn khi component mount
    refetchOnWindowFocus: false,
    staleTime: 0, // đặt 0 để queryFn có thể gọi refetch
  });
};
