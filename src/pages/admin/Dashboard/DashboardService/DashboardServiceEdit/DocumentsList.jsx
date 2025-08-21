import React from "react";

export default function DocumentsList({ service, setService }) {
  const addDoc = () => setService({ ...service, documentsRequired: [...(service.documentsRequired || []), ""] });
  const removeDoc = (i) => setService({ ...service, documentsRequired: service.documentsRequired.filter((_, idx) => idx !== i) });

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-2">
      <label className="block font-semibold">Hồ sơ cần chuẩn bị</label>
      {(service.documentsRequired || []).map((d, idx) => (
        <div key={idx} className="flex gap-2 mt-1">
          <input
            value={d}
            onChange={(e) => {
              const newDocs = [...service.documentsRequired];
              newDocs[idx] = e.target.value;
              setService({ ...service, documentsRequired: newDocs });
            }}
            className="border p-2 rounded w-full"
          />
          <button type="button" onClick={() => removeDoc(idx)} className="text-red-600">Xóa</button>
        </div>
      ))}
      <button type="button" onClick={addDoc} className="text-blue-600 mt-1">+ Thêm hồ sơ</button>
    </div>
  );
}
