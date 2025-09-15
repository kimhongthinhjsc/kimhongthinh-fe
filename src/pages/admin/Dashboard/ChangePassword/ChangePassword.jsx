import { useState } from "react";
import { changePassword } from "~/services/adminAPI";
import { globalLoading } from "~/context/LoadingContext";
import { validatePassword } from "~/utils/validatePassword";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChangePassword = async () => {
    const error = validatePassword(oldPassword, newPassword, confirmPassword);
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    try {
      globalLoading(true, "Đang xử lý...");
      const res = await changePassword(oldPassword, newPassword);
      setMessage({
        type: "success",
        text: res.message || "Đổi mật khẩu thành công",
      });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Có lỗi xảy ra",
      });
    } finally {
      globalLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6">
        <div className="flex flex-col items-center">
          <div className="bg-indigo-100 p-3 rounded-full mb-3 text-2xl">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800">Đổi mật khẩu</h2>
        </div>

        {message && (
          <div
            className={`text-sm p-3 rounded-md ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-4">
          {/* Old password */}
          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full pl-3 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Mật khẩu cũ"
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showOldPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          {/* New password */}
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full pl-3 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Mật khẩu mới"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          {/* Confirm new password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-3 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Nhập lại mật khẩu mới"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
        </div>

        <button
          onClick={handleChangePassword}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-xl font-medium shadow hover:bg-indigo-700 transition"
        >
          Đổi mật khẩu
        </button>
      </div>
    </div>
  );
}
