// src/hooks/usePublic.js
import { useQuery } from "@tanstack/react-query";
import {
  fetchHomeData,
  getIntroduce,
  fetchProducts,
  searchProductsbyKeyword,
  getAllService,
  getServiceByKeyword,
  getNewsList 
} from "~/services/publicAPI";

// Trang chủ
export const useHome = () => {
  return useQuery({
    queryKey: ["home"],
    queryFn: fetchHomeData,
    staleTime: 1000 * 60 * 1, // dữ liệu giữ tươi 5 phút
    cacheTime: 1000 * 60 * 2, // dữ liệu giữ trong cache 10 phút
  });
};

// Giới thiệu
export const useIntroduce = () => {
  return useQuery({
    queryKey: ["introduce"],
    queryFn: getIntroduce,
    staleTime: 1000 * 60 * 1,
    cacheTime: 1000 * 60 * 2,
  });
};

// Sản phẩm
export const useProducts = ({ page, limit, categoryId, keyword }) => {
  return useQuery({
    queryKey: ["products", { page, limit, categoryId, keyword }],
    queryFn: async () => {
      if (keyword) {
        return searchProductsbyKeyword({ keyword, page, limit });
      }
      return fetchProducts(page, limit, categoryId);
    },
    keepPreviousData: true, // giữ data cũ khi chuyển trang
    staleTime: 0, // luôn fresh khi đổi filter
    cacheTime: 1000 * 60 * 1,
  });
};
export const useServices = ({ keyword, page, limit = 12 }) => {
  return useQuery({
    queryKey: ["services", { keyword, page, limit }],
    queryFn: async () => {
      if (!keyword || keyword.trim() === "") {
        // không có keyword → lấy tất cả
        const data = await getAllService();
        return { services: data.services || [], totalPages: 1 };
      }
      // có keyword → search
      return getServiceByKeyword(keyword, page, limit);
    },
    keepPreviousData: true,
    staleTime: 0,
    cacheTime: 1000 * 60 * 1,
  });
};
export const useNews = ({ page, limit }) => {
  return useQuery({
    queryKey: ["news", page, limit],
    queryFn: () => getNewsList(page, limit),
    keepPreviousData: true, // giữ dữ liệu cũ khi chuyển trang
    staleTime: 1000 * 30,   // tin tức có thể đổi nhưng không quá nhanh
    cacheTime: 1000 * 60 * 1,
  });
};