import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "~/services/publicAPI";
import FramePage from "~/components/FramePage/FramePage";

import ImageCarousel from "~/components/ImageCarousel/ImageCarousel";
import InfoList from "~/components/InfoList/InfoList";
import PriceTag from "~/components/PriceTag/PriceTag";
import HighlightList from "~/components/HighlightList/HighlightList";
import RelatedProducts from "./RelatedProducts";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm:", err);
      }
    };
    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <FramePage>
        <div className="p-6 text-center">⏳ Đang tải sản phẩm...</div>
      </FramePage>
    );
  }

  return (
    <FramePage>
      <div className="p-4 md:p-6 lg:px-24 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {product.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Carousel ảnh */}
          <ImageCarousel images={product.images} alt={product.name} />

          {/* Thông tin chi tiết */}
          <div>
            {product.bestSeller && (
              <div className="mb-4 inline-block bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold px-4 py-2 rounded-full shadow-md">
                🔥 Sản phẩm bán chạy
              </div>
            )}

            <p className="mb-3 text-gray-700">
              <span className="font-semibold">Danh mục:</span>{" "}
              {product.categoryName}
            </p>
            <p className="mb-3 text-gray-700">
              <span className="font-semibold">Nhóm:</span>{" "}
              {product.subcategoryName || "Chưa có"}
            </p>
            <p className="mb-3 text-gray-700">
              <span className="font-semibold">Thương hiệu:</span>{" "}
              {product.brand}
            </p>
            <p className="mb-3 text-gray-700">
              <span className="font-semibold">Bảo hành:</span>{" "}
              {product.warranty}
            </p>

            <PriceTag price={product.price} className="block mb-4" />

            <p className="mt-6 text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <HighlightList highlights={product.highlights} className="mt-4" />
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Thông số kỹ thuật
          </h2>
          <InfoList items={product.specifications} />
        </div>
        {/* Sản phẩm liên quan */}
        <RelatedProducts
          categoryId={product.categoryId}
          subcategoryId={product.subcategoryId}
          currentProductId={product._id}
        />
      </div>
    </FramePage>
  );
};

export default ProductDetailPage;
