import React, { useState } from "react";
import { Pencil, X } from "lucide-react";
import { uploadImage } from "~/services/adminAPI"; // API upload file

export default function EditableImage({
  src,
  onChange,
  label = "Ảnh",
  className = "w-20 h-20", // default size nhỏ
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(src);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // preview tạm
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    try {
      setLoading(true);
      const res = await uploadImage(file); // gọi API upload
      const uploadedUrl = res.url || res.secure_url;
      console.log("Uploaded image URL:", uploadedUrl, res);
      if (uploadedUrl) {
        onChange(uploadedUrl); // trả URL lên parent
      } else {
        alert("❌ Upload thất bại, không có URL trả về");
      }
    } catch (err) {
      console.error("Upload image error:", err);
      alert("❌ Có lỗi khi upload ảnh");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Ảnh + nút sửa */}
      <div className={`relative ${className}`}>
        <img
          src={preview || "https://via.placeholder.com/300x200?text=No+Image"}
          alt="preview"
          className="w-full h-full object-cover rounded border bg-white"
        />
        <button
          onClick={() => setOpen(true)}
          className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
        >
          <Pencil size={16} className="text-gray-600" />
        </button>
      </div>

      {/* Popup chỉnh sửa */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg relative">
            {/* Nút đóng */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-semibold mb-4">{label}</h3>

            {/* Preview ảnh */}
            <div className="mb-4 flex justify-center">
              <img
                src={preview || "https://via.placeholder.com/400x300?text=No+Image"}
                alt="preview"
                className="max-h-[300px] object-contain rounded border bg-gray-50"
              />
            </div>

            {/* Upload file */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border rounded p-2"
              disabled={loading}
            />
            {loading && <p className="mt-2 text-sm text-gray-500">Đang tải...</p>}

            {/* Nút đóng popup */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded"
              >
                Xong
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
