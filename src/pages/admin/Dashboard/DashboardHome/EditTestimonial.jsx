import React from "react";
import EditableField from "./EditableField";
import EditableImage from "./EditableImage";

export default function EditTestimonial({ data, onChange }) {
  const testimonial = data?.testimonial || {};

  const handleChange = (field, value) => {
    onChange("testimonial", {
      ...testimonial,
      [field]: value,
    });
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-10 mt-6 border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Cột trái: nội dung */}
        <div className="relative">
          {/* Icon quote */}
          <div className="absolute -top-6 -left-6 text-[#EF5627] opacity-10 text-8xl">
            <i className="fa-solid fa-quote-left"></i>
          </div>

          {/* Nội dung testimonial */}
          <div className="relative z-10 text-xl leading-relaxed text-gray-700">
            <EditableField
              multiline
              value={testimonial.content || ""}
              onChange={(val) => handleChange("content", val)}
              placeholder="Nhập nội dung testimonial..."
            />
          </div>

          {/* Tác giả + chức vụ */}
          <div className="mt-6 relative z-10">
            <span className="block font-semibold text-gray-900 text-lg">
              <EditableField
                value={testimonial.author || ""}
                onChange={(val) => handleChange("author", val)}
                placeholder="Tên tác giả"
              />
            </span>
            <span className="block text-sm text-gray-500">
              <EditableField
                value={testimonial.position || ""}
                onChange={(val) => handleChange("position", val)}
                placeholder="Chức vụ / Công ty"
              />
            </span>
          </div>
        </div>

        {/* Cột phải: ảnh lớn */}
        <div className="flex justify-center">
          <EditableImage
            label="Ảnh lớn"
            src={testimonial.image || ""}
            onChange={(val) => handleChange("image", val)}
            className="w-full max-w-md h-[320px] object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
