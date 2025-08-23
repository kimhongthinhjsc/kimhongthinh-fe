import { useState, useEffect, useRef } from "react";
import { CKEditor, useCKEditorCloud } from "@ckeditor/ckeditor5-react";
import DOMPurify from "dompurify";
import useCKEditorConfig from "~/hooks/useCKEditorConfig";
import { Pencil } from "lucide-react"; // icon edit

export default function RichTextEditor({ data, onChange }) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const editorWordCountRef = useRef(null);

  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [content, setContent] = useState(data || "");
  const [isOpen, setIsOpen] = useState(false);

  const cloud = useCKEditorCloud({ version: "46.0.2" });
  const { ClassicEditor, editorConfig } = useCKEditorConfig(cloud, isLayoutReady);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  useEffect(() => {
    if (data !== content) {
      setContent(data || "");
    }
  }, [data]);

  return (
    <div className="w-full max-w-5xl mx-auto font-sans relative">
      {/* Preview card */}
      <div className="border rounded-lg shadow-sm bg-white p-4 relative">
        {/* Icon edit góc trên phải */}
        <button
          onClick={() => setIsOpen(true)}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <Pencil size={20} className="text-gray-600" />
        </button>

        <h3 className="text-xl font-semibold mb-3 text-gray-800">📰 Preview</h3>
        <div
          className="min-h-[300px] max-w-4xl mx-auto p-4 border border-gray-300 rounded-md bg-white ck-content prose"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
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

            <div ref={editorContainerRef}>
              {editorConfig && (
                <CKEditor
                  editor={ClassicEditor}
                  config={editorConfig}
                  data={content}
                  onReady={(editor) => {
                    const wordCount = editor.plugins.get("WordCount");
                    if (editorWordCountRef.current) {
                      editorWordCountRef.current.appendChild(
                        wordCount.wordCountContainer
                      );
                    }
                  }}
                  onAfterDestroy={() => {
                    if (editorWordCountRef.current) {
                      Array.from(editorWordCountRef.current.children).forEach(
                        (child) => child.remove()
                      );
                    }
                  }}
                  onChange={(event, editor) => {
                    const newData = editor.getData();
                    setContent(newData);
                    if (onChange) onChange(newData);
                  }}
                />
              )}
            </div>
            <div
              className="mt-2 text-sm text-gray-500"
              ref={editorWordCountRef}
            />

            {/* Actions */}
            <div className="mt-4 flex justify-end gap-3 sticky bottom-0 bg-white pt-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Đóng
              </button>
              <button
                onClick={() => setIsOpen(false)}
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
