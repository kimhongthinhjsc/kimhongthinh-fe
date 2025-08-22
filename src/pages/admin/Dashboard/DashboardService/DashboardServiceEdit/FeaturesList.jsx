import React from "react";

export default function FeaturesList({ service, setService }) {
  const addFeature = () => setService({ ...service, features: [...(service.features || []), { title: "", content: "", image: "" }] });
  const removeFeature = (i) => setService({ ...service, features: service.features.filter((_, idx) => idx !== i) });

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-2">
      <label className="block font-semibold">Ưu điểm nổi bật</label>
      {(service.features || []).map((f, idx) => (
        <div key={idx} className="flex gap-2 mt-1">
          <input
            placeholder="Tiêu đề"
            value={f.title}
            onChange={(e) => {
              const newFeatures = [...service.features];
              newFeatures[idx].title = e.target.value;
              setService({ ...service, features: newFeatures });
            }}
            className="border p-2 rounded w-32"
          />
          <input
            placeholder="Nội dung"
            value={f.content}
            onChange={(e) => {
              const newFeatures = [...service.features];
              newFeatures[idx].content = e.target.value;
              setService({ ...service, features: newFeatures });
            }}
            className="border p-2 rounded w-full"
          />
          <button type="button" onClick={() => removeFeature(idx)} className="text-red-600">Xóa</button>
        </div>
      ))}
      <button type="button" onClick={addFeature} className="text-blue-600 mt-1">+ Thêm tính năng</button>
    </div>
  );
}
