import React from "react";

export default function ProcessList({ service, setService }) {
  const addStep = () => setService({ ...service, process: [...(service.process || []), { step: "", detail: "" }] });
  const removeStep = (i) => setService({ ...service, process: service.process.filter((_, idx) => idx !== i) });

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-2">
      <label className="block font-semibold">Quy trình thực hiện</label>
      {(service.process || []).map((p, idx) => (
        <div key={idx} className="flex gap-2 mt-1">
          <input
            placeholder="Bước"
            value={p.step}
            onChange={(e) => {
              const newProcess = [...service.process];
              newProcess[idx].step = e.target.value;
              setService({ ...service, process: newProcess });
            }}
            className="border p-2 rounded w-24"
          />
          <input
            placeholder="Chi tiết"
            value={p.detail}
            onChange={(e) => {
              const newProcess = [...service.process];
              newProcess[idx].detail = e.target.value;
              setService({ ...service, process: newProcess });
            }}
            className="border p-2 rounded w-full"
          />
          <button type="button" onClick={() => removeStep(idx)} className="text-red-600">Xóa</button>
        </div>
      ))}
      <button type="button" onClick={addStep} className="text-blue-600 mt-1">+ Thêm bước</button>
    </div>
  );
}
