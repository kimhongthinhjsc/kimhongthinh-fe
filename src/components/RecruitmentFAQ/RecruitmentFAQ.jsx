import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Có bao nhiêu vòng phỏng vấn trực tiếp?",
    answer:
      "Số lượng vòng phỏng vấn sẽ tùy thuộc vào loại công việc và thâm niên của vị trí. Bạn sẽ được nhân viên tuyển dụng thông báo số vòng phỏng vấn. Hiring Manager của chúng tôi chỉ muốn hiểu rõ hơn về bạn và đây cũng sẽ là cơ hội để bạn hiểu hơn về Kim Hồng Thịnh cũng như vai trò của bạn trong công ty.",
  },
  {
    question: "Tôi sẽ nhận được phản hồi kết quả công việc trong bao lâu?",
    answer:
      "- Vòng screen CV: Nhân viên tuyển dụng sẽ liên hệ với bạn trong vòng 1-3 ngày nếu qua vòng duyệt CV của leader, nhân viên tuyển dụng sẽ trao đổi với bạn qua điện thoại về kỹ năng, kinh nghiệm của bạn và hẹn bạn lịch trao đổi với các Hiring Manager.\n- Vòng phỏng vấn trực tiếp: Kết quả trao đổi với Hiring Manager sẽ được phản hồi tới email của bạn hoặc nhân viên tuyển dụng liên hệ với bạn trong vòng 5 ngày.",
  },
  {
    question: "Tôi cần chuẩn bị gì khi tham gia phỏng vấn tại Kim Hồng Thịnh?",
    answer:
      "Chuẩn bị cho buổi phỏng vấn, bạn cần tìm hiểu về Kim Hồng Thịnh và vị trí ứng tuyển. Hiring Manager sẽ trao đổi sâu những kỹ năng, kinh nghiệm của bạn, bạn hãy chuẩn bị một số câu hỏi để hỏi về công việc và vai trò của bạn tại Kim Hồng Thịnh. Hãy tự tin và lựa chọn trang phục lịch sự, phù hợp với bạn.",
  },
];

export default function RecruitmentFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="recruitment_faq" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Title */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 md:mb-0">
              Câu hỏi <span className="text-blue-600">thường gặp</span>
            </h2>
          </div>

          {/* FAQ List */}
          <div className="md:col-span-2 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-4 text-left text-gray-800 font-medium hover:bg-gray-100"
                >
                  {faq.question}
                  <ChevronRight
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-90 text-blue-600" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4 text-gray-600 text-sm leading-relaxed"
                    >
                      {faq.answer.split("\n").map((line, i) => (
                        <p key={i} className="mb-2">
                          {line}
                        </p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
