import React from "react";
import "./Partners.scss"; // Import custom styles

export default function Partners({ data }) {
  if (!data) return null;

  const { title, images } = data;
  return (
    <section className="bg-gray-50 py-12 px-4 md:px-8 overflow-hidden">
      <div className="w-full text-center">
        <h2 className="text-xl md:text-2xl font-bold text-[#EF5627] mb-10">
          {title}
        </h2>

        {/* Row 1 */}
        <div className="relative flex overflow-hidden mb-8">
          <div className="flex animate-marquee space-x-10">
            {images.concat(images).map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center w-48 h-24 bg-white rounded-xl shadow-md"
              >
                <img
                  src={logo}
                  alt={`Partner ${i}`}
                  className="h-14 object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee-reverse space-x-10">
            {images.concat(images).map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center w-48 h-24 bg-white rounded-xl shadow-md"
              >
                <img
                  src={logo}
                  alt={`Partner ${i}`}
                  className="h-14 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
