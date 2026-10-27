import React from "react";
import EventHeader from "~/components/EventHeader/EventHeader";
import EventSearch from "~/components/EventSearch/EventSearch";
import EventComing from "~/components/EventComing/EventComing";
import EventFinish from "~/components/EventFinish/EventFinish";
import EventForm from "~/components/EventForm/EventForm";
import { useEventPast, useEventUpcoming } from "~/hooks/usePublic";
import { Users, Award, Heart, ShieldCheck, Sparkles, Coffee } from "lucide-react";

export default function EventsPage() {
  const { data: eventPastData, isLoading: isLoadingPast } = useEventPast();
  const { data: eventUpcomingData, isLoading: isLoadingUpcoming } = useEventUpcoming();

  // Dữ liệu Hoạt động nổi bật (Chuyển từ trang Tuyển dụng)
  const highlights = [
    {
      title: "Teambuilding & Du Lịch Thường Niên",
      desc: "Gắn kết tập thể qua những chuyến trải nghiệm, nâng cao tinh thần đồng đội và tái tạo năng lượng cho toàn bộ cán bộ nhân viên.",
      icon: Users,
      badge: "Gắn kết",
    },
    {
      title: "Hội Thảo & Training Chuyên Môn",
      desc: "Cập nhật liên tục kiến thức Thuế, Kế toán và Công nghệ phần mềm giúp nâng cao năng lực chuyên môn định kỳ.",
      icon: Award,
      badge: "Đào tạo",
    },
    {
      title: "Hoạt Động Thiện Nguyện & Cộng Đồng",
      desc: "Lan tỏa tinh thần trách nhiệm xã hội, chung tay vì các hoạt động nghĩa tình và hỗ trợ sự phát triển cộng đồng.",
      icon: Heart,
      badge: "Trách nhiệm",
    },
  ];

  // Dữ liệu Văn hóa & Con người (Chuyển từ Trang chủ)
  const cultureList = [
    {
      title: "Tận Tâm Phục Vụ",
      desc: "Mỗi thành viên Kim Hồng Thịnh luôn lấy sự thành công và hài lòng của Khách hàng làm thước đo giá trị cốt lõi.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    },
    {
      title: "Môi Trường Trẻ & Năng Động",
      desc: "Khuyến khích tư duy sáng tạo, chủ động đề xuất giải pháp mới và tạo điều kiện tối đa để hỗ trợ lẫn nhau.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    },
    {
      title: "Đoàn Kết & Phát Triển",
      desc: "Môi trường làm việc minh bạch, tạo điều kiện tối đa để mỗi cá nhân phát huy năng lực và bứt phá giới hạn bản thân.",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
    },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* 1. Header Banner Sự kiện 
      <EventHeader events={eventUpcomingData?.events} isLoading={isLoadingUpcoming} />

      2. Thanh tìm kiếm sự kiện
      <EventSearch />*/}

      {/* 5. KHỐI 1: HOẠT ĐỘNG NỔI BẬT */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Hoạt Động Nổi Bật
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Những mốc hoạt động tạo nên môi trường làm việc năng động và nhiệt huyết tại Kim Hồng Thịnh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow p-6 border border-gray-100 flex flex-col justify-between hover:shadow-md transition duration-200"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-md">
                        <IconComp size={28} />
                      </div>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="font-bold text-xl text-gray-800 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. KHỐI 2: VĂN HÓA & CON NGƯỜI */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Văn Hóa Làm Việc & Giá Trị Cốt Lõi
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Xây dựng tập thể đoàn kết, chuyên nghiệp và luôn hướng tới giá trị thực cho khách hàng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cultureList.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow overflow-hidden border border-gray-100 flex flex-col hover:shadow-md transition duration-200">
                {/* Chiều cao ảnh h-48 bằng chuẩn với các card bài viết trong EventFinish */}
                <div className="relative w-full h-48 overflow-hidden bg-gray-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <h4 className="absolute bottom-3 left-4 right-4 text-white font-bold text-lg">
                    {item.title}
                  </h4>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-gray-600 text-base leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. KHỐI 3: SỰ KIỆN ĐÃ DIỄN RA (Giữ nguyên component gốc) */}
      <EventFinish events={eventPastData?.events} isLoading={isLoadingPast} />

      {/* 3. Sự kiện sắp diễn ra (Nếu có) */}
      <EventComing events={eventUpcomingData?.events} isLoading={isLoadingUpcoming} />

      {/* 7. Form cập nhật/đăng ký sự kiện (Giữ nguyên của em) */}
      {/*<EventForm />*/}
    </div>
  );
}