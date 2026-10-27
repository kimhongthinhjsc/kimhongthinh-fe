import React from "react";
import { Star, Quote } from "lucide-react";
import avatarHung from "~/assets/images/hung.jpg"; 
import avatarMai from "~/assets/images/mai.jpg";   
import avatarBe from "~/assets/images/be.jpg";

export default function Testimonial({ data }) {
  // Mẫu dữ liệu mặc định nếu data truyền vào chưa có items
  const defaultItems = [
    {
      author: "Anh Phạm Văn Hùng",
      position: "Giám đốc - DNTN Tiệm Vàng",
      content: "Kim Hồng Thịnh hỗ trợ chuyển đổi hóa đơn điện tử và chữ ký số rất nhanh chóng. Đội ngũ kỹ thuật hỗ trợ tận tình, xử lý sự cố ngay trong ngày nên chúng tôi rất yên tâm.",
      rating: 5,
      image: avatarHung
    },
    {
      author: "Chị Trần Thị Mai",
      position: "Chủ Chuỗi Cửa Hàng Mỹ Phẩm & Thời Trang",
      content: "Từ khi triển khai phần mềm POS365 và máy tính tiền do Kim Hồng Thịnh cung cấp, việc quản lý tồn kho và báo cáo doanh thu hàng ngày của cửa hàng trở nên nhẹ nhàng hơn hẳn.",
      rating: 5,
      image: avatarMai
    },
    {
      author: "Chị Phan Kim Oanh",
      position: "Kế toán trưởng",
      content: "Dịch vụ kế toán trọn gói rất chuyên nghiệp. Các báo cáo thuế luôn chính xác, đúng hạn. Mỗi khi có quy định thuế mới đều được các bạn chủ động tư vấn chi tiết.",
      rating: 5,
      image: avatarBe
    }
  ];

  // Lấy dữ liệu từ props hoặc dùng defaultItems
  const testimonialsList = data?.items || data?.testimonials || defaultItems;

  return (
    <section className="py-16 md:py-24 bg-slate-50/80 relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14" data-aos="fade-up">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-4 py-1.5 rounded-full border border-amber-200/80 inline-block mb-3">
            Đánh Giá Thực Tế
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Khách Hàng Nói Gì Về <span className="text-amber-600">Kim Hồng Thịnh</span>?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Sự hài lòng và tin tưởng của Quý doanh nghiệp là thước đo thành công lớn nhất của chúng tôi.
          </p>
        </div>

        {/* Testimonials Grid (3 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {testimonialsList.map((item, idx) => (
            <div 
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="bg-white p-7 sm:p-8 rounded-3xl border border-amber-200/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-amber-100 group-hover:text-amber-200/80 transition-colors pointer-events-none" />
              
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-slate-600 text-sm leading-relaxed italic mb-6 relative z-10">
                  "{item.content || "Nội dung chia sẻ từ khách hàng..."}"
                </p>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <img 
                  src={item.image || "https://via.placeholder.com/150"} 
                  alt={item.author || "Khách hàng"} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-400/30 shrink-0"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{item.author || "Tên khách hàng"}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{item.position || "Chức danh"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}