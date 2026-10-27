// RecruitmentProcess.jsx
export default function RecruitmentProcess() {
  const steps = [
    {
      img: "https://softdreams.vn/wp-content/uploads/2024/07/Group-2609357.png",
      title: "Bước 1: Screen CV",
      desc: "Bộ phận tuyển dụng và leader team sẽ đánh giá sơ bộ CV ứng tuyển của bạn và trao đổi các thông tin cần thiết qua điện thoại.",
    },
    {
      img: "https://softdreams.vn/wp-content/uploads/2024/07/Group-2609358.png",
      title: "Bước 2: Test",
      desc: "Các bài test sẽ áp dụng với các khối Kỹ thuật, bạn sẽ thực hiện bài test online, nội dung test sẽ được gửi tới mail của bạn.",
    },
    {
      img: "https://softdreams.vn/wp-content/uploads/2024/07/Group-2609359.png",
      title: "Bước 3: Phỏng vấn",
      desc: "Giám đốc Khối/ Trưởng bộ phận/ Chuyên viên/ HR sẽ phỏng vấn bạn để đánh giá về kỹ năng, kinh nghiệm, chuyên môn và sự phù hợp công việc với vị trí ứng tuyển và văn hóa của Kim Hồng Thịnh.",
    },
    {
      img: "https://softdreams.vn/wp-content/uploads/2024/07/Group-2609360.png",
      title: "Bước 4: Offer & Onboarding",
      desc: "Chuyên viên tuyển dụng của Kim Hồng Thịnh sẽ liên hệ với bạn để trao đổi về thỏa thuận mức lương, cơ chế đãi ngộ và thời gian bắt đầu công việc tại Kim Hồng Thịnh.",
    },
  ];

  return (
    <section id="recruitment_process" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Tiêu đề */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            Quy trình <span className="text-blue-600">tuyển dụng</span>
          </h2>
        </div>

        {/* Danh sách 4 bước */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="process-box bg-white rounded-2xl shadow-md p-6 relative flex flex-col items-center"
            >
              {/* Icon */}
              <div className="text-center mb-4">
                <img src={step.img} alt={step.title} className="mx-auto h-20" />
              </div>

              {/* Tiêu đề */}
              <h3 className="text-xl font-semibold text-blue-600 text-center">
                {step.title}
              </h3>

              {/* Nội dung mô tả */}
              <p className="text-gray-600 text-lg mt-3 text-center leading-relaxed">
                {step.desc}
              </p>

              {/* Mũi tên nguyên bản (không dùng rotate) chỉ chuẩn từ TRÁI -> PHẢI */}
              {idx < steps.length - 1 && (
                <img
                  src="https://softdreams.vn/wp-content/uploads/2024/07/heroicons-solid_arrow-up.png"
                  alt="arrow"
                  className="absolute -right-7 top-1/2 -translate-y-1/2 z-20 hidden lg:block h-8 w-8 object-contain"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}