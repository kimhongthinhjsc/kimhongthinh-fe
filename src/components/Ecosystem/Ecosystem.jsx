import React from "react";

export default function Ecosystem({data}) {
  return (
    <section className=" py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#EF5627] mb-10">
          {data?.title }
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.items.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex items-center gap-4">
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-12 h-12 object-contain"
                />
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-[#363F69] group-hover:text-[#EF5627]">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-1">{item.desc}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
