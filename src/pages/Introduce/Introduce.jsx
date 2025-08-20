import "./Introduce.scss";
import React, { useEffect, useState } from "react";
import FramePage from "~/components/FramePage/FramePage";
import SomethingAbout from "./SomethingAbout";
import VideoSection from "./VideoSection";
import RoadSection from "./RoadSection";
import BehaviorRules from "./BehaviorRules";
import CoreValue from "./CoreValue";
import ClientsTestimonials from "./ClientsTestimonials";
import { getIntroduce } from "~/services/publicAPI";

export default function Introduce() {
  const [introduceData, setIntroduceData] = useState(null);

  useEffect(() => {
    const fetchIntroduceData = async () => {
      const data = await getIntroduce();
      setIntroduceData(data);
    };

    fetchIntroduceData();
  }, []);
  console.log(introduceData);

  return (
    <FramePage>
      <div className="w-full">
        <section id="sds_banner">
          <img
            src={
              introduceData?.banner ||
              "https://softdreams.vn/wp-content/uploads/2024/07/Group-2609653.png"
            }
            alt="SoftDreams Banner"
            className="w-full h-auto"
          />
        </section>

        <SomethingAbout data={introduceData?.somethingAbout} />
        <VideoSection data={introduceData?.videoSection} />
        <RoadSection data={introduceData?.roadSection} />
        <BehaviorRules data={introduceData?.behaviorRules} />
        <CoreValue data={introduceData?.coreValue} />
        <ClientsTestimonials data={introduceData?.testimonials} />
      </div>
    </FramePage>
  );
}
