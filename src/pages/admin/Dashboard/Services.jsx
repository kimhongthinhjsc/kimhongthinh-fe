// src/pages/admin/Dashboard/Services.jsx
import React, { useState } from "react";
import servicesMock from "~/mock/services";

export default function Services() {
  const [services, setServices] = useState(servicesMock);
  const [newService, setNewService] = useState({ title: "", image: "", link: "" });

  const handleChange = (index, key, value) => {
    setServices((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [key]: value } : s))
    );
  };

  const handleDelete = (index) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    if (!newService.title || !newService.image) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    setServices([...services, newService]);
    setNewService({ title: "", image: "", link: "" });
  };

  const handleSave = () => {
    console.log("Danh sách dịch vụ:", services);
    alert("Đã lưu danh sách dịch vụ (demo)");
  };

  const handleReset = () => {
    setServices(servicesMock);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Quản lý dịch vụ</h1>

      {/* Form thêm dịch vụ */}
      <div className="p-4 border rounded space-y-2">
        <h2 className="font-semibold">Thêm dịch vụ mới</h2>
        <input
          type="text"
          placeholder="Tên dịch vụ"
          value={newService.title}
          onChange={(e) => setNewService({ ...newService, title: e.target.value })}
          className="border rounded p-2 w-full"
        />
        <input
          type="text"
          placeholder="URL hình ảnh"
          value={newService.image}
          onChange={(e) => setNewService({ ...newService, image: e.target.value })}
          className="border rounded p-2 w-full"
        />
        <input
          type="text"
          placeholder="Link chi tiết"
          value={newService.link}
          onChange={(e) => setNewService({ ...newService, link: e.target.value })}
          className="border rounded p-2 w-full"
        />
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Thêm dịch vụ
        </button>
      </div>

      {/* Danh sách dịch vụ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div key={index} className="border rounded p-4 space-y-2 shadow">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-40 object-cover rounded"
            />
            <input
              type="text"
              value={service.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              value={service.image}
              onChange={(e) => handleChange(index, "image", e.target.value)}
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              value={service.link}
              onChange={(e) => handleChange(index, "link", e.target.value)}
              className="border rounded p-2 w-full"
            />
            <button
              onClick={() => handleDelete(index)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Xoá
            </button>
          </div>
        ))}
      </div>

      {/* Nút hành động */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Lưu thay đổi
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
