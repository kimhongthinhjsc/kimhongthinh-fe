import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.25 } },
};

const item = {
  hidden: { opacity: 0, x: -80 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function CulturePeople({ data }) {
  if (!data) return null;
  const { title, images } = data;

  return (
    <section className="bg-gray-50 py-12 px-4 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-bold text-[#EF5627] mb-8">
          {title}
        </h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {images.map((src, idx) => {
            const isBig = idx === 3; // Ảnh dài 2 cột
            return (
              <motion.div
                key={idx}
                className={`overflow-hidden rounded-lg shadow`}
                variants={item}
                style={{ gridColumn: isBig ? "span 2" : "auto" }}
              >
                <div
                  className={`w-full ${isBig ? "h-64 md:h-80" : "aspect-square"}`}
                >
                  <img
                    src={src}
                    alt={`Ảnh ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
