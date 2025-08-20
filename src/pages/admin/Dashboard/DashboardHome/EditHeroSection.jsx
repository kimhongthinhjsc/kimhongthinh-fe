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
      className="relative w-full bg-cover bg-center bg-no-repeat text-white rounded-xl overflow-hidden"
      style={{ backgroundImage: `url('${hero.background || ""}')` }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 p-6 md:p-10">
        <div className="mb-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 inline-flex items-center gap-3">
          <span className="text-sm opacity-80">Ảnh nền:</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          <EditableField
            value={hero.title}
            onChange={(val) => setHero({ title: val })}
            placeholder="Tiêu đề lớn"
          />
        </h2>

        <div className="text-base md:text-lg mb-8 max-w-3xl">
          <EditableField
            value={hero.subtitle}
            onChange={(val) => setHero({ subtitle: val })}
            multiline
            placeholder="Mô tả ngắn (subtitle)"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {(hero.stats || []).map((s, i) => (
            <div
              key={i}
              className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10"
            >
           

              <EditableImage
                src={s.img}
                onChange={(val) => updateStat(i, { img: val })}
                label="Icon"
              />

              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <div className="text-sm font-semibold">Số lượng</div>
                  <EditableField
                    value={s.number}
                    onChange={(val) => updateStat(i, { number: val })}
                    type="number"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="mt-3">
                <div className="text-sm font-semibold">Nội dung</div>
                <EditableField
                  value={s.text}
                  onChange={(val) => updateStat(i, { text: val })}
                  multiline
                  placeholder={"Ví dụ:\nNăm kinh nghiệm\ntrong lĩnh vực CNTT"}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white/10 rounded-xl p-5 backdrop-blur-sm border border-white/10">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-xl font-bold">
                <EditableField
                  value={hero.sloganTitle}
                  onChange={(val) => setHero({ sloganTitle: val })}
                  placeholder="Tiêu đề slogan (ví dụ: SOFTDREAMS)"
                />
                <hr className="border-t border-white/30 my-2" />
                <EditableField
                  value={hero.sloganDesc}
                  onChange={(val) => setHero({ sloganDesc: val })}
                  placeholder="Mô tả ngắn slogan"
                />
              </div>
            </div>

            <div className="text-base leading-relaxed">
              <div className="mt-4 flex items-center gap-2">
                <span>Liên kết:</span>
                <EditableField
                  value={hero.link}
                  onChange={(val) => setHero({ link: val })}
                  type="url"
                  placeholder="https://..."
                  className="w-full sm:min-w-[240px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none ring-2 ring-blue-400/40 rounded-xl" />
    </section>
  );
}
