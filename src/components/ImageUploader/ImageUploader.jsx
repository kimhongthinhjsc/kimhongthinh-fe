// src/components/ImageUploader/ImageUploader.jsx
import React, { useRef } from "react";
import EditableImage from "../EditableImage/EditableImage";
import { X } from "lucide-react";

export default function ImageUploader({
  images = [],
  setImages,
  size = "w-28 h-28 md:w-32 md:h-32",
}) {
  const fileInputRef = useRef(null);

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newIndex = images.length;
    setImages([...images, ""]); // placeholder

    // tạo preview tạm
    const reader = new FileReader();
    reader.onload = (event) => {
      const updatedImages = [...images];
      updatedImages[newIndex] = event.target.result; // preview tạm
      setImages(updatedImages);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (index, url) => {
    const updatedImages = [...images];
    updatedImages[index] = url;
    setImages(updatedImages);
  };

  const handleRemove = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <div className="flex flex-wrap gap-4">
      {images.map((img, i) => (
        <div key={i} className={`relative ${size}`}>
          <EditableImage
            src={img}
            onChange={(url) => handleChange(i, url)}
            className="w-full h-full"
          />

          {/* Nút xóa góc trên trái */}
          <button
            onClick={() => handleRemove(i)}
            className="absolute top-1 left-1 bg-white rounded-full p-1 shadow hover:bg-gray-100 z-10"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      ))}

      {/* Nút thêm ảnh */}
      <button
        onClick={handleAddClick}
        className={`${size} flex items-center justify-center border-2 border-dashed text-gray-500 rounded hover:bg-gray-50`}
      >
        + Thêm ảnh
      </button>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}
