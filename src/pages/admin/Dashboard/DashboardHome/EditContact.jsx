import EditableField from "~/components/EditableField/EditableField";

export default function EditContact({ data, onChange }) {
  const contacts = data?.contact ?? {};
  const isArray = Array.isArray(contacts);
  const items = isArray ? contacts : contacts.items ?? [];

  const apply = (next) =>
    isArray ? onChange("contact", next) : onChange("contact", { ...contacts, items: next });

  const handleChange = (idx, field, value) => {
    const next = items.map((it, i) => (i === idx ? { ...it, [field]: value } : it));
    apply(next);
  };

  return (
    <div className="bg-white shadow rounded-xl p-6 mt-6 border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Chỉnh sửa liên hệ</h2>

      {/* Grid 2 cột trên md -> 1 2 / 3 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="p-4 border rounded-lg bg-gray-50 hover:shadow-sm transition">
            <div className="space-y-3">
              {/* Tiêu đề */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">Tiêu đề</label>
                <EditableField
                  value={item.title}
                  onChange={(v) => handleChange(idx, "title", v)}
                />
              </div>

              {/* Nội dung + Icon (gọn 2 cột) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Nội dung</label>
                  <EditableField
                    value={item.value}
                    onChange={(v) => handleChange(idx, "value", v)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Icon</label>
                  <EditableField
                    value={item.icon}
                    onChange={(v) => handleChange(idx, "icon", v)}
                  />
                  <p className="text-[11px] text-gray-400 mt-1">
                    Chọn: <code>phone</code>, <code>headphones</code>, <code>zalo</code>
                  </p>
                </div>
              </div>

              {/* Liên kết */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">Liên kết</label>
                <EditableField
                  value={item.link || ""}
                  onChange={(v) => handleChange(idx, "link", v)}
                  placeholder="tel:090..., https://zalo.me/..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


