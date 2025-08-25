import React, { useState } from "react";


export default function EventForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    taxCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: gửi API backend hoặc dùng form service
  };

  return (
    <section id="event_form" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
          Cập nhật sự kiện Kim Hông Thịnh mới nhất và <br />
          <span className="text-blue-600">nhận tài liệu miễn phí</span>
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Họ và tên */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập họ và tên..."
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập Email..."
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                required
              />
            </div>

            {/* Số điện thoại */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại..."
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                required
              />
            </div>

            {/* Mã số thuế */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Mã số thuế <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="taxCode"
                value={formData.taxCode}
                onChange={handleChange}
                placeholder="Nhập mã số thuế..."
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                required
              />
            </div>
          </div>

          {/* Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Đăng ký ngay
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
