// ProductDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "~/services/publicAPI";
import RelatedProducts from "./RelatedProducts";
import "@ckeditor/ckeditor5-build-classic/build/ckeditor";
import DOMPurify from "dompurify";
import { ProductMainInfo } from "./ProductMainInfo";
import { ListChecks } from "lucide-react";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("❌ Lỗi khi tải sản phẩm:", err);
      }
    };
    loadProduct();
  }, [id]);

  if (!product) {
    return <div className="p-6 text-center">⏳ Đang tải sản phẩm...</div>;
  }

  return (
    <div className="p-4 md:p-6 lg:px-24">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-6">
        <Link to="/" className="hover:text-primary">Trang chủ</Link> /{" "}
        <Link to="/san-pham" className="hover:text-primary">Sản phẩm</Link> /{" "}
        <span className="text-gray-800 font-semibold">{product.name}</span>
      </nav>

      {/* Thông tin chính */}
      <div className="rounded-2xl shadow-lg bg-white p-6">
        <ProductMainInfo product={product} />
      </div>

      {/* Content */}
      {product.content && (
        <section className="bg-white rounded-xl shadow p-6 mt-10 space-y-3">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <ListChecks size={20} /> Chi tiết sản phẩm
          </h2>
          <div
            className="prose ck-content max-w-none text-gray-800"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.content),
            }}
          />
        </section>
      )}

      {/* Specifications */}
      {product.specifications?.length > 0 && (
        <section className="bg-white rounded-xl shadow p-6 mt-10">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Thông số kỹ thuật
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
              <tbody>
                {product.specifications.map((spec, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-gray-100 ${
                      idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-2 font-medium text-gray-700 w-1/3">
                      {spec.key}
                    </td>
                    <td className="px-4 py-2 text-gray-600">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Related products */}
      <RelatedProducts
        categoryId={product.categoryId}
        subcategoryId={product.subcategoryId}
        currentProductId={product._id}
      />
    </div>
  );
};

export default ProductDetailPage;
