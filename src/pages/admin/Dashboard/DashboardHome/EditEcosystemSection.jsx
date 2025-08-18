import React from "react";
import EditableField from "./EditableField";
import EditableImage from "./EditableImage";

export default function EditEcosystemSection({ data, onChange }) {
  const eco = data?.ecosystem ?? {};
  const setEco = (patch) => onChange("ecosystem", { ...eco, ...patch });
  const updateItem = (idx, patch) => {
    const list = [...(eco.items || [])];
    list[idx] = { ...list[idx], ...patch };
    setEco({ items: list });
  };

  const addItem = () => {
    const list = [...(eco.items || [])];
    list.push({ name: "", desc: "", link: "", icon: "" });
    setEco({ items: list });
  };

  const removeItem = (idx) => {
    const list = [...(eco.items || [])];
    list.splice(idx, 1);
    setEco({ items: list });
  };



  return (
    <section className="py-12 px-6 md:px-20 bg-gray-50 rounded-xl">
      <div className="max-w-7xl mx-auto text-center">
        {/* Tiêu đề */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#EF5627] mb-10">
          <EditableField
            value={eco.title}
            onChange={(val) => setEco({ title: val })}
            placeholder="Tiêu đề Ecosystem"
          />
        </h2>

        {/* Grid Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(eco.items || []).map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-6 relative"
            >
              {/* Nút xóa */}
              <button
                onClick={() => removeItem(i)}
                className="absolute top-2 right-2 text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Xóa
              </button>

              {/* Icon */}
              <EditableImage
                src={item.icon}
                onChange={(val) => updateItem(i, { icon: val })}
                label="Icon"
              />

              {/* Name */}
              <h3 className="mt-3 text-lg font-semibold text-[#363F69]">
                <EditableField
                  value={item.name}
                  onChange={(val) => updateItem(i, { name: val })}
                  placeholder="Tên phần mềm"
                />
              </h3>

              {/* Desc */}
              <p className="text-gray-600 text-sm mt-1">
                <EditableField
                  value={item.desc}
                  onChange={(val) => updateItem(i, { desc: val })}
                  placeholder="Mô tả ngắn"
                  multiline
                />
              </p>

              {/* Link */}
              <div className="mt-2 flex items-center gap-2 text-sm">
                <span className="text-gray-500">🔗</span>
                <EditableField
                  value={item.link}
                  onChange={(val) => updateItem(i, { link: val })}
                  type="url"
                  placeholder="https://..."
                  className="flex-1"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Thêm mới */}
        <div className="mt-8">
          <button
            onClick={addItem}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded"
          >
            + Thêm phần mềm
          </button>
        </div>
      </div>
    </section>
  );
}
