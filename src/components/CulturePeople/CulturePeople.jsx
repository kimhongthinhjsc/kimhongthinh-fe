import React from "react";

export default function CulturePeople({ data }) {
  if (!data) return null;
  console.log(data);

  const { title, images } = data;

  return (
    <section className="bg-gray-50 py-12 px-4 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-bold text-[#EF5627] mb-8">
          {title}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Ảnh 1, 2, 3 (vuông) */}
          {images.slice(0, 3).map((src, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-lg shadow hover:shadow-lg transition aspect-square"
            >
              <img
                src={src}
                alt={`Ảnh ${idx + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}

          {/* Ảnh 4 (dài 2 cột) */}
          {images[3] && (
            <div className="col-span-2 overflow-hidden rounded-lg shadow hover:shadow-lg transition">
              <img
                src={images[3]}
                alt="Ảnh 4"
                className="w-full h-40 md:h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          {/* Ảnh 5 (vuông) */}
          {images[4] && (
            <div className="overflow-hidden rounded-lg shadow hover:shadow-lg transition aspect-square">
              <img
                src={images[4]}
                alt="Ảnh 5"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
