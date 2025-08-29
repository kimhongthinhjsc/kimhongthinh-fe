import React from "react";

const whyData = [
  {
    img: "https://softdreams.vn/wp-content/uploads/2024/07/Frame.png",
    title: "Môi trường tuyệt vời",
    items: [
      "Trung bình độ tuổi nhân sự: 24+",
      "Các hoạt động nổi trội, sự kiện tổ chức thường xuyên",
      "Ngày nghỉ phép: 12 ngày/năm",
      "Nghỉ Lễ, Tết theo quy định",
    ],
  },
  {
    img: "https://softdreams.vn/wp-content/uploads/2024/07/Frame-1.png",
    title: "Phúc lợi",
    items: [
      "Quà sinh nhật",
      "BHXH và BHYT theo quy định",
      "Hỗ trợ ăn trưa và vé xe, chi phí công tác",
      "Cung cấp thiết bị làm việc",
      "Teambuilding, nghỉ mát, CLB tổ chức hội thao hàng năm",
    ],
  },
  {
    img: "https://softdreams.vn/wp-content/uploads/2024/07/Frame-2.png",
    title: "Chế độ lương hấp dẫn",
    items: [
      "Mức lương cạnh tranh",
      "Lương tháng 13, thưởng dự án",
      "Thưởng các dịp lễ tết 30/04, 02/09, sinh nhật",
      "Review lương 2 lần/năm",
    ],
  },
  {
    img: "https://softdreams.vn/wp-content/uploads/2024/07/Frame-3.png",
    title: "Học hỏi - Phát triển - Thăng tiến",
    items: [
      "Các lớp chuyên môn, kỹ năng mềm được triển khai",
      "Văn hóa trao đổi thẳng thắn, hỗ trợ nhiệt tình",
      "Sếp trẻ tâm lý, đồng nghiệp thân thiện",
      "Khuyến khích sự chủ động và tích cực học hỏi",
      "Cơ hội thăng tiến và thu nhập phù hợp tùy vào chuyên môn",
      "Tạo điều kiện rèn luyện mọi lúc mọi nơi, đồng hành phát triển cá nhân",
    ],
  },
];

export default function WhySoftdreams() {
  return (
    <section id="why_softdreams" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Tại sao nên chọn <span className="text-blue-600">Kim Hồng Thịnh?</span>
        </h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Kim Hồng Thịnh không chỉ là nơi làm việc, đây là hành trình khám phá vô số
          cơ hội sáng tạo và trải nghiệm phúc lợi độc đáo, nơi mỗi thành viên
          được đón nhận và phát triển toàn diện trong một môi trường ấm cúng và
          đầy năng lượng.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyData.map((box, index) => (
            <div
              key={index}
              className="bg-gray-50 shadow-md rounded-2xl p-6 flex flex-col"
            >
              <div className="text-center mb-4">
                <img src={box.img} alt={box.title} className="mx-auto h-20" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                {box.title}
              </h3>
              <ul className="space-y-3">
                {box.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-600">
                    <img
                      src="https://softdreams.vn/wp-content/uploads/2024/07/lets-icons_check-round-fill.png"
                      alt="check"
                      className="h-5 w-5"
                    />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
