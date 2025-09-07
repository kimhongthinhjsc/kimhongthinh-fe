// Activities.jsx
import React from "react";
import { motion } from "framer-motion";

export default function Activities() {
  const activities = [
    {
      img: "https://softdreams.vn/wp-content/uploads/2024/07/team-building.jpg",
      title: "Team Building",
      desc: "Gắn kết tinh thần đồng đội qua những chuyến du lịch và trò chơi tập thể.",
    },
    {
      img: "https://softdreams.vn/wp-content/uploads/2024/07/company-party.jpg",
      title: "Company Party",
      desc: "Các buổi tiệc sinh nhật, cuối năm, lễ hội để cùng nhau vui chơi và sẻ chia.",
    },
    {
      img: "https://softdreams.vn/wp-content/uploads/2024/07/training.jpg",
      title: "Đào tạo & Workshop",
      desc: "Các khóa học chuyên môn, kỹ năng mềm được tổ chức thường xuyên.",
    },
    {
      img: "https://softdreams.vn/wp-content/uploads/2024/07/charity.jpg",
      title: "Hoạt động thiện nguyện",
      desc: "Chung tay cùng cộng đồng qua các chương trình từ thiện, quyên góp.",
    },
  ];

  return (
    <section id="activities" className="py-16 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">
          Hoạt động <span className="text-blue-600">nổi bật</span>
        </h2>
        <p className="text-gray-600 mt-3">
          Kim Hồng Thịnh luôn mang đến những trải nghiệm ý nghĩa, gắn kết tập thể
          và khuyến khích phát triển cá nhân.
        </p>
      </div>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {activities.map((act, idx) => (
          <motion.div
            key={idx}
            className="relative rounded-2xl overflow-hidden shadow-lg group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
          >
            {/* Ảnh */}
            <img
              src={act.img}
              alt={act.title}
              className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-center items-center text-center p-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                {act.title}
              </h3>
              <p className="text-sm text-gray-200">{act.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
