import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "~/services/adminAPI";
import { getCategories } from "~/services/categorieAPI";
import { getSubcategories } from "~/services/publicAPI";

import EditableImage from "~/components/EditableImage/EditableImage";
import InputField from "~/components/InputField/InputField";
import TextAreaField from "~/components/TextAreaField/TextAreaField";
import RichTextEditor from "~/components/RichTextEditor/RichTextEditor";
import HighlightList from "./HighlightList";
import SpecList from "./SpecList";

export default function DashboardProductCreate() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    brand: "",
    warranty: "",
    stock: 0,
    description: "",
    content: "",
    bestSeller: false,
    categoryId: "",
    subcategoryId: "",
    images: [],
    highlights: [],
    specifications: [],
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    loadCategories();
    loadSubcategories();
  }, []);

  const loadCategories = async () => {
    const res = await getCategories();
    setCategories(res.categories || res);
  };

  const loadSubcategories = async () => {
    const res = await getSubcategories();
    setSubcategories(res.subcategories || res);
  };

  const handleSave = async () => {
    try {
      const created = await createProduct(product);
      if (created) {
        alert("Tạo sản phẩm thành công!");
        navigate("/admin/dashboard/products");
      }
    } catch (err) {
      alert("Lỗi khi tạo sản phẩm: " + err.message);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Thông tin cơ bản */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        {/* Tên sản phẩm full width */}
        <InputField
          label="Tên sản phẩm"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />

        {/* Grid 2 cột */}
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Giá"
            type="number"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: Number(e.target.value) })
            }
          />
          <InputField
            label="Thương hiệu"
            value={product.brand}
            onChange={(e) => setProduct({ ...product, brand: e.target.value })}
          />
        </div>

        {/* Grid 3 cột */}
        <div className="grid grid-cols-3 gap-4">
          <InputField
            label="Bảo hành"
            value={product.warranty}
            onChange={(e) =>
              setProduct({ ...product, warranty: e.target.value })
            }
          />
          <InputField
            label="Số lượng tồn kho"
            type="number"
            value={product.stock}
            onChange={(e) =>
              setProduct({ ...product, stock: Number(e.target.value) })
            }
          />
          <label className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              checked={product.bestSeller}
              onChange={(e) =>
                setProduct({ ...product, bestSeller: e.target.checked })
              }
            />
            Best Seller
          </label>
        </div>

        {/* Mô tả full width */}
        <TextAreaField
          label="Mô tả"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />
      </div>

      {/* Category & Subcategory */}
      <div className="bg-white p-4 rounded-lg shadow grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Danh mục</label>
          <select
            className="border rounded p-2 w-full"
            value={product.categoryId}
            onChange={(e) =>
              setProduct({ ...product, categoryId: e.target.value })
            }
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold">Danh mục con</label>
          <select
            className="border rounded p-2 w-full"
            value={product.subcategoryId}
            onChange={(e) =>
              setProduct({ ...product, subcategoryId: e.target.value })
            }
          >
            <option value="">-- Chọn danh mục con --</option>
            {subcategories.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white p-4 rounded-lg shadow space-y-3">
        <label className="block font-semibold">Hình ảnh</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {(product.images || []).map((img, i) => (
            <EditableImage
              key={i}
              src={img}
              onChange={(val) => {
                const imgs = [...product.images];
                imgs[i] = val;
                setProduct({ ...product, images: imgs });
              }}
              onRemove={() =>
                setProduct({
                  ...product,
                  images: product.images.filter((_, idx) => idx !== i),
                })
              }
            />
          ))}
          <button
            onClick={() =>
              setProduct({
                ...product,
                images: [...(product.images || []), ""],
              })
            }
            className="border-2 border-dashed p-4 text-gray-500 rounded hover:bg-gray-50"
          >
            + Thêm ảnh
          </button>
        </div>
      </div>

      {/* RichTextEditor */}
      <RichTextEditor
        label="Nội dung chi tiết"
        data={product.content}
        onChange={(val) => setProduct({ ...product, content: val })}
      />

      {/* Highlights & Specs */}
      <HighlightList
        highlights={product.highlights}
        onChange={(list) => setProduct({ ...product, highlights: list })}
      />
      <SpecList
        specifications={product.specifications}
        onChange={(list) => setProduct({ ...product, specifications: list })}
      />

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Tạo sản phẩm
        </button>
        <button
          onClick={() => navigate("/admin/dashboard/products")}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
}
