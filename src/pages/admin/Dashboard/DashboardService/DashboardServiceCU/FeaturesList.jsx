import React from "react";

export default function FeaturesList({ service, setService }) {
  const addFeature = () =>
    setService({
      ...service,
      features: [...(service.features || []), { title: "", content: "", image: "" }],
    });

  const removeFeature = (i) =>
    setService({
      ...service,
      features: service.features.filter((_, idx) => idx !== i),
    });

  const handlePaste = (e, idx) => {
    const paste = e.clipboardData.getData("text");
    const lines = paste.split(/\r?\n/).filter((line) => line.trim() !== "");

    if (lines.length > 1) {
      e.preventDefault();

      const parsed = lines.map((line) => {
        let [title, ...rest] = line.split(/\t|:/); // tách bằng tab hoặc dấu :
        return {
          title: title?.trim() || "",
          content: rest.join(":").trim() || "",
          image: "",
        };
      });

      const newFeatures = [...(service.features || [])];
      // dòng đầu thay thế
      newFeatures[idx] = parsed[0];
      // thêm các dòng còn lại
      setService({
        ...service,
        features: [...newFeatures, ...parsed.slice(1)],
      });
    }
  };

  const list = service.features || [{ title: "", content: "", image: "" }];

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-2">
      <label className="block font-semibold">Ưu điểm nổi bật</label>
      {list.map((f, idx) => (
        <div key={idx} className="flex gap-2 mt-1 items-center">
          <input
            placeholder="Tiêu đề"
            value={f.title}
            onChange={(e) => {
              const newFeatures = [...list];
              newFeatures[idx].title = e.target.value;
              setService({ ...service, features: newFeatures });
            }}
            onPaste={(e) => handlePaste(e, idx)}
            className="border p-2 rounded w-40"
          />
          <input
            placeholder="Nội dung"
            value={f.content}
            onChange={(e) => {
              const newFeatures = [...list];
              newFeatures[idx].content = e.target.value;
              setService({ ...service, features: newFeatures });
            }}
            className="border p-2 rounded flex-1"
          />
          <button
            type="button"
            onClick={() => removeFeature(idx)}
            className="text-red-600 hover:underline"
          >
            Xóa
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addFeature}
        className="text-blue-600 mt-1 hover:underline"
      >
        + Thêm ưu điểm
      </button>
    </div>
  );
}
