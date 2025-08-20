// pages/admin/Dashboard/VideoSectionAdmin.jsx
import React from "react";
import EditableField from "~/components/EditableField/EditableField";
import EditableImage from "~/components/EditableImage/EditableImage";

export default function VideoSectionAdmin({ data, onChange }) {
  if (!data) return null;

  const handlePosterChange = (val) => {
    onChange({ ...data, poster: val });
  };

  const handleVideoUrlChange = (val) => {
    onChange({ ...data, videoUrl: val });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Video Giới thiệu</h2>

      {/* Poster */}
      <div>
        <h3 className="font-semibold mb-1">Ảnh Poster</h3>
        <EditableImage
          src={data.poster}
          onChange={handlePosterChange}
          label="Poster Video"
          className="w-full h-64"
        />
      </div>

      {/* URL Video */}
      <div>
        <h3 className="font-semibold mb-1">URL Video</h3>
        <EditableField
          value={data.videoUrl}
          onChange={handleVideoUrlChange}
          multiline={false}
        />
      </div>
    </div>
  );
}
