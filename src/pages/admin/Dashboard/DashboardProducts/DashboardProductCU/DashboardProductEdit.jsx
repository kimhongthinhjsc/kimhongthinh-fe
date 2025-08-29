import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "~/services/publicAPI";
import { updateProduct, deleteProduct } from "~/services/adminAPI";
import DynamicInputList from "~/components/DynamicInputList/DynamicInputList";
import InputField from "~/components/InputField/InputField";
import TextAreaField from "~/components/TextAreaField/TextAreaField";
import RichTextEditor from "~/components/RichTextEditor/RichTextEditor";
import SpecList from "./SpecList";
import { globalLoading } from "~/context/LoadingContext";
import { handleContent } from "~/utils/handleContent";
import ImageUploader from "~/components/ImageUploader/ImageUploader";
import CategorySelector from "./CategorySelector";
import { productModel } from "~/models/product";
import { validateProduct } from "~/utils/validateProduct";

export default function DashboardProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(productModel);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    const data = await fetchProductById(id);
    setProduct(data);
    setLoading(false);
  };

  const handleSave = async () => {
    const { isValid, errors } = validateProduct(product);
    if (!isValid) {
      alert("❌ Lỗi:\n" + errors.join("\n"));
      return;
    }
    globalLoading(true);
    try {
      const newContent = await handleContent(product.content);
      const updated = await updateProduct(id, {
        ...product,
        content: newContent,
      });
      if (updated) {
        navigate("/admin/dashboard/products");
      }
    } catch (err) {
    } finally {
      globalLoading(false);
    }
  };
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này?"
    );
    if (!confirmDelete) return;

    globalLoading(true);
    try {
      const deleted = await deleteProduct(id);
      if (deleted) {
        alert("Xóa sản phẩm thành công!");
        navigate("/admin/dashboard/products");
      }
    } catch (err) {
      console.error(err);
      alert("Xóa sản phẩm thất bại!");
    } finally {
      globalLoading(false);
    }
  };

  if (loading) return <div className="p-6">Đang tải...</div>;
  if (!product) return <div className="p-6">Không tìm thấy sản phẩm</div>;

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
            value={product.price}
            onChange={(val) => setProduct({ ...product, price: val })} // val là số
            isMoney
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
            value={product.warranty || ""}
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
          value={product.description || ""}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />
      </div>

      {/* Category & Subcategory */}

      <CategorySelector product={product} setProduct={setProduct} />

      {/* Images */}
      <div className="bg-white p-4 rounded-lg shadow space-y-3">
        <label className="block font-semibold">Hình ảnh</label>
        <ImageUploader
          images={product.images || []}
          onChange={(imgs) => setProduct({ ...product, images: imgs })}
        />
      </div>

      {/* Nội dung chi tiết */}
      <RichTextEditor
        label="Nội dung chi tiết"
        data={product.content || ""}
        onChange={(val) => setProduct({ ...product, content: val })}
      />

      {/* Highlights */}
      <DynamicInputList
        label="Điểm nổi bật"
        addText="+ Thêm điểm nổi bật"
        placeholder="Nhập điểm nổi bật..."
        values={product.highlights}
        onChange={(vals) => setProduct({ ...product, highlights: vals })}
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
          Đặt lại
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Xóa sản phẩm
        </button>
      </div>
    </div>
  );
}
