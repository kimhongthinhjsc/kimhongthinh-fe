import { useState, useEffect, useRef } from "react";
import { CKEditor, useCKEditorCloud } from "@ckeditor/ckeditor5-react";
import DOMPurify from "dompurify";
import useCKEditorConfig from "~/hooks/useCKEditorConfig";

export default function RichTextEditor({ data, onChange }) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const editorWordCountRef = useRef(null);

  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [content, setContent] = useState(data || ""); // khởi tạo theo props

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
    <div className="w-full max-w-5xl mx-auto font-sans">
      <div className="border rounded-lg shadow-sm bg-white p-4" ref={editorContainerRef}>
        <div ref={editorRef}>
          {editorConfig && (
            <CKEditor
              editor={ClassicEditor}
              config={editorConfig}
              data={content} // nạp content vào editor
              onReady={(editor) => {
                const wordCount = editor.plugins.get("WordCount");
                if (editorWordCountRef.current) {
                  editorWordCountRef.current.appendChild(wordCount.wordCountContainer);
                }
              }}
              onAfterDestroy={() => {
                if (editorWordCountRef.current) {
                  Array.from(editorWordCountRef.current.children).forEach((child) => child.remove());
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
        <div className="mt-2 text-sm text-gray-500" ref={editorWordCountRef} />
      </div>

      {/* Preview */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3 border-b-2 border-blue-500 pb-1 text-gray-800">
          📰 Xem trước
        </h3>
        <div
          className="min-h-[300px] max-w-4xl mx-auto p-4 border border-gray-300 rounded-md bg-white ck-content prose"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        />
      </div>
    </div>
  );
}
