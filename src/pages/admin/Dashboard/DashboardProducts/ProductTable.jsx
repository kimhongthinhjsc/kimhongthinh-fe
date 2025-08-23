import React from "react";
import { Pencil } from "lucide-react";

export default function ProductTable({ products, onEdit }) {
  const formatPrice = (price) => {
    if (!price) return "0₫";
    return price.toLocaleString("vi-VN") + "₫";
  };

  return (
    <div className="overflow-x-auto border rounded">
      {/* Bảng cho desktop */}
      <table className="hidden md:table w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 w-20">Ảnh</th>
            <th className="border p-2 text-center">Tên sản phẩm</th>
            <th className="border p-2 w-48">Danh mục</th>
            <th className="border p-2 w-72">Loại sản phẩm</th>
            <th className="border p-2 w-32">Giá</th>
            <th className="border p-2 w-24">Chỉnh sửa</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50">
              <td className="border p-2 text-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover mx-auto rounded"
                />
              </td>
              <td className="border p-2 text-center">{product.name}</td>
              <td className="border p-2 text-center">
                {product.category?.name || "Chưa có"}
              </td>
              <td className="border p-2 text-center">
                {product.subcategory?.name || "Chưa có"}
              </td>
              <td className="border p-2 text-center">
                {formatPrice(product.price)}
              </td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => onEdit(product._id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Pencil size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile dạng card */}
      <div className="md:hidden space-y-3 p-2">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded p-3 flex gap-3 items-center hover:bg-gray-50"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{product.name}</h3>
              {/* Chỉ giữ giá, bỏ category + subcategory */}
              <p className="text-blue-600 font-medium">
                {formatPrice(product.price)}
              </p>
            </div>
            <button
              onClick={() => onEdit(product._id)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Pencil size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
