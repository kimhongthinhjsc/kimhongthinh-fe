import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function ClientsTestimonials({ data }) {
  if (!data) return null;

  return (
    <section id="clients-testimonials" className="py-16 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold">
          Khách hàng nói gì về <span className="text-blue-600">Hồng Thịnh</span>
        </h2>
      </div>
      <div className="px-6 md:px-16">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {data.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-md transition h-full flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={item.img}
                    alt={item.author}
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <p className="font-semibold">{item.author}</p>
                    <p className="text-sm text-gray-500">{item.position}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1">
                  “{item.text}”
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
