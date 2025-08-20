// pages/admin/Dashboard/CoreValueAdmin.jsx
import React from "react";
import EditableField from "~/components/EditableField/EditableField";
import EditableImage from "~/components/EditableImage/EditableImage";

export default function CoreValueAdmin({ data, onChange }) {
  if (!data) return null;

  const handleTitleChange = (val) => onChange({ ...data, title: val });
  const handleImageChange = (val) => onChange({ ...data, image: val });
  const handleValueChange = (index, field, val) => {
    const newValues = [...data.values];
    newValues[index] = { ...newValues[index], [field]: val };
    onChange({ ...data, values: newValues });
  };
  const handleAddValue = () => onChange({ ...data, values: [...data.values, { title: "", text: "" }] });
  const handleRemoveValue = (index) => onChange({ ...data, values: data.values.filter((_, i) => i !== index) });

  return (
    <section className="space-y-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center">Giá trị cốt lõi</h2>

      {/* Banner Image */}
      <EditableImage
        src={data.image}
        onChange={handleImageChange}
        label="Ảnh Core Value"
        className="w-full max-w-4xl h-64 mx-auto rounded-xl shadow"
      />

      {/* Title */}
      <div className="max-w-2xl mx-auto">
        <EditableField value={data.title} onChange={handleTitleChange} />
      </div>

      {/* Values List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.values.map((val, idx) => (
          <div key={idx} className="relative border p-4 rounded-xl bg-gray-50 space-y-2">
            <button
              onClick={() => handleRemoveValue(idx)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
            >
              ✕
            </button>
            <EditableField value={val.title} onChange={(v) => handleValueChange(idx, "title", v)} />
            <EditableField value={val.text} onChange={(v) => handleValueChange(idx, "text", v)} multiline />
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={handleAddValue}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Thêm giá trị
        </button>
      </div>
    </section>
  );
}
