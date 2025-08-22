import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getServiceById } from "~/services/publicAPI";
import { updateService } from "~/services/adminAPI";
import { ArrowLeft } from "lucide-react";
import EditableImage from "~/components/EditableImage/EditableImage";

import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import ProcessList from "./ProcessList";
import DocumentsList from "./DocumentsList";
import FeaturesList from "./FeaturesList";
import RichTextEditor from "~/components/RichTextEditor/RichTextEditor";
import { handleContent } from "~/utils/handleContent";

export default function DashboardServiceEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadService = async () => {
      const data = await getServiceById(id);
      setService(data);
      setLoading(false);
    };
    loadService();
  }, [id]);

  if (loading) return <div className="p-6">Đang tải...</div>;
  if (!service) return <div className="p-6">Không tìm thấy dịch vụ</div>;

  const handleSave = async () => {
    try {
      const newContent = await handleContent(service.content);
      await updateService(id, { ...service, content: newContent });
      alert("Cập nhật dịch vụ thành công!");
      navigate("/admin/dashboard/services");
    } catch (err) {
      alert("Lỗi khi cập nhật dịch vụ: " + err.message);
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/admin/dashboard/services")}
          className="p-2 rounded hover:bg-gray-200"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Chỉnh sửa dịch vụ</h1>
      </div>

      {/* Thông tin cơ bản */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">Thông tin cơ bản</h2>
        <InputField
          label="Tên dịch vụ"
          value={service.name}
          onChange={(e) => setService({ ...service, name: e.target.value })}
        />
        <InputField
          label="Danh mục"
          value={service.category}
          onChange={(e) => setService({ ...service, category: e.target.value })}
        />
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Lưu thay đổi
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
