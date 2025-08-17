export default function SomethingAbout() {
  return (
    <section id="sdsc_something_about_sds" className="py-16 bg-gray-50">
      <div className="container mx-auto max-w-6xl px-6 md:px-12">
        {/* Tiêu đề */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Đôi nét về <span className="text-blue-600">Softdreams</span>
          </h2>
          <p className="mt-4 text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Nâng tầm quản trị doanh nghiệp với các giải pháp công nghệ thông minh.
          </p>
        </div>

        {/* Nội dung */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              <span className="font-semibold text-blue-600">Softdreams</span> là công ty công nghệ chuyên cung cấp các phần mềm thông minh giúp tự động hóa trong quản trị doanh nghiệp.
            </p>
            <p className="mt-4 text-gray-700 text-sm md:text-base leading-relaxed">
              Với hơn <span className="font-semibold">11 năm kinh nghiệm</span>, công ty đã phát triển thành công{" "}
              <span className="font-semibold">12+ sản phẩm</span> trong hệ sinh thái gồm:{" "}
              <span className="text-blue-600">
                EasyInvoice, EasyCA, EasyBooks, EasyHRM, EasyPos, EasyDocs, EasyTransport, EasyPIT, EasyTicket, EasyKYC,...
              </span>
            </p>
            <p className="mt-4 text-gray-700 text-sm md:text-base leading-relaxed">
              Với phương châm đặt khách hàng làm trung tâm,{" "}
              <span className="font-semibold text-blue-600">Softdreams</span> hướng đến xây dựng sự tin tưởng của khách hàng
              vào sản phẩm tiện ích, dễ dùng cùng sự phục vụ chu đáo, luôn lắng nghe, thấu hiểu.
            </p>

            {/* Highlight số liệu */}
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="bg-white shadow-md rounded-xl p-4 text-center">
                <h3 className="text-2xl font-bold text-blue-600">11+</h3>
                <p className="text-gray-600 text-sm mt-1">Năm kinh nghiệm</p>
              </div>
              <div className="bg-white shadow-md rounded-xl p-4 text-center">
                <h3 className="text-2xl font-bold text-blue-600">12+</h3>
                <p className="text-gray-600 text-sm mt-1">Sản phẩm</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <img
              src="https://softdreams.vn/wp-content/uploads/2024/07/Group-2609320.png"
              alt="Softdreams"
              className="w-full max-w-md rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
