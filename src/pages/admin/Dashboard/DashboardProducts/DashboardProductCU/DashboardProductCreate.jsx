// src/pages/admin/AddProductPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "~/services/adminAPI";
import { getSubcategories } from "~/services/publicAPI";
import { getCategories } from "~/services/categorieAPI";

export default function DashboardProductCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
    images: [""],
    bestSeller: false,
    brand: "",
    warranty: "",
    stock: 0,
    description: "",
    highlights: [""],
    specifications: [{ key: "", value: "" }],
    categoryId: "",
    subcategoryId: "",
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getCategories();
      const subData = await getSubcategories();
      setCategories(data.categories || []);
      setSubcategories(subData.subcategories || []);
    };
    loadCategories();
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.categoryId || !form.subcategoryId) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc");
      return;
    }
    try {
      await createProduct(form);
      alert("Thêm sản phẩm thành công!");
      navigate("/admin/products"); // chuyển về trang danh sách sản phẩm
    } catch (error) {
      console.error("❌ Lỗi khi thêm sản phẩm:", error);
      alert("Không thể thêm sản phẩm");
    }
  };

  return (
    <div className="min-h-screen bg-light p-6 md:p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
        {/* Thông tin cơ bản */}
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Thông tin cơ bản</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Tên sản phẩm"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border rounded p-2 w-full"
            />
            <input
              type="number"
              placeholder="Giá sản phẩm"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
              className="border rounded p-2 w-full"
            />
          </div>
        </div>

        {/* Danh mục */}
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Danh mục</h3>
          <div className="grid grid-cols-2 gap-4">
            <select
              value={form.categoryId}
              onChange={(e) =>
                setForm({
                  ...form,
                  categoryId: e.target.value,
                  subcategoryId: "",
                })
              }
              className="border rounded p-2 w-full"
            >
              <option value="">-- Chọn danh mục --</option>
              {categories?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            <select
              value={form.subcategoryId}
              onChange={(e) =>
                setForm({ ...form, subcategoryId: e.target.value })
              }
              className="border rounded p-2 w-full"
              disabled={!form.categoryId}
            >
              <option value="">-- Chọn loại sản phẩm --</option>
              {subcategories
                ?.filter((sc) => sc.categoryId === form.categoryId)
                .map((sc) => (
                  <option key={sc._id} value={sc._id}>
                    {sc.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Thông tin bổ sung */}
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Thông tin bổ sung</h3>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Thương hiệu"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              placeholder="Bảo hành"
              value={form.warranty}
              onChange={(e) => setForm({ ...form, warranty: e.target.value })}
              className="border rounded p-2 w-full"
            />
            <input
              type="number"
              placeholder="Tồn kho"
              value={form.stock}
              onChange={(e) =>
                setForm({ ...form, stock: Number(e.target.value) })
              }
              className="border rounded p-2 w-full"
            />
          </div>
        </div>

        {/* Mô tả */}
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Mô tả sản phẩm</h3>
          <textarea
            placeholder="Mô tả sản phẩm"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border rounded p-2 w-full h-24"
          />
        </div>

        {/* Highlights */}
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Highlights</h3>
          {form.highlights.map((h, i) => (
            <div key={i} className="flex gap-2 mt-1">
              <input
                type="text"
                value={h}
                onChange={(e) => {
                  const list = [...form.highlights];
                  list[i] = e.target.value;
                  setForm({ ...form, highlights: list });
                }}
                className="border rounded p-2 flex-1"
              />
              <button
                onClick={() =>
                  setForm({
                    ...form,
                    highlights: form.highlights.filter((_, idx) => idx !== i),
                  })
                }
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                X
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              setForm({ ...form, highlights: [...form.highlights, ""] })
            }
            className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
          >
            + Thêm highlight
          </button>
        </div>

        {/* Thông số kỹ thuật */}
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Thông số kỹ thuật</h3>
          {form.specifications.map((spec, i) => (
            <div key={i} className="flex gap-2 mt-1">
              <input
                type="text"
                placeholder="Key"
                value={spec.key}
                onChange={(e) => {
                  const list = [...form.specifications];
                  list[i] = { ...list[i], key: e.target.value };
                  setForm({ ...form, specifications: list });
                }}
                className="border rounded p-2 flex-1"
              />
              <input
                type="text"
                placeholder="Value"
                value={spec.value}
                onChange={(e) => {
                  const list = [...form.specifications];
                  list[i] = { ...list[i], value: e.target.value };
                  setForm({ ...form, specifications: list });
                }}
                className="border rounded p-2 flex-1"
              />
              <button
                onClick={() =>
                  setForm({
                    ...form,
                    specifications: form.specifications.filter(
                      (_, idx) => idx !== i
                    ),
                  })
                }
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                X
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              setForm({
                ...form,
                specifications: [
                  ...form.specifications,
                  { key: "", value: "" },
                ],
              })
            }
            className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
          >
            + Thêm thông số
          </button>
        </div>

        {/* Hình ảnh */}
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Hình ảnh</h3>
          {form.images.map((img, i) => (
            <div key={i} className="flex gap-2 mt-1 items-center">
              <input
                type="text"
                placeholder="URL hình ảnh"
                value={img}
                onChange={(e) => {
                  const imgs = [...form.images];
                  imgs[i] = e.target.value;
                  setForm({ ...form, images: imgs });
                }}
                className="border rounded p-2 flex-1"
              />
              {img && (
                <img
                  src={img}
                  alt=""
                  className="w-12 h-12 object-cover border rounded"
                />
              )}
              <button
                onClick={() =>
                  setForm({
                    ...form,
                    images: form.images.filter((_, idx) => idx !== i),
                  })
                }
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                X
              </button>
            </div>
          ))}
          <button
            onClick={() => setForm({ ...form, images: [...form.images, ""] })}
            className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
          >
            + Thêm ảnh
          </button>
        </div>

        {/* Best Seller */}
        <div className="border rounded-lg p-4 shadow-sm flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.bestSeller}
            onChange={(e) => setForm({ ...form, bestSeller: e.target.checked })}
          />
          <span>Đánh dấu Best Seller</span>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => navigate("/admin/products")}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Lưu sản phẩm
          </button>
        </div>
      </div>
    </div>
  );
}
