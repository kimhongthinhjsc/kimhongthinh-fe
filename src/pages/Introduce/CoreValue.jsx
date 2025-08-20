export default function CoreValue({ data }) {
  if (!data) return null; // Chờ data load

  return (
    <section id="sdsc_core_value" className="py-16">
      {/* Title */}
      <h2 className="text-center text-3xl md:text-4xl font-bold">
        {data.title.split(" ")[0]} <span className="text-[#EF5627]">{data.title.split(" ").slice(1).join(" ")}</span>
      </h2>

      {/* Image */}
      <div className="flex justify-center my-10">
        <img
          src={data.image}
          alt="Core Value Banner"
          className="w-full max-w-4xl"
        />
      </div>

      {/* Core Values */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {data.values.map((value) => (
            <div key={value._id} className="flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold text-[#EF5627] mb-4">{value.title}</h3>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">{value.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
