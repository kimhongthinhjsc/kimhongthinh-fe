import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Messenger from "../Messenger/Messenger";
import Phone from "../Phone/Phone";
import ChatZalo from "../ChatZalo/ChatZalo";
import { getCompanyProfile } from "~/services/publicAPI";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function FramePage({ children }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getCompanyProfile();
      setProfile(data);
    };
    fetchProfile();
  }, []);

  if (!profile) {
    return null;
  }
  return (
    <div className="relative flex flex-col h-max">
      <Navbar profile={profile} />

      <main className="relative min-h-[300px] h-max w-full ]">
        {children}

        <div className="fixed bottom-6 right-6 flex flex-col gap-3">
          <div className="fixed bottom-6 right-6 flex flex-col gap-3">
            <Messenger chatMessenger={profile?.social.messenger} />
            <ChatZalo chatZalo={profile?.social.zalo} />
            <Phone phone={profile?.hotline1} />
          </div>
        </div>
      </main>

      <Footer profile={profile} />
    </div>
  );
}
