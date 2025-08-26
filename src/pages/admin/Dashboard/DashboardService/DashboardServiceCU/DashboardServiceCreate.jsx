// src/pages/admin/DashboardServiceCreate.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createService } from "~/services/adminAPI";
import { getCategories } from "~/services/categorieAPI";
import EditableImage from "~/components/EditableImage/EditableImage";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import ProcessList from "./ProcessList";
import DocumentsList from "./DocumentsList";
import FeaturesList from "./FeaturesList";
import RichTextEditor from "~/components/RichTextEditor/RichTextEditor";
import { handleContent } from "~/utils/handleContent";
import { globalLoading } from "~/context/LoadingContext";

export default function DashboardServiceCreate() {
  const navigate = useNavigate();

  const [service, setService] = useState({
    name: "",
    category: "",
    price: 0,
    thumbnail: "",
    images: [""],
    shortDescription: "",
    description: "",
    content: "",
    process: [{ step: "", detail: "" }],
    documentsRequired: [""],
    features: [{ title: "", content: "", image: "" }],
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getCategories();
      setCategories(data.categories || []);
    };
    loadCategories();
  }, []);

  const handleSave = async () => {
    globalLoading(true);
    if (!service.name || !service.category || !service.price) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc");
      return;
    }
    try {
      const newContent = await handleContent(service.content);
      await createService({ ...service, content: newContent });
      alert("Thêm dịch vụ thành công!");
      navigate("/admin/dashboard/services");
    } catch (err) {
      console.error("❌ Lỗi khi thêm dịch vụ:", err);
      alert("Không thể thêm dịch vụ");
    } finally {
      globalLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}

      {/* Thông tin cơ bản */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">
          Thông tin cơ bản
        </h2>
        <InputField
          label="Tên dịch vụ"
          value={service.name}
          onChange={(e) => setService({ ...service, name: e.target.value })}
        />
        <div>
          <label className="block font-semibold mb-1">Danh mục</label>
          <select
            value={service.category}
            onChange={(e) =>
              setService({ ...service, category: e.target.value })
            }
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
        <InputField
          label="Giá"
          type="number"
          value={service.price}
          onChange={(e) =>
            setService({ ...service, price: Number(e.target.value) })
          }
        />
        <TextAreaField
          label="Mô tả ngắn"
          value={service.shortDescription || ""}
          onChange={(e) =>
            setService({ ...service, shortDescription: e.target.value })
          }
        />
        <TextAreaField
          label="Mô tả chi tiết"
          value={service.description || ""}
          onChange={(e) =>
            setService({ ...service, description: e.target.value })
          }
        />
      </div>

      {/* Hình ảnh */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">Hình ảnh</h2>
        <div>
          <label className="block font-semibold mb-2">Hình thu nhỏ</label>
          <EditableImage
            src={service.thumbnail}
            onChange={(val) => setService({ ...service, thumbnail: val })}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Gallery</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(service.images || []).map((img, i) => (
              <EditableImage
                key={i}
                src={img}
                onChange={(val) => {
                  const imgs = [...service.images];
                  imgs[i] = val;
                  setService({ ...service, images: imgs });
                }}
                onRemove={() =>
                  setService({
                    ...service,
                    images: service.images.filter((_, idx) => idx !== i),
                  })
                }
              />
            ))}
            <button
              onClick={() =>
                setService({
                  ...service,
                  images: [...(service.images || []), ""],
                })
              }
              className="border-2 border-dashed p-4 text-gray-500 rounded hover:bg-gray-50"
            >
              + Thêm ảnh
            </button>
          </div>
        </div>
      </div>

      {/* Nội dung chi tiết (CKEditor) */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold border-b pb-2">
          Nội dung chi tiết
        </h2>
        <RichTextEditor
          data={service.content || ""}
          onChange={(val) => setService({ ...service, content: val })}
        />
      </div>

      {/* Quy trình - Hồ sơ - Ưu điểm */}
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <h2 className="text-lg font-semibold border-b pb-2">Chi tiết khác</h2>
        <ProcessList service={service} setService={setService} />
        <DocumentsList service={service} setService={setService} />
        <FeaturesList service={service} setService={setService} />
      </div>

      {/* Hành động */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Thêm dịch vụ
        </button>
        <button
          onClick={() => navigate("/admin/dashboard/services")}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
}
