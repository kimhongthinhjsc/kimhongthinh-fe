import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createCareer, getOneCareerById, updateCareer } from "~/services/adminAPI";

export default function CareerForm({ onSubmit, defaultValues }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  // ✅ state để hiển thị toast
  const [toast, setToast] = useState({ message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000); // auto hide
  };

  const [formData, setFormData] = useState(
    defaultValues || {
      _id: "",
      title: "",
      salary: "",
      experience: "",
      deadline: "",
      quantity: 1,
      description: "",
      benefits: "",
      skills: "",
      contact: {
        name: "",
        email: "",
        phone: "",
      },
    }
  );

  const [loading, setLoading] = useState(false);   // ✅ loading khi lấy data
  const [saving, setSaving] = useState(false);     // ✅ loading khi submit

  const getData = async (id) => {
    try {
      setLoading(true);
      const res = await getOneCareerById(id);
      if (res) setFormData(res.career);
    } catch (error) {
      showToast("Không thể tải dữ liệu tin tuyển dụng!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state !== null) {
      getData(state?.id);
    }
  }, [state?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("contact.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contact: { ...prev.contact, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (state !== null) {
        await updateCareer(formData);
        showToast("Cập nhật tin tuyển dụng thành công!", "success");
      } else {
        await createCareer(formData);
        //set form rỗng
        setFormData({
          _id: "",
          title: "",
          salary: "",
          experience: "",
          deadline: "",
          quantity: 1,
          description: "",
          benefits: "",
          skills: "",
          contact: {
            name: "",
            email: "",
            phone: "",
          },
        });
        showToast("Thêm tin tuyển dụng thành công!", "success");
      }
      if (onSubmit) onSubmit(); // callback sau khi lưu
    } catch (error) {
      showToast("Lưu tin tuyển dụng thất bại!", "error");
    } finally {
      setSaving(false);
    }
  };

  // ✅ Check đầy đủ dữ liệu
  const isFormValid =
    formData.title.trim() &&
    formData.salary.trim() &&
    formData.experience.trim() &&
    formData.deadline &&
    formData.quantity > 0 &&
    formData.description.trim() &&
    formData.benefits.trim() &&
    formData.skills.trim() &&
    formData.contact.name.trim() &&
    formData.contact.email.trim() &&
    formData.contact.phone.trim();

  // ✅ Skeleton UI khi đang loading
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-8 animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-6 mx-auto"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-8">
      {toast.message && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-2 rounded-lg shadow-lg text-white transition-opacity duration-300
    ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        {state !== null ? "Cập nhật tin tuyển dụng" : "Thêm tin tuyển dụng"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Cột trái */}
        <div className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Vị trí tuyển dụng</label>
            <input
              name="title"
              value={formData?.title}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Chuyên viên Marketing"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Mức lương</label>
            <input
              name="salary"
              value={formData?.salary}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="15 - 20 triệu"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Kinh nghiệm</label>
            <input
              name="experience"
              value={formData?.experience}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Tối thiểu 2 năm trong lĩnh vực Marketing"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Hạn nộp hồ sơ</label>
            <input
              type="date"
              name="deadline"
              value={formData?.deadline ? formData?.deadline.split("T")[0] : ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Số lượng tuyển</label>
            <input
              type="number"
              name="quantity"
              value={formData?.quantity}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Kỹ năng yêu cầu</label>
            <textarea
              name="skills"
              value={formData?.skills}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 h-32"
              placeholder="Facebook Ads, Google Ads..."
            />
          </div>
        </div>

        {/* Cột phải */}
        <div className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Mô tả công việc</label>
            <textarea
              name="description"
              value={formData?.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 h-32"
              placeholder="Mô tả chi tiết công việc..."
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Quyền lợi</label>
            <textarea
              name="benefits"
              value={formData?.benefits}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 h-28"
              placeholder="Lương tháng 13, du lịch hằng năm..."
            />
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-3 text-gray-700">
              Thông tin liên hệ
            </h3>
            <div className="space-y-3">
              <input
                name="contact.name"
                value={formData?.contact.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="Phòng Nhân sự"
              />
              <input
                type="email"
                name="contact.email"
                value={formData?.contact.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="hr@companyabc.com"
              />
              <input
                name="contact.phone"
                value={formData?.contact.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="0901234567"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="col-span-1 md:col-span-2 flex justify-end mt-6">
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard/careers')}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-lg font-medium mr-6"
          >
            Quay lại
          </button>
          <button
            type="submit"
            disabled={!isFormValid || saving}
            className={`px-8 py-3 rounded-lg text-lg font-medium transition flex items-center justify-center gap-2
              ${isFormValid && !saving
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
          >
            {saving && (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {state !== null ? "Cập nhật" : "Thêm mới"}
          </button>
        </div>
      </form>
    </div>
  );
}
