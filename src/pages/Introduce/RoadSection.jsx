import React from "react";
import { Compass, Rocket, ShieldCheck, CheckCircle2 } from "lucide-react";

const defaultVisionMission = {
  vision: {
    title: "TẦM NHÌN",
    subtitle: "Trở thành đối tác công nghệ & giải pháp tài chính hàng đầu",
    description:
      "Kim Hồng Thịnh hướng tới trở thành đơn vị uy tín hàng đầu trong lĩnh vực công nghệ và dịch vụ kế toán – thuế. Chúng tôi không ngừng đổi mới nhằm giúp doanh nghiệp nâng cao năng lực quản trị, tối ưu nguồn lực và phát triển bền vững trong kỷ nguyên số.",
    highlights: [
      "Ứng dụng công nghệ hiện đại vào quản trị tài chính & thuế",
      "Tối ưu chi phí, nâng cao hiệu quả vận hành cho đối tác",
      "Mở rộng hệ sinh thái dịch vụ trên toàn quốc"
    ]
  },
  mission: {
    title: "SỨ MỆNH",
    subtitle: "Đồng hành & nâng tầm quản trị doanh nghiệp",
    description:
      "Chúng tôi mang đến các giải pháp công nghệ và tài chính – thuế toàn diện, chuẩn xác và tuân thủ pháp luật. Bằng chuyên môn sâu và sự tận tâm, Kim Hồng Thịnh cam kết kiến tạo nền tảng quản trị minh bạch, đồng hành cùng sự tăng trưởng lâu dài của doanh nghiệp.",
    highlights: [
      "Giải pháp thiết thực, chính xác và tuân thủ pháp lý",
      "Đội ngũ tư vấn chuyên nghiệp, tận tâm và trách nhiệm",
      "Tạo nền tảng vững chắc cho sự tăng trưởng lâu dài"
    ]
  }
};

export default function RoadSection({ data }) {
  const vision = data?.vision || defaultVisionMission.vision;
  const mission = data?.mission || defaultVisionMission.mission;

  return (
    <section id="sdsc_road" className="py-12 sm:py-16 bg-slate-50/60">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 border border-amber-300/60 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            Định Hướng Phát Triển
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            TẦM NHÌN & SỨ MỆNH
          </h2>
          <p className="mt-2 text-slate-600 text-base sm:text-lg">
            Kim chỉ nam cho mọi hoạt động và cam kết chất lượng dịch vụ của Kim Hồng Thịnh
          </p>
        </div>

        {/* BỐ CỤC 2 CỘT SONG SONG */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          
          {/* KHỐI 1: TẦM NHÌN */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>

            <div>
              {/* Header Card */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3.5 bg-amber-50 text-amber-600 rounded-2xl border border-amber-200/60 shrink-0">
                  <Compass className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-extrabold text-amber-600 tracking-widest uppercase">
                    Khát vọng tương lai
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                    {vision.title}
                  </h3>
                </div>
              </div>

              {/* Subtitle & Description */}
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 leading-snug">
                {vision.subtitle}
              </h4>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                {vision.description}
              </p>
            </div>

            {/* List Điểm nổi bật */}
            <div className="space-y-3 pt-5 border-t border-slate-200/80">
              {vision.highlights?.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-slate-800 text-sm sm:text-base font-semibold leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* KHỐI 2: SỨ MỆNH */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl group-hover:bg-amber-400/20 transition-all"></div>

            <div>
              {/* Header Card */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3.5 bg-slate-800 text-amber-400 rounded-2xl border border-slate-700/80 shrink-0">
                  <Rocket className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-extrabold text-amber-400 tracking-widest uppercase">
                    Cam kết hành động
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {mission.title}
                  </h3>
                </div>
              </div>

              {/* Subtitle & Description */}
              <h4 className="text-lg sm:text-xl font-bold text-amber-400 mb-4 leading-snug">
                {mission.subtitle}
              </h4>
              <p className="text-slate-100 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                {mission.description}
              </p>
            </div>

            {/* List Điểm nổi bật */}
            <div className="space-y-3 pt-5 border-t border-slate-800">
              {mission.highlights?.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-slate-100 text-sm sm:text-base font-semibold leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}