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
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["products", { page, categoryId, keyword }],
    queryFn: async () => {
      if (keyword) {
        return searchProductsbyKeyword({ keyword, page, limit });
      }
      return fetchProducts(page, limit, categoryId);
    },
    staleTime: 1000 * 60 * 5, // Cache 5 phút
    cacheTime: 1000 * 60 * 60,
  });
};

export const useProductsInfinite = ({ limit = 8, categoryId, keyword }) => {
  return useInfiniteQuery({
    // Đảm bảo queryKey phản ánh chính xác khi filter thay đổi
    queryKey: ["products-infinite", { categoryId: categoryId || "all", keyword: keyword || "" }],
    queryFn: async ({ pageParam = 1 }) => {
      if (keyword) {
        return searchProductsbyKeyword({ keyword, page: pageParam, limit });
      }
      return fetchProducts(pageParam, limit, categoryId);
    },
    getNextPageParam: (lastPage, allPages) => {
      // Kiểm tra an toàn xem mảng products có tồn tại hay không
      const products = lastPage?.products || [];
      if (products.length < limit) return undefined;
      return allPages.length + 1;
    },
    staleTime: 0,
    cacheTime: 1000 * 60 * 5,
    // Loại bỏ keepPreviousData để reset sạch trang khi đổi category
  });
};

export const useCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60,
  });
};