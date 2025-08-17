// src/pages/admin/Dashboard/Products.jsx
import React, { useState } from "react";
import productsMock from "~/mock/products";


export default function Products() {
  const [products, setProducts] = useState(productsMock);
  const [newProduct, setNewProduct] = useState({ name: "", image: "", bestSeller: false });

  const handleChange = (id, key, value) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [key]: value } : p))
    );
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAdd = () => {
    if (!newProduct.name || !newProduct.image) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    setProducts([...products, { ...newProduct, id: newId }]);
    setNewProduct({ name: "", image: "", bestSeller: false });
  };

  const handleSave = () => {
    console.log("Dữ liệu sản phẩm:", products);
    alert("Đã lưu danh sách sản phẩm (demo)");
  };

  const handleReset = () => {
    setProducts(productsMock);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>

      {/* Form thêm sản phẩm */}
      <div className="p-4 border rounded space-y-2">
        <h2 className="font-semibold">Thêm sản phẩm mới</h2>
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border rounded p-2 w-full"
        />
        <input
          type="text"
          placeholder="URL hình ảnh"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          className="border rounded p-2 w-full"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={newProduct.bestSeller}
            onChange={(e) => setNewProduct({ ...newProduct, bestSeller: e.target.checked })}
          />
          Best Seller
        </label>
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Thêm sản phẩm
        </button>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded p-4 space-y-2 shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />
            <input
              type="text"
              value={product.name}
              onChange={(e) => handleChange(product.id, "name", e.target.value)}
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              value={product.image}
              onChange={(e) => handleChange(product.id, "image", e.target.value)}
              className="border rounded p-2 w-full"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={product.bestSeller}
                onChange={(e) =>
                  handleChange(product.id, "bestSeller", e.target.checked)
                }
              />
              Best Seller
            </label>
            <button
              onClick={() => handleDelete(product.id)}
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
