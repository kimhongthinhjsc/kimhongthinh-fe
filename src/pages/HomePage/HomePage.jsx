import "./HomePage.scss";
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
export default function HomePage() {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchHomeData();
      setHomeData(data);
    };
    loadData();
  }, []);

  return (
    <FramePage>
      <HeroSection data={homeData?.hero}/>
      <Ecosystem />
      <Testimonial />
      <CulturePeople />
      <Partners />
      <News />
      <ContactHotline />
    </FramePage>
  );
}
