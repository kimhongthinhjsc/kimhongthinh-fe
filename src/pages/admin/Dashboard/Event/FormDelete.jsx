import { useState } from "react";

export default function FormDelete({ handleDelete, children }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      {/* Nút xóa */}
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="px-6 py-2 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition"
      >
        {children || "Xóa"}
      </button>

      {/* Modal xác nhận xóa */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => !loading && setShowModal(false)} // click overlay để đóng
        >
          <div
            className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 text-center relative"
            onClick={(e) => e.stopPropagation()} // ngăn click vào modal lan ra overlay
          >
            <h2 className="text-lg font-bold mb-4 text-red-600">Thông báo</h2>
            <p className="mb-6">
              Bạn có chắc muốn xóa bài viết này không? Hành động này không thể hoàn tác!
            </p>

            {/* Loading overlay trên modal */}
            {loading && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-xl">
                <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                disabled={loading}
              >
                Hủy
              </button>
              <button
                onClick={async () => {
                  setLoading(true);
                  try {
                    await handleDelete();
                    setShowModal(false);
                  } catch (err) {
                    console.error(err);
                  } finally {
                    setLoading(false);
                  }
                }}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                disabled={loading}
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
