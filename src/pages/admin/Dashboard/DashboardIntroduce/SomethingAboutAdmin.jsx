// pages/admin/Dashboard/SomethingAboutAdmin.jsx
import React from "react";
import EditableField from "~/components/EditableField/EditableField";
import EditableImage from "~/components/EditableImage/EditableImage";

export default function SomethingAboutAdmin({ data, onChange }) {
  if (!data) return null;

  const handleParagraphChange = (index, value) => {
    const newParagraphs = [...data.paragraphs];
    newParagraphs[index] = value;
    onChange({ ...data, paragraphs: newParagraphs });
  };

  const handleStatChange = (index, field, value) => {
    const newStats = [...data.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    onChange({ ...data, stats: newStats });
  };

  const handleAddParagraph = () => {
    onChange({ ...data, paragraphs: [...data.paragraphs, ""] });
  };

  const handleAddStat = () => {
    onChange({
      ...data,
      stats: [...data.stats, { label: "Tiêu đề mới", value: "0" }],
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto max-w-6xl px-6 md:px-12">
        {/* Tiêu đề */}
        <div className="text-center mb-12">
          <EditableField
            value={data.title}
            onChange={(val) => onChange({ ...data, title: val })}
          />
          <div className="mt-4">
            <EditableField
              value={data.subtitle}
              onChange={(val) => onChange({ ...data, subtitle: val })}
              multiline
            />
          </div>
        </div>

        {/* Nội dung và hình ảnh */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Text + Stats */}
          <div>
            {/* Paragraphs */}
            {data.paragraphs?.map((p, idx) => (
              <div key={idx} className="mt-4">
                <EditableField
                  value={p}
                  onChange={(val) => handleParagraphChange(idx, val)}
                  multiline
                />
              </div>
            ))}
            <button
              onClick={handleAddParagraph}
              className="mt-4 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Thêm đoạn văn
            </button>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-6">
              {data.stats?.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow-md rounded-xl p-4 text-center"
                >
                  <EditableField
                    value={stat.value}
                    onChange={(val) => handleStatChange(idx, "value", val)}
                  />
                  <EditableField
                    value={stat.label}
                    onChange={(val) => handleStatChange(idx, "label", val)}
                    multiline
                  />
                </div>
              ))}
            </div>
            <button
              onClick={handleAddStat}
              className="mt-4 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Thêm thống kê
            </button>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <EditableImage
              src={data.image}
              onChange={(val) => onChange({ ...data, image: val })}
              label="Hình ảnh"
              className="w-full max-w-md h-64"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
