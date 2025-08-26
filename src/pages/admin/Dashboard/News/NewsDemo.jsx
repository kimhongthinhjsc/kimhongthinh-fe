import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { uploadImage } from "~/services/adminAPI";
import DOMPurify from "dompurify";
import './News.scss';

export default function MyEditor() {
    const [content, setContent] = React.useState("");

    function CustomUploadAdapter(loader) {
        this.loader = loader;
    }

    CustomUploadAdapter.prototype.upload = function () {
        return this.loader.file
            .then(async (file) => {
                const data = await uploadImage(file);
                return { default: data.url };
            });
    };

    CustomUploadAdapter.prototype.abort = function () {
    };

    function CustomUploadAdapterPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return new CustomUploadAdapter(loader);
        };
    }
    return (
        <div className="main-container">
            <div
                className="editor-container editor-container_classic-editor editor-container_include-style editor-container_include-block-toolbar editor-container_include-word-count editor-container_include-fullscreen"
            >
                <div className="editor-container__editor" style={{
                    marginTop: "30px",
                    minHeight: "300px",
                    maxWidth: "800px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    padding: "16px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    boxSizing: "border-box",
                    backgroundColor: "white"
                }}>
                    <CKEditor

                        editor={ClassicEditor}
                        disableWatchdog={true}   // 🚀 Tắt watchdog hoàn toàn
                        data="<p>Hello CKEditor!</p>"
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
                            const data = editor.getData();
                            setContent(data);
                        }}
                    />
                </div>
            </div>
            <div >
                <h3 className="text-xl font-semibold mb-3 border-b-2 border-blue-500 pb-1 text-gray-800 font-merri">📰 Xem trước bài báo:</h3>
                <div style={{
                    marginTop: "30px",
                    minHeight: "300px",
                    maxWidth: "800px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    padding: "16px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    boxSizing: "border-box",
                    backgroundColor: "white"
                }} className='ck-content'
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
                />
            </div>
            <div style={{ height: '50px' }}></div>
        </div>
    );
}
