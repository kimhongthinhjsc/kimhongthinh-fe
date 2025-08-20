import FramePage from "~/components/FramePage/FramePage";
import HeroSection from "./HeroSection";
import Ecosystem from "~/components/Ecosystem/Ecosystem";
import Testimonial from "~/components/Testimonial/Testimonial";
import ContactHotline from "~/components/ContactHotline/ContactHotline";
import CulturePeople from "~/components/CulturePeople/CulturePeople";
import Partners from "~/components/Partners/Partners";
import News from "~/components/News/News";
import { useEffect, useState } from "react";
import { fetchHomeData } from "~/services/publicAPI";
import HomePageSkeleton from "./HomePageSkeleton";
import FadeInWhenVisible from "~/components/FramerMotion/FadeInWhenVisible";
import MorphExample from "~/components/FramerMotion/MorphExample";
import MorphInWhenVisible from "~/components/FramerMotion/MorphInWhenVisible";

export default function HomePage() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchHomeData();
        setHomeData(data);
      } catch (err) {
        console.error("Failed to fetch home data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <FramePage>
      {loading ? (
        <HomePageSkeleton />
      ) : (
        <>
          <FadeInWhenVisible>
            <HeroSection data={homeData?.hero} />
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2}>
            <Ecosystem data={homeData?.ecosystem} />
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.4}>
            <Testimonial data={homeData?.testimonial} />
          </FadeInWhenVisible>

          <CulturePeople data={homeData?.culture} />

          <FadeInWhenVisible delay={1.2}>
            <Partners data={homeData?.partners} />
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={1.0}>
            <News data={homeData?.news} />
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={1.2} direction="bottom">
            <ContactHotline data={homeData?.contact} />
          </FadeInWhenVisible>
        </>
      )}
    </FramePage>
  );
}
