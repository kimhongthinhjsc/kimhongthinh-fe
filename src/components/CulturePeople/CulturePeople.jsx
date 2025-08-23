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
    <section className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#EF5627] mb-6 sm:mb-8">
          {title}
        </h2>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {images.map((src, idx) => {
            const isBig = idx === 3; // Ảnh dài 2 cột (desktop/tablet)
            // order cho mobile
            let orderClass = "";
            if (idx === 0) orderClass = "order-1";
            if (idx === 1) orderClass = "order-2";
            if (idx === 2) orderClass = "order-3";
            if (idx === 4) orderClass = "order-4"; // ảnh số 5 lên trước ảnh 4
            if (idx === 3) orderClass = "order-5"; // ảnh số 4 xuống cuối

            return (
              <motion.div
                key={idx}
                className={`overflow-hidden rounded-xl shadow-md ${orderClass} sm:order-none`}
                variants={item}
                style={{
                  gridColumn: isBig ? "span 2" : "auto",
                }}
              >
                <div
                  className={`w-full ${
                    isBig
                      ? "h-44 sm:h-60 md:h-76 lg:h-92"
                      : "h-44 sm:h-60 md:h-76 lg:h-92"
                  }`}
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
