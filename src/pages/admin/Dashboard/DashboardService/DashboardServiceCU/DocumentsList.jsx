import React from "react";

export default function DocumentsList({ service, setService }) {
  const addDoc = () =>
    setService({
      ...service,
      documentsRequired: [...(service.documentsRequired || []), ""],
    });

  const removeDoc = (i) =>
    setService({
      ...service,
      documentsRequired: service.documentsRequired.filter(
        (_, idx) => idx !== i
      ),
    });

  const handlePasteOrEnter = (e, idx) => {
    // Xử lý paste nhiều dòng
    if (e.type === "paste") {
      const paste = e.clipboardData.getData("text");
      const lines = paste.split(/\r?\n/).filter((line) => line.trim() !== "");

      if (lines.length > 1) {
        e.preventDefault();
        const newDocs = [...(service.documentsRequired || [])];

        // thay thế dòng hiện tại
        newDocs[idx] = lines[0];

        // thêm các dòng mới vào sau
        lines.slice(1).forEach((line, i) => {
          newDocs.splice(idx + 1 + i, 0, line);
        });

        setService({ ...service, documentsRequired: newDocs });
      }
    }

    // Xử lý Enter → thêm dòng trống
    if (e.type === "keydown" && e.key === "Enter") {
      e.preventDefault();
      const newDocs = [...(service.documentsRequired || [])];
      newDocs.splice(idx + 1, 0, "");
      setService({ ...service, documentsRequired: newDocs });
    }
  };

  const list = service.documentsRequired || [""];

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-2">
      <label className="block font-semibold">Hồ sơ cần chuẩn bị</label>
      {list.map((d, idx) => (
        <div key={idx} className="flex gap-2 mt-1 items-center">
          <input
            value={d}
            placeholder="Nhập hồ sơ cần chuẩn bị..."
            onChange={(e) => {
              const newDocs = [...list];
              newDocs[idx] = e.target.value;
              setService({ ...service, documentsRequired: newDocs });
            }}
            onPaste={(e) => handlePasteOrEnter(e, idx)}
            onKeyDown={(e) => handlePasteOrEnter(e, idx)}
            className="border p-2 rounded w-full"
          />
          <button
            type="button"
            onClick={() => removeDoc(idx)}
            className="text-red-600 hover:underline"
          >
            Xóa
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addDoc}
        className="text-blue-600 mt-1 hover:underline"
      >
        + Thêm hồ sơ
      </button>
    </div>
  );
}
