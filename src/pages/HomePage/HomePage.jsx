import HeroSection from "./HeroSection";
import DualCoreServices from "~/components/DualCoreServices/DualCoreServices";
import Ecosystem from "~/components/Ecosystem/Ecosystem";
import AccountingServices from "~/components/AccountingServices/AccountingServices"; // 1. Sửa dấu ~ ở đây
//import Testimonial from "~/components/Testimonial/Testimonial";
import ContactHotline from "~/components/ContactHotline/ContactHotline";
import CulturePeople from "~/components/CulturePeople/CulturePeople";
import Partners from "~/components/Partners/Partners";
import News from "~/components/News/News";
import HomePageSkeleton from "./HomePageSkeleton";
// Thay đổi import nếu em dùng file mới TestimonialsSection
import TestimonialsSection from "~/components/TestimonialsSection/TestimonialsSection";
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

          {/* Đặt DualCoreServices ngay sau HeroSection */}
          <FadeInWhenVisible delay={0.1}>
            <DualCoreServices data={homeData?.dualCore} />
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.1}>
            <Ecosystem data={homeData?.ecosystem} />
          </FadeInWhenVisible>

          {/* 2. ĐẶT KHỐI 4 MỚI VÀO ĐÂY */}
          <FadeInWhenVisible delay={0.1}>
            <AccountingServices data={homeData?.accounting} />
          </FadeInWhenVisible>

          {/*<FadeInWhenVisible delay={0.1}>
            <Testimonial data={homeData?.testimonial} />
          </FadeInWhenVisible>*/}

          {/*<CulturePeople data={homeData?.culture} />*/}

          <FadeInWhenVisible delay={0.1}>
            <Partners data={homeData?.partners} />
          </FadeInWhenVisible>

          {/*<FadeInWhenVisible delay={0.1}>
            <News data={homeData?.news} />
          </FadeInWhenVisible>*/}

          {/* KHỐI 5 MỚI: Testimonials (Đặt ngay sau Partners, truyền data fallback nếu backend chưa có) */}
          <FadeInWhenVisible delay={0.1}>
            <TestimonialsSection data={homeData?.testimonial || {}} />
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.1} direction="bottom">
            <ContactHotline data={homeData?.contact} />
          </FadeInWhenVisible>
        </>
      )}
    </>
  );
}