// src/hooks/usePublic.js
import {
  useQuery,
} from "@tanstack/react-query";
import {
  fetchHomeData,
  getIntroduce,
  getAllService,
  getServiceByKeyword,
  getNewsList,
  getEventPast,
  getEventUpcoming,
} from "~/services/publicAPI";

// Trang chủ
export const useHome = () => {
  return useQuery({
    queryKey: ["home"],
    queryFn: fetchHomeData,
    keepPreviousData: true,
    staleTime: 0, //call khi quay lại trang
    cacheTime: 1000 * 60 * 2, // dữ liệu giữ trong cache 10 phút
  });
};

// Giới thiệu
export const useIntroduce = () => {
  return useQuery({
    queryKey: ["introduce"],
    queryFn: getIntroduce,
    keepPreviousData: true,
    staleTime: 0, //call khi quay lại trang
    cacheTime: 1000 * 60 * 2,
  });
};

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
export const useNews = ({ page, limit }) => {
  return useQuery({
    queryKey: ["news", page, limit],
    queryFn: () => getNewsList(page, limit),
    keepPreviousData: true, // giữ dữ liệu cũ khi chuyển trang
    staleTime: 0, //call khi quay lại trang
    cacheTime: 1000 * 60 * 1,
  });
};

// Trang chủ
export const useEventUpcoming = () => {
  return useQuery({
    queryKey: ["eventUpComing"],
    queryFn: getEventUpcoming,
    keepPreviousData: true,
    staleTime: 0, //call khi quay lại trang
    cacheTime: 1000 * 60 * 2, // dữ liệu giữ trong cache 10 phút
  });
};

// Trang chủ
export const useEventPast = () => {
  return useQuery({
    queryKey: ["eventPast"],
    queryFn: getEventPast,
    keepPreviousData: true,
    staleTime: 0, //call khi quay lại trang
    cacheTime: 1000 * 60 * 2, // dữ liệu giữ trong cache 10 phút
  });
};
