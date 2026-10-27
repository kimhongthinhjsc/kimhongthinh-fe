import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // 1. Tự động cuộn lên đầu trang khi chuyển Route (Code cũ của em)
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  // 2. Hiện nút khi cuộn chuột xuống quá 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // 3. Hàm xử lý khi người dùng bấm vào nút
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Cuộn lên đầu trang"
          /* Đổi right-6 thành right-20 để dời sang trái, và đưa về bottom-6 */
          className="fixed bottom-6 right-20 z-50 p-3 rounded-full bg-amber-500 text-white shadow-xl hover:bg-amber-600 hover:scale-110 active:scale-95 transition-all duration-300 border border-white/20 flex items-center justify-center cursor-pointer group"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </>
  );
}