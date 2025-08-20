import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Messenger from "../Messenger/Messenger";
import Phone from "../Phone/Phone";
import ChatZalo from "../ChatZalo/ChatZalo";

export default function FramePage({ children }) {
  return (
    <div className="relative flex flex-col h-max">
      <Navbar />

      <main className="relative min-h-[300px] h-max w-full mb-[50px]">
        {children}

        <div className="fixed bottom-6 right-6 flex flex-col gap-3">
          <Messenger />
          <ChatZalo />
          <Phone />
        </div>
      </main>

      <Footer />
    </div>
  );
}
