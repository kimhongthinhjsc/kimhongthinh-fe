import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginAdmin } from "~/services/adminAPI";
import logo from "~/assets/images/HongThinhTechnologyServices.png";
import { globalLoading } from "~/context/LoadingContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // clear lỗi cũ
    globalLoading(true, "Đang đăng nhập..."); // Hiển thị loading
    try {
      const res = await loginAdmin(email, password);
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      globalLoading(false); // Ẩn loading
    }
  };

  return (
    <div className="min-h-screen bg-light flex justify-center px-4 py-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-4 sm:p-6 md:p-8 overflow-y-auto max-h-screen">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="mx-auto h-20 sm:h-32 md:h-40"
            />
          </Link>
          <h2 className="text-2xl sm:text-3xl font-bold mt-4 text-darkText">
            Đăng nhập Quản trị
          </h2>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Hiển thị lỗi */}
          {error && (
            <div className="p-2 text-sm text-red-600 bg-red-100 border border-red-300 rounded-md">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-darkText">Email</label>
            <input
              type="email"
              placeholder="Nhập email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label className="mb-1 font-medium text-darkText">Mật khẩu</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-500 hover:text-primary text-sm"
            >
              {showPassword ? "Ẩn" : "Hiện"}
            </button>
          </div>

          {/* Links */}
          <div className="flex justify-between items-center text-sm">
            <Link
              to="/admin/forgot-password"
              className="text-primary hover:underline"
            >
              Quên mật khẩu?
            </Link>
            <Link to="/" className="text-secondary hover:underline">
              Quay lại trang chủ
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full btn-primary py-2 rounded-full text-white font-semibold hover:shadow-lg transition"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
