// src/hooks/usePrefetchPublic.js
import { queryClient } from "~/main";
import {
  fetchHomeData,
  getIntroduce,
  fetchProducts,
  getAllService,
  getNewsList,
} from "~/services/publicAPI";

export async function prefetchPublicData() {
  try {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ["home"],
        queryFn: fetchHomeData,
      }),
      queryClient.prefetchQuery({
        queryKey: ["introduce"],
        queryFn: getIntroduce,
      }),
      queryClient.prefetchQuery({
        queryKey: [
          "products",
          { page: 1, limit: 10, categoryId: null, keyword: "" },
        ],
        queryFn: () => fetchProducts(1, 10, null),
      }),
      queryClient.prefetchQuery({
        queryKey: ["services", { keyword: "", page: 1, limit: 12 }],
        queryFn: getAllService,
      }),
      queryClient.prefetchQuery({
        queryKey: ["news", 1, 6],
        queryFn: () => getNewsList(1, 6),
      }),
    ]);
    console.log("✅ Prefetch public data xong!");
  } catch (err) {
    console.error("❌ Prefetch lỗi:", err);
  }
}
