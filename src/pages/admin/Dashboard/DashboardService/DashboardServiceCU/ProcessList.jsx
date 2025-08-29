import React from "react";

export default function ProcessList({ service, setService }) {
  const addStep = () =>
    setService({
      ...service,
      process: [...(service.process || []), { detail: "" }],
    });

  const removeStep = (i) =>
    setService({
      ...service,
      process: service.process.filter((_, idx) => idx !== i),
    });

  const handlePaste = (e, idx) => {
    const paste = e.clipboardData.getData("text");
    const lines = paste.split(/\r?\n/).filter((line) => line.trim() !== "");

    if (lines.length > 1) {
      e.preventDefault();
      const newProcess = [...(service.process || [])];

      // dòng đầu thay thế ô hiện tại
      newProcess[idx].detail = lines[0];

      // các dòng sau thêm thành bước mới
      lines.slice(1).forEach((line, i) => {
        newProcess.splice(idx + 1 + i, 0, { detail: line });
      });

      setService({ ...service, process: newProcess });
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-2">
      <label className="block font-semibold">Quy trình thực hiện</label>
      {(service.process || []).map((p, idx) => (
        <div key={idx} className="flex gap-2 mt-1 items-center">
          {/* Hiển thị số bước */}
          <span className="w-20 font-semibold text-gray-700">
            Bước {idx + 1}
          </span>

          {/* Ô nhập chi tiết */}
          <input
            placeholder="Chi tiết"
            value={p.detail}
            onChange={(e) => {
              const newProcess = [...service.process];
              newProcess[idx].detail = e.target.value;
              setService({ ...service, process: newProcess });
            }}
            onPaste={(e) => handlePaste(e, idx)} // 👈 xử lý paste
            className="border p-2 rounded w-full"
          />

          {/* Nút xóa */}
          <button
            type="button"
            onClick={() => removeStep(idx)}
            className="text-red-600 hover:underline"
          >
            Xóa
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addStep}
        className="text-blue-600 mt-1 hover:underline"
      >
        + Thêm bước
      </button>
    </div>
  );
}
