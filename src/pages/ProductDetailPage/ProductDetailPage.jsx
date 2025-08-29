import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "~/services/publicAPI";

import ImageCarousel from "~/components/ImageCarousel/ImageCarousel";
import InfoList from "~/components/InfoList/InfoList";
import PriceTag from "~/components/PriceTag/PriceTag";
import HighlightList from "~/components/HighlightList/HighlightList";
import RelatedProducts from "./RelatedProducts";
import "@ckeditor/ckeditor5-build-classic/build/ckeditor";
import DOMPurify from "dompurify";
import { ProductMainInfo } from "./ProductMainInfo";

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
      <>
        <div className="p-6 text-center">⏳ Đang tải sản phẩm...</div>
      </>
    );
  }

  return (
    <>
      <div className="p-4 md:p-6 lg:px-24 rounded-2xl shadow-lg">
        <ProductMainInfo product={product} />

        <hr className="my-8 border-t border-gray-300" />
        {product.content && (
          <section>
            <h2 className="text-2xl font-semibold mb-2">Chi tiết sản phẩm</h2>
            <div
              className="prose ck-content max-w-none text-gray-800"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.content),
              }}
            />
          </section>
        )}

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
    </>
  );
};

export default ProductDetailPage;
