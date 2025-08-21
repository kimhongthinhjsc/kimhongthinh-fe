// pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import FramePage from "~/components/FramePage/FramePage";

export default function NotFoundPage() {
  return (
    <FramePage>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
        <h1 className="text-9xl font-bold text-indigo-600">404</h1>
        <p className="text-2xl md:text-3xl font-semibold mt-4">
          Ôi! Trang không tồn tại
        </p>
        <p className="mt-2 text-gray-600 text-center">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>

        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
        >
          Quay về Trang chủ
        </Link>
      </div>
    </FramePage>
  );
}
