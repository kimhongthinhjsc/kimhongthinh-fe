// import { useState, useRef } from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import DOMPurify from "dompurify";
// import { uploadImage } from "~/services/adminAPI"; // API upload của bạn

// import "./ComposeNews.scss";

// export default function ComposeNews({ onContentChange }) {
//   const editorWordCountRef = useRef(null);
//   const [content, setContent] = useState("");

//   // Custom upload adapter
//   function CustomUploadAdapter(loader) {
//     this.loader = loader;
//   }

//   CustomUploadAdapter.prototype.upload = function () {
//     return this.loader.file.then(async (file) => {
//       console.log("Uploading file:", file);
//       const data = await uploadImage(file); // API trả về { url: "..." }
//       return { default: data.url };
//     });
//   };

//   CustomUploadAdapter.prototype.abort = function () {
//     console.log("Upload aborted");
//   };

//   function CustomUploadAdapterPlugin(editor) {
//     editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
//       return new CustomUploadAdapter(loader);
//     };
//   }

//   return (
//     <div className="main-container">
//       <div className="editor-container">
//         <CKEditor
//           editor={ClassicEditor}
//           config={{
//             extraPlugins: [CustomUploadAdapterPlugin],
//             toolbar: [
//               "undo",
//               "redo",
//               "|",
//               "heading",
//               "bold",
//               "italic",
//               "link",
//               "bulletedList",
//               "numberedList",
//               "blockQuote",
//               "|",
//               "insertTable",
//               "imageUpload",
//               "mediaEmbed",
//             ],
//             image: {
//               toolbar: [
//                 "imageTextAlternative",
//                 "imageStyle:inline",
//                 "imageStyle:block",
//                 "imageStyle:side",
//               ],
//             },
//           }}
//           data=""
//           onReady={(editor) => {
//             console.log("Editor is ready", editor);
//           }}
//           onChange={(event, editor) => {
//             const data = editor.getData();
//             setContent(data);
//             if (onContentChange) onContentChange(data);
//           }}
//         />
//       </div>

//       {/* Preview */}
//       <div style={{ marginTop: "30px" }}>
//         <h3 className="text-xl font-semibold mb-3 border-b-2 border-blue-500 pb-1 text-gray-800 font-merri">
//           📰 Xem trước bài báo:
//         </h3>
//         <div
//           style={{
//             minHeight: "300px",
//             maxWidth: "800px",
//             margin: "0 auto",
//             padding: "16px",
//             border: "1px solid #ddd",
//             borderRadius: "6px",
//             backgroundColor: "white",
//           }}
//           className="ck-content"
//           dangerouslySetInnerHTML={{
//             __html: DOMPurify.sanitize(content),
//           }}
//         />
//       </div>
//     </div>
//   );
// }
