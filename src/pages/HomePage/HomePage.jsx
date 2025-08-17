import "./HomePage.scss";
import FramePage from "~/components/FramePage/FramePage";
import HeroSection from "./HeroSection";
import Ecosystem from "~/components/Ecosystem/Ecosystem";
import Testimonial from "~/components/Testimonial/Testimonial";
import ContactHotline from "~/components/ContactHotline/ContactHotline";
import CulturePeople from "~/components/CulturePeople/CulturePeople";
import Partners from "~/components/Partners/Partners";
import News from "~/components/News/News";
export default function HomePage() {
  return (
    <FramePage>
      <HeroSection />
      <Ecosystem />
      <Testimonial />
      <CulturePeople />
      <Partners />
      <News />
      <ContactHotline />
    </FramePage>
  );
}
