// src/components/admin/AddServiceModal.jsx
import React, { useEffect, useState } from "react";
import { createService } from "~/services/adminAPI";
import { getCategories } from "~/services/categorieAPI";
import EditableImage from "~/components/EditableImage/EditableImage";

export default function AddServiceModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: 0,
    thumbnail: "",
    images: [""],
    shortDescription: "",
    description: "",
    process: [{ step: "", detail: "" }],
    documentsRequired: [""],
    features: [{ title: "", content: "", image: "" }]
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getCategories();
      setCategories(data.categories || []);
    };
    loadCategories();
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.category || !form.price) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc");
      return;
    }
    try {
      await createService(form);
      onSuccess();
      onClose();
    } catch (err) {
      console.error("❌ Lỗi khi thêm dịch vụ:", err);
      alert("Không thể thêm dịch vụ");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-5xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">➕ Thêm dịch vụ mới</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Basic Info */}
          <div className="border rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-3">Thông tin cơ bản</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Tên dịch vụ"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border rounded p-2 w-full"
              />
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="border rounded p-2 w-full"
              >
                <option value="">-- Chọn danh mục --</option>
                {categories.map((c) => (
                  <option key={c._id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="number"
              placeholder="Giá dịch vụ"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              className="border rounded p-2 w-full mt-2"
            />
          </div>

          {/* Thumbnail */}
          <div className="border rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-3">Thumbnail</h3>
            <EditableImage
              src={form.thumbnail}
              onChange={(val) => setForm({ ...form, thumbnail: val })}
            />
          </div>

          {/* Images */}
          <div className="border rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-3">Hình ảnh</h3>
            {form.images.map((img, i) => (
              <div key={i} className="flex gap-2 mt-1 items-center">
                <EditableImage
                  src={img}
                  onChange={(val) => {
                    const imgs = [...form.images];
                    imgs[i] = val;
                    setForm({ ...form, images: imgs });
                  }}
                  onRemove={() =>
                    setForm({ ...form, images: form.images.filter((_, idx) => idx !== i) })
                  }
                />
              </div>
            ))}
            <button
              onClick={() => setForm({ ...form, images: [...form.images, ""] })}
              className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
            >
              + Thêm ảnh
            </button>
          </div>

          {/* Short & Full Description */}
          <div className="border rounded-lg p-4 shadow-sm space-y-2">
            <h3 className="font-semibold mb-1">Mô tả ngắn</h3>
            <textarea
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              className="border rounded p-2 w-full h-20"
            />
            <h3 className="font-semibold mb-1">Mô tả chi tiết</h3>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="border rounded p-2 w-full h-24"
            />
          </div>

          {/* Process, Documents, Features */}
          <ProcessList form={form} setForm={setForm} />
          <DocumentsList form={form} setForm={setForm} />
          <FeaturesList form={form} setForm={setForm} />
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Lưu dịch vụ
          </button>
        </div>
      </div>
    </div>
  );
}

/* ----------------- Component nhỏ ----------------- */
function ProcessList({ form, setForm }) {
  const addStep = () =>
    setForm({ ...form, process: [...(form.process || []), { step: "", detail: "" }] });
  const removeStep = (i) =>
    setForm({ ...form, process: form.process.filter((_, idx) => idx !== i) });

  return (
    <div className="border rounded-lg p-4 shadow-sm space-y-2">
      <h3 className="font-semibold">Quy trình thực hiện</h3>
      {(form.process || []).map((p, idx) => (
        <div key={idx} className="flex gap-2 mt-1">
          <input
            placeholder="Bước"
            value={p.step}
            onChange={(e) => {
              const newProcess = [...form.process];
              newProcess[idx].step = e.target.value;
              setForm({ ...form, process: newProcess });
            }}
            className="border p-2 rounded w-24"
          />
          <input
            placeholder="Chi tiết"
            value={p.detail}
            onChange={(e) => {
              const newProcess = [...form.process];
              newProcess[idx].detail = e.target.value;
              setForm({ ...form, process: newProcess });
            }}
            className="border p-2 rounded w-full"
          />
          <button type="button" onClick={() => removeStep(idx)} className="text-red-600">
            X
          </button>
        </div>
      ))}
      <button type="button" onClick={addStep} className="text-blue-600 mt-1">
        + Thêm bước
      </button>
    </div>
  );
}

function DocumentsList({ form, setForm }) {
  const addDoc = () =>
    setForm({ ...form, documentsRequired: [...(form.documentsRequired || []), ""] });
  const removeDoc = (i) =>
    setForm({ ...form, documentsRequired: form.documentsRequired.filter((_, idx) => idx !== i) });

  return (
    <div className="border rounded-lg p-4 shadow-sm space-y-2">
      <h3 className="font-semibold">Hồ sơ cần chuẩn bị</h3>
      {(form.documentsRequired || []).map((d, idx) => (
        <div key={idx} className="flex gap-2 mt-1">
          <input
            value={d}
            onChange={(e) => {
              const newDocs = [...form.documentsRequired];
              newDocs[idx] = e.target.value;
              setForm({ ...form, documentsRequired: newDocs });
            }}
            className="border p-2 rounded w-full"
          />
          <button type="button" onClick={() => removeDoc(idx)} className="text-red-600">
            X
          </button>
        </div>
      ))}
      <button type="button" onClick={addDoc} className="text-blue-600 mt-1">
        + Thêm hồ sơ
      </button>
    </div>
  );
}

function FeaturesList({ form, setForm }) {
  const addFeature = () =>
    setForm({ ...form, features: [...(form.features || []), { title: "", content: "", image: "" }] });
  const removeFeature = (i) =>
    setForm({ ...form, features: form.features.filter((_, idx) => idx !== i) });

  return (
    <div className="border rounded-lg p-4 shadow-sm space-y-2">
      <h3 className="font-semibold">Ưu điểm nổi bật</h3>
      {(form.features || []).map((f, idx) => (
        <div key={idx} className="flex gap-2 mt-1">
          <input
            placeholder="Tiêu đề"
            value={f.title}
            onChange={(e) => {
              const newFeatures = [...form.features];
              newFeatures[idx].title = e.target.value;
              setForm({ ...form, features: newFeatures });
            }}
            className="border p-2 rounded w-32"
          />
          <input
            placeholder="Nội dung"
            value={f.content}
            onChange={(e) => {
              const newFeatures = [...form.features];
              newFeatures[idx].content = e.target.value;
              setForm({ ...form, features: newFeatures });
            }}
            className="border p-2 rounded w-full"
          />
          <EditableImage
            src={f.image}
            onChange={(val) => {
              const newFeatures = [...form.features];
              newFeatures[idx].image = val;
              setForm({ ...form, features: newFeatures });
            }}
          />
          <button type="button" onClick={() => removeFeature(idx)} className="text-red-600">
            X
          </button>
        </div>
      ))}
      <button type="button" onClick={addFeature} className="text-blue-600 mt-1">
        + Thêm tính năng
      </button>
    </div>
  );
}
