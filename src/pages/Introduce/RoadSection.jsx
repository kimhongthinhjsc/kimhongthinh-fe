export default function RoadSection({ data }) {
  if (!data) return null; // Chờ data load

  return (
    <section id="sdsc_road" className="py-12 bg-white">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">
          {data.title.split(" ").slice(0, 1).join(" ")}{" "}
          <span className="text-[#EF5627]">
            {data.title.split(" ").slice(1).join(" ")}
          </span>
        </h2>
      </div>

      <div className="sdsc-road-img mt-8 flex justify-center">
        <img
          className="max-w-full md:max-w-5xl"
          src={data.image}
          alt={data.title}
        />
      </div>
    </section>
  );
}
