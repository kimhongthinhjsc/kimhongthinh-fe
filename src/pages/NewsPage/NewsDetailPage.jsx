import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FramePage from "~/components/FramePage/FramePage";
import { getOneNews } from "~/services/publicAPI";
import NewsDetailSkeleton from "./NewsDetailSkeleton";
import DOMPurify from "dompurify";
import '@ckeditor/ckeditor5-build-classic/build/ckeditor';
import NotFoundPage from "../NotFoundPage/NotFoundPage";

export default function NewsDetailPage() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const data = await getOneNews(id);
      if (data.success == false) {
        setLoading(false);
        return;
      }
      setNews(data.news);
      setLoading(false);
    };
    fetchNews();
  }, [id]);

  if (loading)
    return (
      <FramePage>
        <NewsDetailSkeleton />
      </FramePage>
    );

  if (!news) return <NotFoundPage />;

  return (
    <FramePage>
      <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-[#EF5627] leading-snug">
          {news.title}
        </h1>

        {/* Meta info */}
        <div className="text-sm text-gray-500 space-x-3">
          <span>👤 {news.author}</span>
          <span>
            📅 {new Date(news.createdAt).toLocaleDateString("vi-VN")}
          </span>
        </div>
        {/* Content */}
        {news.content && (
          <div
            className="ck-content "
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(news.content, {
                USE_PROFILES: { html: true }, // giữ thẻ table, tr, td
              })
            }}
          />
        )}
      </article>
    </FramePage>
  );
}
