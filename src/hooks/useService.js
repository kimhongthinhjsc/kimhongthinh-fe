import { useQuery } from "@tanstack/react-query";
import { getAllService, getServiceByKeyword } from "~/services/publicAPI";
export const useServices = ({ keyword, page, limit = 12 }) => {
  return useQuery({
    queryKey: ["services", { keyword, page, limit }],
    queryFn: async () => {
      if (!keyword || keyword.trim() === "") {
        const data = await getAllService();
        const totalPages = Math.ceil((data.services?.length || 0) / limit);
        const start = (page - 1) * limit;
        const end = start + limit;
        return { services: data.services.slice(start, end), totalPages };
      }
      return getServiceByKeyword(keyword, page, limit);
    },
    keepPreviousData: true,
    staleTime: 0, //call khi quay lại trang
    cacheTime: 1000 * 60 * 10, // 10 phút
  });
};
