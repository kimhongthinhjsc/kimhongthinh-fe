import React from "react";
import { Pencil } from "lucide-react";

export default function ProductTable({ products, onEdit }) {
  const formatPrice = (price) => {
    if (!price) return "0₫";
    return price.toLocaleString("vi-VN") + "₫";
  };
  return (
    <div className="overflow-x-auto border rounded">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 w-20">Ảnh</th>
            <th className="border p-2">Tên sản phẩm</th>
            <th className="border p-2 w-36">Danh mục</th>
            <th className="border p-2 w-40">Loại sản phẩm</th>
            <th className="border p-2 w-28">Giá</th>
            <th className="border p-2 w-20">Sửa</th>
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
              <td className="border p-2">{product.name}</td>
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
    </div>
  );
}
