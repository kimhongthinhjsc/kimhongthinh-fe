import Counter from "~/components/Counter/Counter";

export default function HeroSection({ data }) {
  if (!data) return null; // chưa có data thì không render

  return (
    <section
      id="sec1"
      className="section-gap relative bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage: `url('${data.background}')`,
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <div
          data-aos="fade-right"
          className="text-3xl md:text-5xl font-bold mb-4"
          dangerouslySetInnerHTML={{ __html: data.title }}
        />

        {/* Subtitle */}
        <div
          data-aos="fade-left"
          className="text-base md:text-lg mb-8"
          dangerouslySetInnerHTML={{ __html: data.subtitle }}
        />

        {/* Stats */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          data-aos="fade-up"
        >
          {data.stats?.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center bg-black/30 p-4 rounded-xl"
            >
              <img src={item.img} alt="" className="w-12 h-12 mb-3" />
              <div className="text-2xl font-bold">
                <Counter target={item.number} />
                {item.suffix}
              </div>
              <div className="text-sm md:text-base whitespace-pre-line">
                {item.text}
              </div>
            </div>
          ))}
        </div>

        {/* Slogan */}
        <div data-aos="zoom-in" className="bg-black/40 p-6 rounded-xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-2xl font-bold">
                {data.sloganTitle}
                <hr className="border-t border-white my-2" />
                {data.sloganDesc}
              </div>
            </div>
            <div className="text-base leading-relaxed">
              {data.sloganContent}
              <a
                href={data.link}
                className="mt-4 inline-flex items-center gap-2 text-blue-400 hover:underline"
              >
                Đọc thêm <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
    </section>
  );
}
