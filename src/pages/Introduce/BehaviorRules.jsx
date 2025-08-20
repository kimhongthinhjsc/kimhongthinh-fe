export default function BehaviorRules({ data }) {
  if (!data) return null; // Chờ data load

  return (
    <section id="sdsc_behavior_rules" className="mb-40">
      {/* Banner */}
      <div className="container mx-auto px-4">
        <div className="relative flex flex-col items-center">
          <img
            src={data.banner}
            alt="Behavior Rules Banner"
            className="w-full max-w-5xl"
          />
          <a
            href="#"
            className="absolute bottom-6 right-6 bg-white shadow-md rounded-full flex items-center px-6 py-2 text-sm font-semibold hover:bg-gray-100 transition"
          >
            Xem thêm
            <img
              src="https://softdreams.vn/wp-content/uploads/2023/11/Group-2609256.png"
              alt="arrow"
              className="ml-2 w-4"
            />
          </a>
        </div>

        {/* Mission */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-2xl font-bold text-[#EF5627] mb-4">{data.mission.title}</h3>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">{data.mission.text}</p>
          </div>
          <div className="flex justify-center">
            <img
              src="https://softdreams.vn/wp-content/uploads/2023/11/Group-2609257-2.png"
              alt="Mission"
              className="max-w-sm md:max-w-md w-full"
            />
          </div>
        </div>
      </div>

      {/* Vision */}
      <div className="bg-[#FDEEE9] py-20 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex justify-center">
              <img
                src="https://softdreams.vn/wp-content/uploads/2023/12/Subtract.png"
                alt="Vision"
                className="max-w-sm md:max-w-md w-full"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#EF5627] mb-4">{data.vision.title}</h3>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">{data.vision.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
