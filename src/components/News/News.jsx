import React from "react";
import newsList from "~/mock/NewsList.js";

export default function News({ data }) {
    if (!data) return null;
  return (
    <section className=" py-12 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-[#EF5627] mb-8 text-center">
          Tin tức & Sự kiện
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bên trái: bài nổi bật */}
          <a
            href={newsList[0].url}
            className="block bg-white rounded-xl shadow-md  transition overflow-hidden"
          >
            <img
              src={newsList[0].img}
              alt={newsList[0].title}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              
            />
            <div className="p-6">
              <h3 className="text-lg font-bold text-[#363F69] mb-3">
                {newsList[0].title}
              </h3>
              <p className="text-gray-600 mb-3">{newsList[0].desc}</p>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <i className="fa-solid fa-calendar"></i> {newsList[0].date}
              </div>
            </div>
          </a>

          {/* Bên phải: 3 bài nhỏ */}
          <div className="flex flex-col gap-6">
            {newsList.slice(1).map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                className="flex gap-4 bg-white rounded-xl shadow-md  transition overflow-hidden"
              >
                <div className="w-28 h-28 shrink-0 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-between py-2">
                  <h4 className="text-base font-semibold text-[#363F69] line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.desc}
                  </p>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <i className="fa-solid fa-calendar"></i> {item.date}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
