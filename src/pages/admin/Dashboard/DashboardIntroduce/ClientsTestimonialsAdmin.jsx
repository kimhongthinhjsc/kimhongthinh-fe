// pages/admin/Dashboard/ClientsTestimonialsAdmin.jsx
import React from "react";
import EditableField from "~/components/EditableField/EditableField";
import EditableImage from "~/components/EditableImage/EditableImage";

export default function ClientsTestimonialsAdmin({ data = [], onChange }) {
  if (!data) return null;

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  };

  const handleAdd = () => onChange([...data, { img: "", text: "", author: "", position: "" }]);
  const handleRemove = (index) => onChange(data.filter((_, i) => i !== index));

  return (
    <section className="space-y-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center">Khách hàng nói gì</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, idx) => (
          <div key={idx} className="relative border p-4 rounded-xl bg-gray-50 space-y-3">
            {/* Xóa testimonial */}
            <button
              onClick={() => handleRemove(idx)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
            >
              ✕
            </button>

            {/* Ảnh */}
            <EditableImage
              src={item.img}
              onChange={(val) => handleChange(idx, "img", val)}
              label="Ảnh khách hàng"
              className="w-24 h-24 mx-auto rounded-full object-cover"
            />

            {/* Nội dung */}
            <EditableField
              value={item.text}
              onChange={(val) => handleChange(idx, "text", val)}
              multiline
            />
            <EditableField
              value={item.author}
              onChange={(val) => handleChange(idx, "author", val)}
            />
            <EditableField
              value={item.position}
              onChange={(val) => handleChange(idx, "position", val)}
            />
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Thêm khách hàng
        </button>
      </div>
    </section>
  );
}
