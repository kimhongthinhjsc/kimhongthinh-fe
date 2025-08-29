import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getServiceById } from "~/services/publicAPI";
import ServiceDetailSkeleton from "./ServiceDetailSkelention";
import { CheckCircle, FileText, Images, Workflow } from "lucide-react"; // icon đẹp
import "@ckeditor/ckeditor5-build-classic/build/ckeditor";

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

  if (loading) return <ServiceDetailSkeleton />;
  if (!service) return <>Dịch vụ không tồn tại.</>;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-10">
      {/* Breadcrumb */}
      {/* <nav className="text-sm text-gray-600 mb-4">
        <Link to="/" className="hover:text-primary">Trang chủ</Link> /{" "}
        <Link to="/dich-vu" className="hover:text-primary">Dịch vụ</Link> /{" "}
        <span className="text-gray-800 font-semibold">{service.name}</span>
      </nav> */}

      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col lg:flex-row gap-6">
        {service.thumbnail && (
          <img
            src={service.thumbnail}
            alt={service.name}
            className="w-full lg:w-1/2 h-72 object-cover rounded-xl shadow"
          />
        )}
        <div className="flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">{service.name}</h1>
            <p className="text-gray-600 mt-2">
              {service.shortDescription || service.description}
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg text-xl font-bold shadow-sm w-fit">
            {service.price > 0
              ? `${service.price.toLocaleString()} VND`
              : "Liên hệ báo giá"}
          </div>
        </div>
      </div>

      {/* Description */}
      {service.description && (
        <Section title="Mô tả dịch vụ" icon={<FileText size={20} />}>
          <p className="text-gray-700 leading-relaxed">{service.description}</p>
        </Section>
      )}

      {/* Content */}
      {service.content && (
        <Section title="Chi tiết dịch vụ" icon={<FileText size={20} />}>
          <div
            className="prose ck-content max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: service.content }}
          />
        </Section>
      )}

      {/* Process */}
      {service.process?.length > 0 && (
        <Section title="Quy trình thực hiện" icon={<Workflow size={20} />}>
          <ol className="relative border-l border-gray-300 ml-3 space-y-6">
            {service.process.map((step, idx) => (
              <li key={step._id} className="ml-6">
                <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full shadow">
                  {idx + 1}
                </span>
                <h3 className="font-semibold">{step.step}</h3>
                <p className="text-gray-600">{step.detail}</p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {/* Documents */}
      {service.documentsRequired?.length > 0 && (
        <Section title="Hồ sơ cần chuẩn bị" icon={<FileText size={20} />}>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {service.documentsRequired.map((doc, idx) => (
              <li key={idx}>{doc}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* Features */}
      {service.features?.length > 0 && (
        <Section title="Ưu điểm nổi bật" icon={<CheckCircle size={20} />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {service.features.map((f) => (
              <div
                key={f._id}
                className="p-5 border rounded-xl shadow-sm hover:shadow-md transition bg-white"
              >
                {f.image && (
                  <img
                    src={f.image}
                    alt={f.title}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                )}
                <h3 className="font-bold text-lg mb-1">{f.title}</h3>
                <p className="text-gray-700 text-sm">{f.content}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Images */}
      {service.images?.length > 0 && (
        <Section title="Hình ảnh minh họa" icon={<Images size={20} />}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {service.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${service.name} ${idx + 1}`}
                className="w-full h-40 object-cover rounded-xl shadow-sm hover:scale-105 transition"
              />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

// Component tái sử dụng cho các section
const Section = ({ title, children, icon }) => (
  <section className="bg-white p-6 rounded-xl shadow space-y-3">
    <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
      {icon} {title}
    </h2>
    {children}
  </section>
);
