import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CancelButton() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <button
        type="button"
        className="px-6 py-2 rounded-lg font-semibold text-white bg-gray-400 hover:bg-gray-500 transition"
        onClick={() => setShowModal(true)}
      >
        Hủy
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 text-center">
            <h2 className="text-lg font-bold mb-4">⚠️ Xác nhận hủy</h2>
            <p className="mb-6">Bạn có chắc muốn hủy đăng tin không?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
              >
                Hủy
              </button>
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
