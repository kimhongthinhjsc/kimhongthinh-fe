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
 const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchHomeData();
      setHomeData(data);
      setLoading(false);
    };
    loadData();
  }, []);



  return (
    <FramePage>
      <HeroSection data={homeData?.hero}/>
      <Ecosystem data={homeData?.ecosystem} />
      <Testimonial data={homeData?.testimonial} />
      <CulturePeople data={homeData?.culture} />
      <Partners data={homeData?.partners} />
      <News data={homeData?.news} />
      <ContactHotline data={homeData?.contact} />
    </FramePage>
  );
}
