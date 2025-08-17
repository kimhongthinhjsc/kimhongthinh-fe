import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts, addProduct } from "~/services/publicAPI";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    bestSeller: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadProducts();
  }, [currentPage]);

  const loadProducts = async () => {
    const data = await fetchProducts(currentPage, itemsPerPage);
    setProducts(data.products || []);
    setTotalPages(data.totalPages || 1);
  };

  const handleAdd = async () => {
    if (!newProduct.name || !newProduct.image) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    const created = await addProduct(newProduct);
    if (created) {
      setNewProduct({ name: "", image: "", bestSeller: false });
      loadProducts();
    }
  };

  const handleChange = async (id, key, value) => {
    const updated = products.map((p) =>
      p._id === id ? { ...p, [key]: value } : p
    );
    setProducts(updated);

    // const product = updated.find((p) => p._id === id);
    // await updateProduct(id, product);
  };

  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/admin/dashboard/products/${id}/edit`);
  };
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>

      {/* Form thêm sản phẩm */}
      <div className="p-4 border rounded space-y-2 bg-gray-50">
        <h2 className="font-semibold">Thêm sản phẩm mới</h2>
        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Tên sản phẩm"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="border rounded p-2 flex-1"
          />
          <input
            type="text"
            placeholder="URL hình ảnh"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            className="border rounded p-2 flex-1"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newProduct.bestSeller}
              onChange={(e) =>
                setNewProduct({ ...newProduct, bestSeller: e.target.checked })
              }
            />
            Best Seller
          </label>
          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Thêm
          </button>
        </div>
      </div>

      {/* Danh sách sản phẩm dạng hàng */}
      <div className="overflow-x-auto border rounded">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 w-16">Ảnh</th>
              <th className="border p-2">Tên sản phẩm</th>
              <th className="border p-2 w-28">Best Seller</th>
              <th className="border p-2 w-24">Hành động</th>
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
                <td className="border p-2">
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) =>
                      handleChange(product._id, "name", e.target.value)
                    }
                    className="border rounded p-1 w-full"
                  />
                </td>
                <td className="border p-2 text-center">
                  <input
                    type="checkbox"
                    checked={product.bestSeller}
                    onChange={(e) =>
                      handleChange(product._id, "bestSeller", e.target.checked)
                    }
                  />
                </td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Chỉnh sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-600 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
