import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchProductById,
  fetchCategories,
  getSubcategories,
} from "~/services/publicAPI";
import { updateProduct } from "~/services/adminAPI";
import { ArrowLeft } from "lucide-react";
import EditableImage from "~/components/EditableImage/EditableImage";

// Tách thành component con để code gọn hơn
import HighlightList from "./HighlightList";
import SpecList from "./SpecList";

export default function DashboardProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    loadProduct();
    loadCategories();
    loadSubcategories();
  }, [id]);

  const loadProduct = async () => {
    const data = await fetchProductById(id);
    setProduct(data);
    setLoading(false);
  };

  const loadCategories = async () => {
    const res = await fetchCategories();
    setCategories(res.categories || res); // API có thể trả object {categories} hoặc array
  };

  const loadSubcategories = async () => {
    const res = await getSubcategories();
    setSubcategories(res.subcategories || res);
  };

  const handleSave = async () => {
    try {
      const updated = await updateProduct(id, product);
      if (updated) {
        alert("Cập nhật thành công!");
        navigate("/admin/dashboard/products");
      }
    } catch (err) {
      alert("Lỗi khi cập nhật sản phẩm: " + err.message);
    }
  };

  if (loading) return <div className="p-6">Đang tải...</div>;
  if (!product) return <div className="p-6">Không tìm thấy sản phẩm</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/admin/dashboard/products")}
          className="p-2 rounded hover:bg-gray-200"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Chỉnh sửa sản phẩm</h1>
      </div>

      {/* Thông tin cơ bản */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <InputField
          label="Tên sản phẩm"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
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
        <InputField
          label="Bảo hành"
          value={product.warranty || ""}
          onChange={(e) => setProduct({ ...product, warranty: e.target.value })}
        />
        <InputField
          label="Số lượng tồn kho"
          type="number"
          value={product.stock}
          onChange={(e) =>
            setProduct({ ...product, stock: Number(e.target.value) })
          }
        />
        <TextAreaField
          label="Mô tả"
          value={product.description || ""}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />

        {/* Best Seller */}
        <label className="flex items-center gap-2">
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

      {/* Category & Subcategory */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <div>
          <label className="block font-semibold">Danh mục</label>
          <select
            className="border rounded p-2 w-full"
            value={product.categoryId || ""}
            onChange={(e) => {
              const categoryId = e.target.value;
              setProduct({ ...product, categoryId, subcategoryId: "" });
              loadSubcategories(categoryId);
            }}
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
            value={product.subcategoryId || ""}
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

      {/* Highlights */}
      <HighlightList
        highlights={product.highlights || []}
        onChange={(list) => setProduct({ ...product, highlights: list })}
      />

      {/* Specifications */}
      <SpecList
        specifications={product.specifications || []}
        onChange={(list) => setProduct({ ...product, specifications: list })}
      />

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Lưu thay đổi
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

/* ------------------------- Component nhỏ tái sử dụng ------------------------- */
function InputField({ label, type = "text", value, onChange }) {
  return (
    <div>
      <label className="block font-semibold">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="border rounded p-2 w-full"
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange }) {
  return (
    <div>
      <label className="block font-semibold">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        className="border rounded p-2 w-full h-24"
      />
    </div>
  );
}
