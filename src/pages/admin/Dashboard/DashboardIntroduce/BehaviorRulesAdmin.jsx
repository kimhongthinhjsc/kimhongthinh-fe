// pages/admin/Dashboard/BehaviorRulesAdmin.jsx
import React from "react";
import EditableField from "~/components/EditableField/EditableField";
import EditableImage from "~/components/EditableImage/EditableImage";

export default function BehaviorRulesAdmin({ data, onChange }) {
  if (!data) return null;

  const handleMissionChange = (field, value) =>
    onChange({ ...data, mission: { ...data.mission, [field]: value } });
  const handleVisionChange = (field, value) =>
    onChange({ ...data, vision: { ...data.vision, [field]: value } });
  const handleBannerChange = (val) => onChange({ ...data, banner: val });

  return (
    <section className="space-y-12">
      {/* Banner */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Banner</h2>
        <EditableImage
          src={data.banner}
          onChange={handleBannerChange}
          label="Banner"
          className="w-full max-w-5xl h-64 mx-auto rounded-xl shadow"
        />
      </div>

      {/* Mission */}
      <div className="container mx-auto max-w-4xl grid md:grid-cols-2 gap-6 items-center">
        <div className="space-y-3 text-center md:text-left">
          <h3 className="text-2xl font-bold text-[#EF5627]">Sứ mệnh</h3>
          <EditableField
            value={data.mission.title}
            onChange={(val) => handleMissionChange("title", val)}
          />
          <EditableField
            value={data.mission.text}
            onChange={(val) => handleMissionChange("text", val)}
            multiline
          />
        </div>
        <EditableImage
          src="https://softdreams.vn/wp-content/uploads/2023/11/Group-2609257-2.png"
          onChange={() => {}}
          label="Mission Image"
          className="w-full max-w-sm md:max-w-md h-64 mx-auto rounded-xl shadow"
        />
      </div>

      {/* Vision */}
      <div className="bg-[#FDEEE9] py-8">
        <div className="container mx-auto max-w-4xl grid md:grid-cols-2 gap-6 items-center">
          <EditableImage
            src="https://softdreams.vn/wp-content/uploads/2023/12/Subtract.png"
            onChange={() => {}}
            label="Vision Image"
            className="w-full max-w-sm md:max-w-md h-64 mx-auto rounded-xl shadow"
          />
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl font-bold text-[#EF5627]">Tầm nhìn</h3>
            <EditableField
              value={data.vision.title}
              onChange={(val) => handleVisionChange("title", val)}
            />
            <EditableField
              value={data.vision.text}
              onChange={(val) => handleVisionChange("text", val)}
              multiline
            />
          </div>
        </div>
      </div>
    </section>
  );
}
