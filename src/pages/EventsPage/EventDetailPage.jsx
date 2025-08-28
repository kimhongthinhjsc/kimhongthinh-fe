import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneEvent } from "~/services/publicAPI";
import NewsDetailSkeleton from "./EventDetailSkeleton";
import DOMPurify from "dompurify";
import '@ckeditor/ckeditor5-build-classic/build/ckeditor';
import NotFoundPage from "../NotFoundPage/NotFoundPage";

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      const data = await getOneEvent(id);
      if (data.success == false) {
        setLoading(false);
        return;
      }
      setEvent(data.event);
      setLoading(false);
    };
    fetchEvent();
  }, [id]);

  if (loading)
    return (
      <>
        <NewsDetailSkeleton />
      </>
    );

  if (!event) return <NotFoundPage />;

  return (
    <>
      <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-[#EF5627] leading-snug">
          {event.title}
        </h1>

        {/* Meta info */}
        <div className="text-sm text-gray-500 space-y-2">
          {/* Thông tin cập nhật */}
          <div className="space-x-3">
            <span>📅 Cập nhật: {new Date(event.updatedAt).toLocaleDateString("vi-VN")}</span>
          </div>

          {/* Box nổi bật cho sự kiện */}
          <div className="event-highlight-box">
            {event.date && (() => {
              const eventDate = new Date(event.date);
              const now = new Date();
              const diffTime = eventDate.getTime() - now.getTime();

              let countdownText = "";
              if (diffTime <= 0) {
                countdownText = "⏳ Sự kiện đã diễn ra";
              } else {
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                const diffMonths = Math.floor(diffDays / 30);
                const diffYears = Math.floor(diffDays / 365);

                if (diffYears >= 1) {
                  countdownText = `⏳ Còn ${diffYears} năm ${diffMonths % 12} tháng ${diffDays % 30} ngày nữa`;
                } else if (diffMonths >= 1) {
                  countdownText = `⏳ Còn ${diffMonths} tháng ${diffDays % 30} ngày nữa`;
                } else {
                  countdownText = `⏳ Còn ${diffDays} ngày nữa`;
                }
              }
              return (
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-[#EF5627]">🗓️ Ngày diễn ra:</span>
                    <span className="text-gray-800">{eventDate.toLocaleDateString("vi-VN")}</span>
                  </div>
                  <div className="text-sm text-gray-600 italic ml-6">
                    {countdownText}
                  </div>
                </div>
              );
            })()}
            {event.location && (
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-[#EF5627]">📍 Địa điểm:</span>
                <span className="text-gray-800">{event.location}</span>
              </div>
            )}
            {event.author && (
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-[#EF5627]">👥 Người tham gia:</span>
                <span className="text-gray-800">{event.author}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        {event.content && (
          <div
            className="ck-content"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(event.content, {
                USE_PROFILES: { html: true },
              }),
            }}
          />
        )}
      </article >
    </>
  );
}
