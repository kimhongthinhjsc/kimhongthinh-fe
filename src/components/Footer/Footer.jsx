// src/components/Footer.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiZalo } from "react-icons/si";
import { getCompanyProfile } from "~/services/publicAPI";

export default function Footer() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getCompanyProfile();
      setProfile(data);
    };
    fetchProfile();
  }, []);

  if (!profile) {
    return null; // hoặc có thể trả ra skeleton loading
  }

  return (
    <footer
      className="bg-[#F0F1F4] text-[#363F69] pt-8 px-6 md:px-20"
      style={{
        backgroundImage:
          "url('https://softdreams.vn/wp-content/themes/softdreams/assets/img/footer-bg.png')",
      }}
    >
      {/* Logo */}
      <div className="flex justify-center md:justify-start mb-6">
        <img
          src={profile.logo}
          alt="Logo"
          className="h-20 md:h-32 w-auto object-contain"
        />
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Cột 1 */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold text-[#EF5627] mb-4">
            {profile.slogan}
          </h2>
          <p className="mb-2">
            📍 <strong>Trụ sở chính:</strong> {profile.addressMain}
          </p>
          <p className="mb-2">
            📍 <strong>Chi nhánh:</strong> {profile.addressBranch}
          </p>
          <p className="mb-2">✉️ {profile.email}</p>
          <p className="mb-2">📞 Mua hàng: {profile.hotline1}</p>
          <p className="mb-2">📞 CSKH: {profile.hotline2}</p>
          {profile.website && (
            <a
              href={profile.website.link}
              className="block mt-2 text-blue-500 hover:text-blue-400"
              target="_blank"
              rel="noreferrer"
            >
              🌐 {profile.website.name}
            </a>
          )}
        </div>

        {/* Cột 2 */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Giới thiệu</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/gioi-thieu" className="hover:text-blue-500">
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link to="/tin-tuc" className="hover:text-blue-500">
                Tin tức
              </Link>
            </li>
            <li>
              <Link to="/tuyen-dung" className="hover:text-blue-500">
                Tuyển dụng
              </Link>
            </li>
            <li>
              <Link to="/su-kien" className="hover:text-blue-500">
                Sự kiện
              </Link>
            </li>
          </ul>
        </div>

        {/* Cột 3 */}
        <div className="flex justify-center md:justify-end">
          <iframe
            src={profile.googleMapsEmbed}
            width="100%"
            height="250"
            className="rounded-lg"
            allowFullScreen
            loading="lazy"
            title="Google Map"
          ></iframe>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-300 pt-6 px-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Social icons */}
          <div className="flex justify-center gap-6 text-2xl text-gray-600">
            {profile.social?.facebook && (
              <a
                href={profile.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-600"
              >
                <FaFacebook />
              </a>
            )}
            {profile.social?.youtube && (
              <a
                href={profile.social.youtube}
                target="_blank"
                rel="noreferrer"
                className="hover:text-red-600"
              >
                <FaYoutube />
              </a>
            )}
            {profile.social?.twitter && (
              <a
                href={profile.social.twitter}
                target="_blank"
                rel="noreferrer"
                className="hover:text-black"
              >
                <FaXTwitter />
              </a>
            )}
            {profile.social?.zalo && (
              <a
                href={profile.social.zalo}
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-500"
              >
                <SiZalo />
              </a>
            )}
            {profile.social?.tiktok && (
              <a
                href={profile.social.tiktok}
                target="_blank"
                rel="noreferrer"
                className="hover:text-black"
              >
                <FaTiktok />
              </a>
            )}
          </div>

          {/* Policy links */}
          <div className="flex flex-col md:flex-row justify-center gap-4 text-sm text-gray-600 text-center">
            <Link to="/dieu-khoan" className="hover:text-blue-500">
              Điều khoản sử dụng
            </Link>
            <Link to="/bao-mat" className="hover:text-blue-500">
              Chính sách bảo mật
            </Link>
            <Link to="/sla" className="hover:text-blue-500">
              Cam kết SLA
            </Link>
            <Link to="/faq" className="hover:text-blue-500">
              Câu hỏi thường gặp
            </Link>
          </div>

          {/* App badges */}
          <div className="flex justify-center gap-4">
            <img
              src="https://easybooks.vn/wp-content/uploads/2025/02/apk.png"
              alt="Google Play"
              className="h-10"
            />
            <img
              src="https://easybooks.vn/wp-content/uploads/2025/02/ios.png"
              alt="App Store"
              className="h-10"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
