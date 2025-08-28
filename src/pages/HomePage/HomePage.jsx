import HeroSection from "./HeroSection";
import Ecosystem from "~/components/Ecosystem/Ecosystem";
import Testimonial from "~/components/Testimonial/Testimonial";
import ContactHotline from "~/components/ContactHotline/ContactHotline";
import CulturePeople from "~/components/CulturePeople/CulturePeople";
import Partners from "~/components/Partners/Partners";
import News from "~/components/News/News";
import HomePageSkeleton from "./HomePageSkeleton";
import FadeInWhenVisible from "~/components/FramerMotion/FadeInWhenVisible";
import { useHome } from "~/hooks/usePublic";

export default function HomePage() {
  const { data: homeData, isLoading } = useHome();

  return (
    <>
      {isLoading ? (
        <HomePageSkeleton />
      ) : (
        <>
          <FadeInWhenVisible>
            <HeroSection data={homeData?.hero} />
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2}>
            <Ecosystem data={homeData?.ecosystem} />
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.3}>
            <Testimonial data={homeData?.testimonial} />
          </FadeInWhenVisible>

          <CulturePeople data={homeData?.culture} />

          <FadeInWhenVisible delay={0.3}>
            <Partners data={homeData?.partners} />
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.3}>
            <News data={homeData?.news} />
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.3} direction="bottom">
            <ContactHotline data={homeData?.contact} />
          </FadeInWhenVisible>
         
        </>
      )}
    </>
  );
}
