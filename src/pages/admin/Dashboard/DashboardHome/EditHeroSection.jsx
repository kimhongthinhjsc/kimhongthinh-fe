import React from "react";
import EditableField from "~/components/EditableField/EditableField";
import EditableImage from "~/components/EditableImage/EditableImage";

export default function EditHeroSection({ data, onChange }) {
  const hero = data?.hero ?? {};

  const setHero = (patch) => onChange("hero", { ...hero, ...patch });

  const updateStat = (idx, patch) => {
    const list = [...(hero.stats || [])];
    list[idx] = { ...list[idx], ...patch };
    setHero({ stats: list });
  };

  const addStat = () => {
    const list = [...(hero.stats || [])];
    list.push({
      img: "",
      number: 0,
      suffix: "+",
      text: "",
    });
    setHero({ stats: list });
  };

  const removeStat = (idx) => {
    const list = [...(hero.stats || [])];
    list.splice(idx, 1);
    setHero({ stats: list });
  };

  return (
    <section
      id="sec1"
      className="relative min-h-[calc(100vh-80px)] flex items-center justify-center bg-cover bg-center bg-no-repeat text-white py-4 overflow-hidden rounded-2xl mb-8"
      style={{
        backgroundImage: `url('${hero.background || ""}')`,
      }}
    >
      {/* Overlay gradient chuẩn Client */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-blue-950/70 z-0" />

      {/* Nút chỉnh sửa Background Image nổi bật */}
      <div className="absolute top-4 right-4 z-20 bg-slate-900/80 p-2 rounded-xl border border-white/20 backdrop-blur-md">
        <span className="text-xs text-blue-300 block mb-1 font-semibold">Ảnh nền (Background):</span>
        <EditableImage
          src={hero.background}
          onChange={(val) => setHero({ background: val })}
          label="Thay đổi ảnh nền"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5 lg:space-y-6">
        
        {/* Khối Tiêu đề & Mô tả */}
        <div className="max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-medium backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-ping" />
            Giải Pháp Doanh Nghiệp Toàn Diện
          </div>

          <div className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight text-white [&>strong]:text-blue-400">
            <EditableField
              value={hero.title}
              onChange={(val) => setHero({ title: val })}
              placeholder="Nhập tiêu đề lớn..."
            />
          </div>

          <div className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed max-w-3xl">
            <EditableField
              value={hero.subtitle}
              onChange={(val) => setHero({ subtitle: val })}
              multiline
              placeholder="Nhập mô tả ngắn (subtitle)..."
            />
          </div>
        </div>

        {/* Khối Thống kê (Stats) - Chuẩn 4 cột */}
        {hero.stats && hero.stats.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {hero.stats.map((s, i) => (
              <div
                key={i}
                className="group flex flex-col items-center text-center bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/10 p-4 rounded-2xl transition-all duration-300 relative shadow-lg"
              >
                {/* Nút xóa item stats */}
                <button
                  type="button"
                  onClick={() => removeStat(i)}
                  className="absolute top-2 right-2 text-red-400 hover:text-white bg-red-500/20 hover:bg-red-600 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors"
                  title="Xóa cột này"
                >
                  ✕
                </button>

                <div className="p-2.5 rounded-xl bg-blue-500/20 mb-2 group-hover:scale-110 transition-transform duration-300">
                  <EditableImage
                    src={s.img}
                    onChange={(val) => updateStat(i, { img: val })}
                    label="Icon"
                  />
                </div>

                <div className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center justify-center gap-1 w-full my-1">
                  <EditableField
                    value={s.number}
                    onChange={(val) => updateStat(i, { number: val })}
                    type="number"
                    placeholder="0"
                  />
                  <EditableField
                    value={s.suffix}
                    onChange={(val) => updateStat(i, { suffix: val })}
                    placeholder="+"
                    className="text-blue-400"
                  />
                </div>

                <div className="text-xs sm:text-sm text-gray-300 font-medium mt-1 w-full">
                  <EditableField
                    value={s.text}
                    onChange={(val) => updateStat(i, { text: val })}
                    multiline
                    placeholder="Nhập nội dung..."
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={addStat}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg transition-all"
          >
            + Thêm cột thống kê
          </button>
        </div>

        {/* Khối Slogan & Chuyển Đổi Dịch Vụ */}
        <div className="relative bg-slate-900/70 backdrop-blur-xl border border-blue-400/20 p-5 sm:p-6 rounded-2xl shadow-2xl shadow-blue-950/50 overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid md:grid-cols-12 gap-5 items-center relative z-10">
            
            {/* Vế trái */}
            <div className="md:col-span-5 space-y-2 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-lg border border-blue-400/30">
                <span>💎</span> Giải Pháp Song Hành
              </span>

              <div className="flex items-center gap-3 pt-1">
                <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-400/30 text-blue-400 hidden sm:block">
                  <i className="fa-solid fa-layer-group text-xl" />
                </div>
                
                <div className="w-full">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase leading-snug">
                    <EditableField
                      value={hero.sloganTitle}
                      onChange={(val) => setHero({ sloganTitle: val })}
                      placeholder="CNTT & KẾ TOÁN THUẾ"
                    />
                  </h3>
                  <div className="text-blue-400 font-medium text-xs sm:text-sm mt-0.5">
                    <EditableField
                      value={hero.sloganDesc}
                      onChange={(val) => setHero({ sloganDesc: val })}
                      placeholder="Tối ưu công nghệ • Minh bạch tài chính"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Vế phải */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs sm:text-sm text-gray-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check text-blue-400 text-xs" /> Hỗ trợ kỹ thuật nhanh chóng
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check text-blue-400 text-xs" /> Tối ưu chi phí doanh nghiệp
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="flex items-center gap-2 w-full">
                  <span className="text-xs text-gray-300 whitespace-nowrap">Đường dẫn liên kết:</span>
                  <EditableField
                    value={hero.link}
                    onChange={(val) => setHero({ link: val })}
                    type="url"
                    placeholder="https://..."
                    className="w-full"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
