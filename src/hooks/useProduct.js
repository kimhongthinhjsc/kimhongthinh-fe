import {
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  fetchProducts,
  searchProductsbyKeyword,
} from "~/services/publicAPI";
import { getCategories } from "~/services/categorieAPI";


export const useProducts = ({ page, limit, categoryId, keyword }) => {
  const queryClient = useQueryClient(); // ⚡ cần khai báo ở đây

  return useQuery({
    queryKey: ["products", { page, categoryId, keyword }],
    queryFn: async () => {
      if (keyword) {
        return searchProductsbyKeyword({ keyword, page, limit });
      }
      return fetchProducts(page, limit, categoryId);
    },
    keepPreviousData: true, // giữ data cũ khi page đổi
    staleTime: 0, //call khi quay lại trang
    cacheTime: 1000 * 60 * 60, // 1 giờ
    initialData: () => {
      // lấy cache từ queryClient nếu có
      const cached = queryClient.getQueryData([
        "products",
        { page, categoryId, keyword },
      ]);
      return cached || undefined;
    },
  });
};
export const useProductsInfinite = ({ limit = 8, categoryId, keyword }) => {
  return useInfiniteQuery({
    queryKey: ["products", { categoryId, keyword }],
    queryFn: async ({ pageParam = 1 }) => {
      if (keyword) return searchProductsbyKeyword({ keyword, page: pageParam, limit });
      return fetchProducts(pageParam, limit, categoryId);
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.products.length < limit) return undefined;
      return allPages.length + 1;
    },
    keepPreviousData: true,
    staleTime: 0,
    cacheTime: 1000 * 60 * 60,
  });
};

export const useCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    keepPreviousData: true,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60,
  });
};