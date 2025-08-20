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
      {loading ? (
        // ✅ Skeleton khi đang loading
        <div className="animate-pulse space-y-8 p-6">
          {/* Hero */}
          <div className="h-64 bg-gray-200 rounded-lg" />

          {/* Ecosystem */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg" />
            ))}
          </div>

          {/* Testimonial */}
          <div className="h-40 bg-gray-200 rounded-lg" />

          {/* CulturePeople */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg" />
            ))}
          </div>

          {/* Partners */}
          <div className="h-24 bg-gray-200 rounded-lg" />

          {/* News */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded-lg" />
            ))}
          </div>

          {/* Contact */}
          <div className="h-20 bg-gray-200 rounded-lg" />
        </div>
      ) : (
        <>
          <HeroSection data={homeData?.hero} />
          <Ecosystem data={homeData?.ecosystem} />
          <Testimonial data={homeData?.testimonial} />
          <CulturePeople data={homeData?.culture} />
          <Partners data={homeData?.partners} />
          <News data={homeData?.news} />
          <ContactHotline data={homeData?.contact} />
        </>
      )}
    </FramePage>
  );
}
                                                                                        