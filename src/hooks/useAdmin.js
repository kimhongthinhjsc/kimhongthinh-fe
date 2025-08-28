// src/hooks/useAdmin.js
import { fetchStatsVisits,updateCompanyProfile } from "~/services/adminAPI";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCompanyProfile } from "~/services/publicAPI";


export const useStatsVisits = () => {
  return useQuery({
    queryKey: ["statsVisits"],
    queryFn: fetchStatsVisits,
    staleTime: 1000 * 60 * 1, // giữ tươi 1 phút
    cacheTime: 1000 * 60 * 5, // cache 5 phút
    retry: 1, // thử lại 1 lần nếu lỗi
  });
};

export const useCompanyProfile = () => {
  const queryClient = useQueryClient();
  // Lấy dữ liệu
  const { data, isLoading, error } = useQuery({
    queryKey: ["companyProfile"],
    queryFn: getCompanyProfile,
    staleTime: 1000 * 60 * 5, // 5 phút
    cacheTime: 1000 * 60 * 10, // 10 phút
  });

  // Mutation để update
  const mutation = useMutation(updateCompanyProfile, {
    onSuccess: (updated) => {
      // Cập nhật cache
      queryClient.setQueryData(["companyProfile"], updated);
    },
  });

  return { data, isLoading, error, updateProfile: mutation.mutateAsync };
};
