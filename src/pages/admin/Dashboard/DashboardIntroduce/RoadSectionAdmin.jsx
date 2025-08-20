// pages/admin/Dashboard/RoadSectionAdmin.jsx
import React from "react";
import EditableField from "~/components/EditableField/EditableField";
import EditableImage from "~/components/EditableImage/EditableImage";

export default function RoadSectionAdmin({ data, onChange }) {
  if (!data) return null;

  const handleTitleChange = (val) => onChange({ ...data, title: val });
  const handleImageChange = (val) => onChange({ ...data, image: val });

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto max-w-4xl px-6 md:px-12 text-center space-y-6">
        {/* Tiêu đề */}
        <h2 className="text-2xl md:text-3xl font-bold">
          <EditableField value={data.title} onChange={handleTitleChange} />
        </h2>

        {/* Ảnh */}
        <div className="flex justify-center mt-6">
          <EditableImage
            src={data.image}
            onChange={handleImageChange}
            label="Ảnh Road Section"
            className="w-full max-w-4xl h-64 md:h-80"
          />
        </div>
      </div>
    </section>
  );
}
