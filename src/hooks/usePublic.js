// src/hooks/usePublic.js
import { useQuery } from "@tanstack/react-query";
import {
  fetchHomeData,
  getIntroduce,
  getNewsList,
  getEventPast,
  getEventUpcoming,
  getCareerList,
} from "~/services/publicAPI";

import { mockHome } from "~/mock/mockHome";
import { mockIntroduce } from "~/mock/mockIntroduce";

// --------------------------------------
// Helper lưu localStorage
const setCache = (key, data) => {
  if (data) localStorage.setItem(key, JSON.stringify(data));
};

const getCache = (key) => {
  const cached = localStorage.getItem(key);
  return cached ? JSON.parse(cached) : undefined;
};

// --------------------------------------
// Trang chủ
export const useHome = () => {
  const CACHE_KEY = "home";
  return useQuery({
    queryKey: ["home"],
    queryFn: async () => {
      const data = await fetchHomeData();
      setCache(CACHE_KEY, data);
      return data;
    },
    initialData: () => getCache(CACHE_KEY) || mockHome,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};

// Giới thiệu
export const useIntroduce = () => {
  const CACHE_KEY = "introduce";
  return useQuery({
    queryKey: ["introduce"],
    queryFn: async () => {
      const data = await getIntroduce();
      setCache(CACHE_KEY, data);
      return data;
    },
    initialData: () => getCache(CACHE_KEY) || mockIntroduce,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};

// Tin tức
export const useNews = ({ page, limit }) => {
  const CACHE_KEY = `news_${page}_${limit}`;
  return useQuery({
    queryKey: ["news", page, limit],
    queryFn: async () => {
      const data = await getNewsList(page, limit);
      setCache(CACHE_KEY, data);
      return data;
    },
    initialData: () => getCache(CACHE_KEY),
    placeholderData: undefined,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};

// Sự kiện sắp tới
export const useEventUpcoming = () => {
  const CACHE_KEY = "eventUpcoming";
  return useQuery({
    queryKey: ["eventUpcoming"],
    queryFn: async () => {
      const data = await getEventUpcoming();
      setCache(CACHE_KEY, data);
      return data;
    },
    initialData: () => getCache(CACHE_KEY),
    placeholderData: undefined,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};

// Sự kiện đã diễn ra
export const useEventPast = () => {
  const CACHE_KEY = "eventPast";
  return useQuery({
    queryKey: ["eventPast"],
    queryFn: async () => {
      const data = await getEventPast();
      setCache(CACHE_KEY, data);
      return data;
    },
    initialData: () => getCache(CACHE_KEY),
    placeholderData: undefined,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};

// Danh sách công việc / Careers
export const useCareerList = (currentPage, jobsPerPage) => {
  const CACHE_KEY = `careerList_${currentPage}_${jobsPerPage}`;
  return useQuery({
    queryKey: ["careerList", currentPage, jobsPerPage],
    queryFn: async () => {
      const data = await getCareerList(currentPage, jobsPerPage);
      setCache(CACHE_KEY, data);
      return data;
    },
    initialData: () => getCache(CACHE_KEY),
    placeholderData: undefined,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};
