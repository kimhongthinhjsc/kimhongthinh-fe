import { useState } from "react";

export default function FormSubmit({ handle, update, children, fields }) {
    const [showModal, setShowModal] = useState(false);
    const isDisabled = !fields.title || !fields.image || !fields.author || !fields.content;

    return (
        <>
            {/* Nút chính: chỉ mở modal */}
            <button
                type="button"
                onClick={() => !isDisabled && setShowModal(true)}
                disabled={isDisabled}
                className={`px-6 py-2 rounded-lg font-semibold text-white transition
          ${isDisabled ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            >
                {children || (update ? "Cập nhật" : "Đăng tin")}
            </button>

            {/* Modal xác nhận */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 text-center" onClick={(e) => setShowModal(false)}>
                        <h2 className="text-lg font-bold mb-4">Thông báo</h2>
                        <p className="mb-6">
                            {update
                                ? "Bạn có chắc muốn cập nhật bài viết này không?"
                                : "Bạn có chắc muốn tạo bài viết này không?"}
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={async () => {
                                    await handle(); // thực hiện submit
                                    setShowModal(false);
                                }}
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
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
