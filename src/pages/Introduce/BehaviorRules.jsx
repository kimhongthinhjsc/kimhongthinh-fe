export default function BehaviorRules({ data }) {
  if (!data) return null; // Chờ data load

  return (
    <section id="sdsc_behavior_rules" className="mb-40">
      {/* Banner */}
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="relative flex flex-col items-center">
          <img
            src={data.banner}
            alt="Behavior Rules Banner"
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Mission */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-[#EF5627] mb-4">
              {data.mission.title}
            </h3>
            <p className="text-gray-700 leading-relaxed text-base">
              {data.mission.text}
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src={data?.mission?.image || ""}
              alt="Mission"
              className="w-full max-w-lg rounded-lg shadow"
            />
          </div>
        </div>
      </div>

      {/* Vision */}
      <div className="bg-white py-10 mt-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center order-1 md:order-none">
              <img
                src={data?.vision?.image || ""}
                alt="Vision"
                className="w-full max-w-lg rounded-lg shadow"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#EF5627] mb-4">
                {data.vision.title}
              </h3>
              <p className="text-gray-700 leading-relaxed text-base">
                {data.vision.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
