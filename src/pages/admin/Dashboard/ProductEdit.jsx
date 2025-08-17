import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "~/services/publicAPI";
import { updateProduct } from "~/services/adminAPI";
export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
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
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Chỉnh sửa sản phẩm</h1>

      {/* Tên */}
      <div>
        <label className="block font-semibold">Tên sản phẩm</label>
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="border rounded p-2 w-full"
        />
      </div>

      {/* Giá */}
      <div>
        <label className="block font-semibold">Giá</label>
        <input
          type="number"
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: Number(e.target.value) })
          }
          className="border rounded p-2 w-full"
        />
      </div>

      {/* Thương hiệu */}
      <div>
        <label className="block font-semibold">Thương hiệu</label>
        <input
          type="text"
          value={product.brand}
          onChange={(e) => setProduct({ ...product, brand: e.target.value })}
          className="border rounded p-2 w-full"
        />
      </div>

      {/* Bảo hành */}
      <div>
        <label className="block font-semibold">Bảo hành</label>
        <input
          type="text"
          value={product.warranty || ""}
          onChange={(e) => setProduct({ ...product, warranty: e.target.value })}
          className="border rounded p-2 w-full"
        />
      </div>

      {/* Tồn kho */}
      <div>
        <label className="block font-semibold">Số lượng tồn kho</label>
        <input
          type="number"
          value={product.stock}
          onChange={(e) =>
            setProduct({ ...product, stock: Number(e.target.value) })
          }
          className="border rounded p-2 w-full"
        />
      </div>

      {/* Mô tả */}
      <div>
        <label className="block font-semibold">Mô tả</label>
        <textarea
          value={product.description || ""}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          className="border rounded p-2 w-full h-24"
        />
      </div>

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

      {/* Hình ảnh */}
      <div>
        <label className="block font-semibold">Hình ảnh</label>
        {(product.images || []).map((img, i) => (
          <div key={i} className="flex gap-2 items-center mb-2">
            <input
              type="text"
              value={img.trim()}
              onChange={(e) => {
                const imgs = [...product.images];
                imgs[i] = e.target.value.trim();
                setProduct({ ...product, images: imgs });
              }}
              className="border rounded p-2 flex-1"
            />
            <button
              onClick={() =>
                setProduct({
                  ...product,
                  images: product.images.filter((_, idx) => idx !== i),
                })
              }
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Xoá
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            setProduct({ ...product, images: [...(product.images || []), ""] })
          }
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          + Thêm ảnh
        </button>
      </div>

      {/* Highlights */}
      <div>
        <label className="block font-semibold">Highlights</label>
        {(product.highlights || []).map((h, i) => (
          <div key={i} className="flex gap-2 items-center mb-2">
            <input
              type="text"
              value={h}
              onChange={(e) => {
                const list = [...product.highlights];
                list[i] = e.target.value;
                setProduct({ ...product, highlights: list });
              }}
              className="border rounded p-2 flex-1"
            />
            <button
              onClick={() =>
                setProduct({
                  ...product,
                  highlights: product.highlights.filter((_, idx) => idx !== i),
                })
              }
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Xoá
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            setProduct({
              ...product,
              highlights: [...(product.highlights || []), ""],
            })
          }
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          + Thêm highlight
        </button>
      </div>

      {/* Specifications */}
      <div>
        <label className="block font-semibold">Thông số kỹ thuật</label>
        {(product.specifications || []).map((spec, i) => (
          <div key={i} className="flex gap-2 items-center mb-2">
            <input
              type="text"
              placeholder="Key"
              value={spec.key}
              onChange={(e) => {
                const list = [...product.specifications];
                list[i] = { ...list[i], key: e.target.value };
                setProduct({ ...product, specifications: list });
              }}
              className="border rounded p-2 flex-1"
            />
            <input
              type="text"
              placeholder="Value"
              value={spec.value}
              onChange={(e) => {
                const list = [...product.specifications];
                list[i] = { ...list[i], value: e.target.value };
                setProduct({ ...product, specifications: list });
              }}
              className="border rounded p-2 flex-1"
            />
            <button
              onClick={() =>
                setProduct({
                  ...product,
                  specifications: product.specifications.filter(
                    (_, idx) => idx !== i
                  ),
                })
              }
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Xoá
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            setProduct({
              ...product,
              specifications: [
                ...(product.specifications || []),
                { key: "", value: "" },
              ],
            })
          }
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          + Thêm thông số
        </button>
      </div>

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
