import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServiceById } from "~/services/publicAPI";
import ServiceDetailSkeleton from "./ServiceDetailSkelention";
import '@ckeditor/ckeditor5-build-classic/build/ckeditor';

export default function ServiceDetailPage() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      const data = await getServiceById(id);
      setService(data);
      setLoading(false);
    };
    fetchService();
  }, [id]);

  if (loading)
    return (
      <>
        <ServiceDetailSkeleton />
      </>
    );

  if (!service) return <>Dịch vụ không tồn tại.</>;

  return (
    <>
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-6">
          {service.thumbnail && (
            <img
              src={service.thumbnail}
              alt={service.name}
              className="w-full lg:w-1/2 h-64 object-cover rounded-xl shadow-md"
            />
          )}
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold text-[#EF5627]">{service.name}</h1>
            <p className="text-gray-700">
              {service.shortDescription || service.description}
            </p>
            <p className="text-lg font-bold text-green-600">
              {service.price.toLocaleString()} VND
            </p>
          </div>
        </div>

        {/* Mô tả ngắn */}
        {service.description && (
          <section>
            <h2 className="text-2xl font-semibold mb-2">Mô tả dịch vụ</h2>
            <p className="text-gray-700">{service.description}</p>
          </section>
        )}

        {/* Nội dung chi tiết */}
        {service.content && (
          <section>
            <h2 className="text-2xl font-semibold mb-2">Chi tiết dịch vụ</h2>
            <div
              className="prose ck-content max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: service.content }}
            />
          </section>
        )}

        {/* Quy trình */}
        {service.process?.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-2">Quy trình thực hiện</h2>
            <ol className="list-decimal list-inside space-y-2 border-l-4 border-orange-400 pl-4">
              {service.process.map((step) => (
                <li key={step._id}>
                  <strong>{step.step}:</strong> {step.detail}
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Hồ sơ cần chuẩn bị */}
        {service.documentsRequired?.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-2">Hồ sơ cần chuẩn bị</h2>
            <ul className="list-disc list-inside space-y-1">
              {service.documentsRequired.map((doc, idx) => (
                <li key={idx}>{doc}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Ưu điểm nổi bật */}
        {service.features?.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Ưu điểm nổi bật</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {service.features.map((f) => (
                <div
                  key={f._id}
                  className="p-4 border rounded-xl shadow-sm hover:shadow-md transition"
                >
                  {f.image && (
                    <img
                      src={f.image}
                      alt={f.title}
                      className="w-full h-32 object-cover rounded-md mb-2"
                    />
                  )}
                  <h3 className="font-bold text-lg">{f.title}</h3>
                  <p className="text-gray-700">{f.content}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gallery hình ảnh */}
        {service.images?.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Hình ảnh minh họa</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {service.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${service.name} ${idx + 1}`}
                  className="w-full h-40 object-cover rounded-xl shadow-sm"
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
