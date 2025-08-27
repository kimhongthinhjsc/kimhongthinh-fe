import "./Introduce.scss";
import React, { useEffect, useState } from "react";
import SomethingAbout from "./SomethingAbout";
import VideoSection from "./VideoSection";
import RoadSection from "./RoadSection";
import BehaviorRules from "./BehaviorRules";
import CoreValue from "./CoreValue";
import ClientsTestimonials from "./ClientsTestimonials";
import IntroduceSkeleton from "./IntroduceSkeleton";
import FadeInWhenVisible from "~/components/FramerMotion/FadeInWhenVisible";
import { useIntroduce } from "~/hooks/usePublic";

export default function Introduce() {
  const { data: introduceData, isLoading } = useIntroduce();
  if (isLoading) {
    return (
      <>
        <IntroduceSkeleton />
      </>
    );
  }

  return (
    <>
      <div className="w-full">
        <FadeInWhenVisible>
          <section id="sds_banner">
            <img
              src={introduceData?.banner || ""}
              alt="Kim Hồng Thịnh JSC"
              className="w-full h-28 sm:h-40 md:h-48 lg:h-60 object-cover"
            />
          </section>
        </FadeInWhenVisible>
        <FadeInWhenVisible delay={0.2}>
          <SomethingAbout data={introduceData?.somethingAbout} />
        </FadeInWhenVisible>
        <FadeInWhenVisible delay={0.4}>
          <VideoSection data={introduceData?.videoSection} />
        </FadeInWhenVisible>
        <FadeInWhenVisible delay={0.6}>
          <RoadSection data={introduceData?.roadSection} />
        </FadeInWhenVisible>
        <FadeInWhenVisible delay={0.8}>
          <BehaviorRules data={introduceData?.behaviorRules} />
        </FadeInWhenVisible>
        <FadeInWhenVisible delay={1.0}>
          <CoreValue data={introduceData?.coreValue} />
        </FadeInWhenVisible>
        <FadeInWhenVisible delay={1.2}>
          <ClientsTestimonials data={introduceData?.testimonials} />
        </FadeInWhenVisible>
      </div>
    </>
  );
}
