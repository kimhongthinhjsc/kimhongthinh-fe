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
    <div className="bg-white shadow-md rounded-xl p-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Cột trái: nội dung */}
        <div className="bg-gray-50 rounded-xl p-6 relative">
          <div className="absolute -top-4 -left-4 text-[#EF5627] opacity-20 text-5xl">
            <i className="fa-solid fa-quote-left"></i>
          </div>

          {/* Nội dung */}
          <div className="mb-4 relative z-10">
            <EditableField
              multiline
              value={testimonial.content || ""}
              onChange={(val) => handleChange("content", val)}
            />
          </div>

          {/* Tác giả */}
          <div className="mt-6 relative z-10">
            <label className="block text-sm font-medium mb-1">Tác giả</label>
            <EditableField
              value={testimonial.author || ""}
              onChange={(val) => handleChange("author", val)}
            />
          </div>

          {/* Chức vụ */}
          <div className="mt-2 relative z-10">
            <label className="block text-sm font-medium mb-1">Chức vụ</label>
            <EditableField
              value={testimonial.position || ""}
              onChange={(val) => handleChange("position", val)}
            />
          </div>
        </div>

        {/* Cột phải: ảnh */}
        <div className="flex justify-center">
          <EditableImage
            label="Ảnh"
            src={testimonial.image || ""}
            onChange={(val) => handleChange("image", val)}
            className="max-w-xs"
          />
        </div>
      </div>
    </div>
  );
}
