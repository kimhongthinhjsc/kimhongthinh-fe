import { CONTACT_INFO } from "~/utils/constants";
import { useState } from "react";
import { Menu, X, Headset } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow fixed top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-xl font-bold text-blue-950">Kim Hồng Thịnh</div>

        {/* Desktop Navigation & Button */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-6 font-medium text-gray-700">
            <a href="/" className="hover:text-blue-600 transition-colors">Trang chủ</a>
            <a href="/gioi-thieu" className="hover:text-blue-600 transition-colors">Giới thiệu</a>
            
            {/* Mega Menu */}
            <div className="group relative">
              <button className="hover:text-blue-600 transition-colors flex items-center gap-1">Sản phẩm</button>
              <div className="absolute left-0 hidden group-hover:grid grid-cols-3 gap-6 bg-white shadow-xl rounded-xl p-6 w-[600px] border border-gray-100 top-full mt-1">
                <div>
                  <h4 className="font-bold text-blue-900 mb-2">Máy tính văn phòng</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li><a href="#" className="hover:text-blue-600">Máy tính bàn</a></li>
                    <li><a href="#" className="hover:text-blue-600">Máy in</a></li>
                    <li><a href="#" className="hover:text-blue-600">Bộ máy tính build</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 mb-2">Thiết bị POS</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li><a href="#" className="hover:text-blue-600">POS bán hàng</a></li>
                    <li><a href="#" className="hover:text-blue-600">POS cầm tay</a></li>
                    <li><a href="#" className="hover:text-blue-600">Máy in bill</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 mb-2">Phần mềm</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li><a href="#" className="hover:text-blue-600">Quản lý bán hàng</a></li>
                    <li><a href="#" className="hover:text-blue-600">Quản trị nhân lực</a></li>
                    <li><a href="#" className="hover:text-blue-600">Kế toán</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <a href="/dich-vu" className="hover:text-blue-600 transition-colors">Dịch vụ</a>
            <a href="/tin-tuc" className="hover:text-blue-600 transition-colors">Tin tức</a>
            <a href="/tuyen-dung" className="hover:text-blue-600 transition-colors">Tuyển dụng</a>
            <a href="/su-kien" className="hover:text-blue-600 transition-colors">Sự kiện</a>
          </nav>

          {/* Nút Tư Vấn Ngay Desktop */}
          <a
            href={CONTACT_INFO?.ZALO_LINK || "https://zalo.me/0366660237"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-500/20 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Headset size={18} />
            <span>Tư Vấn Ngay</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-gray-700">
          {open ? <X size={28}/> : <Menu size={28}/>}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg p-4 space-y-3 font-medium text-gray-700">
          <a href="/" className="block">Trang chủ</a>
          <a href="/gioi-thieu" className="block">Giới thiệu</a>
          <details>
            <summary className="cursor-pointer py-1">Sản phẩm</summary>
            <ul className="pl-4 space-y-1 text-sm text-gray-600 py-1">
              <li><a href="#">Máy tính văn phòng</a></li>
              <li><a href="#">Thiết bị POS</a></li>
              <li><a href="#">Phần mềm</a></li>
            </ul>
          </details>
          <a href="/dich-vu" className="block">Dịch vụ</a>
          <a href="/tin-tuc" className="block">Tin tức</a>
          <a href="/tuyen-dung" className="block">Tuyển dụng</a>
          <a href="/su-kien" className="block">Sự kiện</a>

          {/* Nút Tư Vấn Ngay Mobile */}
          <div className="pt-2">
            <a
              href={CONTACT_INFO?.ZALO_LINK || "https://zalo.me/0366660237"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl shadow-md"
            >
              <Headset size={18} />
              <span>Tư Vấn Ngay</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}