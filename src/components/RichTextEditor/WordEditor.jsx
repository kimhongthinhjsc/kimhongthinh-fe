import { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DOMPurify from "dompurify";
import { FaEdit } from "react-icons/fa";

export default function WordEditor({ data, onChange, label = "Nội dung" }) {
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const [content, setContent] = useState(data || "");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);

    useEffect(() => {
        if (data !== content) {
            setContent(data || "");
        }
    }, [data]);

    function CustomUploadAdapter(loader) {
        this.loader = loader;
    }

    CustomUploadAdapter.prototype.upload = function () {
        return this.loader.file
            .then((file) => {
                // ✅ Không upload, chỉ tạo URL tạm để hiển thị
                const url = URL.createObjectURL(file);
                return { default: url };
            });
    };

    CustomUploadAdapter.prototype.abort = function () {
        // Không cần làm gì
    };

    function CustomUploadAdapterPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return new CustomUploadAdapter(loader);
        };
    }

    return (
        <div className="w-full max-w-5xl mx-auto font-sans relative">
            {/* Preview card */}
            <div className="border rounded-lg shadow-sm bg-white p-4 relative">
                {/* Icon edit góc trên phải */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="absolute top-3 right-3 p-2 rounded-full  transition"
                >
                    <FaEdit size={28} className="text-gray-600 hover:text-primary" />
                </button>

                <h3 className="text-xl font-semibold mb-3 text-gray-800">📰 {label}</h3>
                <div
                    className="min-h-[300px] max-w-4xl mx-auto p-4 border border-gray-300 rounded-md bg-white ck-content prose"
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(content, {
                            ADD_ATTR: ['target', 'src'], // giữ lại src
                            ADD_URI_SAFE_ATTR: ['src'], // cho phép blob trong src
                            ALLOWED_URI_REGEXP: /^data:image\/|^blob:/, // cho phép data: và blob:
                        })
                    }}
                />
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div
                        className="bg-white w-full max-w-4xl rounded-xl shadow-xl p-6 relative 
                       max-h-[90vh] overflow-y-auto"
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition"
                        >
                            ✕
                        </button>

                        <h2 className="text-lg font-bold mb-4">Chỉnh sửa nội dung</h2>

                        <div >
                            {isLayoutReady && (
                                <CKEditor

                                    editor={ClassicEditor}
                                    disableWatchdog={true}
                                    data={content}
                                    config={{
                                        extraPlugins: [CustomUploadAdapterPlugin]
                                    }}
                                    onReady={(editor) => {
                                        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
                                            return new CustomUploadAdapter(loader);
                                        }
                                        editor.ui.view.editable.element.style.minHeight = "300px";
                                        editor.ui.view.editable.element.style.maxHeight = "600px";
                                    }}
                                    onChange={(event, editor) => {
                                        const newData = editor.getData();
                                        setContent(newData);
                                        if (onChange) onChange(newData);
                                    }}
                                />
                            )}
                        </div>

                        {/* Actions */}
                        <div className="mt-4 flex justify-end gap-3 sticky bottom-0 bg-white pt-3">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
                            >
                                Đóng
                            </button>
                            <button

                                onClick={() => {
                                    setIsOpen(false)
                                }}
                                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}