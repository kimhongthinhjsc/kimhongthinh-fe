import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Messenger from "../Messenger/Messenger";
import Phone from "../Phone/Phone";
import ChatZalo from "../ChatZalo/ChatZalo";
import { Outlet } from "react-router-dom";
import { useCompanyInfo } from "~/hooks/useCompanyInfo";

export default function FramePage() {
  const { data: profile, isLoading } = useCompanyInfo();

  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar profile={profile} />

      <main className="relative flex-1 w-full min-h-[300px]">
        <Outlet />

        <div className="fixed bottom-6 right-6 flex flex-col gap-3">
          <Messenger chatMessenger={profile?.social?.messenger} />
          <ChatZalo chatZalo={profile?.social?.zalo} />
          <Phone phoneNumber={profile?.hotline1} />
        </div>
      </main>

      <Footer profile={profile} />
    </div>
  );
}
