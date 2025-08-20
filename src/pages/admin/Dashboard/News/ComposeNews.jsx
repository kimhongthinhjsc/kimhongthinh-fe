import { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DOMPurify from "dompurify";

// ---- Custom Upload Adapter ----
class CustomUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    const file = await this.loader.file;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return { default: data.url };
    } catch (err) {
      console.error("Upload error:", err);
      throw err;
    }
  }

  abort() {}
}

function CustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new CustomUploadAdapter(loader);
  };
}

export default function ComposeNews({ onContentChange }) {
  const editorWordCountRef = useRef(null);
  const [content, setContent] = useState("");

  const editorConfig = {
    licenseKey:
      "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NTY4NTc1OTksImp0aSI6IjU3ZGZiMzViLTExN2ItNDkzMS1iZDU2LWM3YjA3NjNiZDFiNiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImUwZjRiOTk5In0.Fkvi7Sl3htLGuyBmz5Ub2GM4Nv9lRmEozPMYAFWsAtxhW5_lkMgOLDPA2aG4Vr170PcCsO5dxWZzTlqHRkSlkQ",
    extraPlugins: [CustomUploadAdapterPlugin],
    toolbar: [
      "undo",
      "redo",
      "|",
      "heading",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "link",
      "insertImage",
      "blockQuote",
      "codeBlock",
      "|",
      "bulletedList",
      "numberedList",
      "todoList",
      "|",
      "alignment",
    ],
    image: {
      toolbar: [
        "imageTextAlternative",
        "imageStyle:inline",
        "imageStyle:block",
        "imageStyle:side",
      ],
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
  };

  return (
    <div className="max-w-4xl mx-auto font-sans">
      <div className="border rounded shadow p-4 bg-white">
        <CKEditor
          editor={ClassicEditor}
          config={editorConfig}
          data=""
          onReady={(editor) => {
            const wordCount = editor.plugins.get("WordCount");
            if (wordCount && editorWordCountRef.current) {
              editorWordCountRef.current.appendChild(
                wordCount.wordCountContainer
              );
            }
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
            if (onContentChange) onContentChange(data);
          }}
        />
        <div
          ref={editorWordCountRef}
          className="mt-2 text-sm text-gray-500"
        ></div>
      </div>

      {/* Preview */}
      <div className="mt-8 p-6 border rounded shadow bg-white">
        <h3 className="text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-1">
          📰 Xem trước bài báo:
        </h3>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        />
      </div>
    </div>
  );
}
