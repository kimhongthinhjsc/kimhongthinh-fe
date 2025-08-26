import React from "react";

export default function SomethingAbout({ data }) {
  if (!data) return null; // Chờ data load

  return (
    <section id="sdsc_something_about_sds" className="py-16 bg-gray-50">
      <div className="container mx-auto max-w-6xl px-6 md:px-12">
        {/* Tiêu đề */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {data.title}
          </h2>
          <p className="mt-4 text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* Nội dung */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          {/* Text */}
          <div className="flex flex-col justify-center">
            {data.paragraphs?.map((p, idx) => (
              <p
                key={idx}
                className="mt-4 text-gray-700 text-sm md:text-base leading-relaxed"
              >
                {p}
              </p>
            ))}

            {/* Highlight số liệu */}
            <div className="mt-8 grid grid-cols-2 gap-6">
              {data.stats?.map((stat) => (
                <div
                  key={stat._id}
                  className="bg-white shadow-md rounded-xl p-4 text-center"
                >
                  <h3 className="text-2xl font-bold text-blue-600">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center py-4">
            <img
              src={data.image}
              alt="Softdreams"
              className="
            w-full max-w-md 
            h-[360px] sm:h-[576px] md:h-[456px] 
            object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
