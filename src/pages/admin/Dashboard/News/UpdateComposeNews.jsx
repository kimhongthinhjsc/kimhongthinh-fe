import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';

import './ComposeNews.scss';
import DOMPurify from "dompurify";
import { uploadImage } from '~/services/adminAPI';

const LICENSE_KEY = import.meta.env.VITE_LICENSE_KEY;

export default function UpdateComposeNews({ initialData, onContentChange }) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const editorWordCountRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const cloud = useCKEditorCloud({ version: '46.0.2' });

  useEffect(() => {
    setIsLayoutReady(true);
    if (initialData) {
      setContent(initialData);
    }

    return () => setIsLayoutReady(false);
  }, []);

  const { ClassicEditor, editorConfig } = useMemo(() => {
    if (cloud.status !== 'success' || !isLayoutReady) {
      return {};
    }

    const {
      ClassicEditor,
      Alignment,
      Autoformat,
      AutoImage,
      AutoLink,
      Autosave,
      Base64UploadAdapter,
      BlockQuote,
      Bold,
      Code,
      CodeBlock,
      Essentials,
      FindAndReplace,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      Fullscreen,
      GeneralHtmlSupport,
      Heading,
      Highlight,
      HorizontalLine,
      HtmlComment,
      HtmlEmbed,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      PageBreak,
      Paragraph,
      PasteFromOffice,
      PlainTableOutput,
      RemoveFormat,
      ShowBlocks,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Style,
      Subscript,
      Superscript,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableLayout,
      TableProperties,
      TableToolbar,
      TextTransformation,
      TodoList,
      Underline,
      WordCount
    } = cloud.CKEditor;

    return {
      ClassicEditor,
      editorConfig: {
        toolbar: {
          items: [
            'undo',
            'redo',
            '|',
            'showBlocks',
            'findAndReplace',
            'fullscreen',
            '|',
            'heading',
            'style',
            '|',
            'fontSize',
            'fontFamily',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'subscript',
            'superscript',
            'code',
            'removeFormat',
            '|',
            'specialCharacters',
            'horizontalLine',
            'pageBreak',
            'link',
            'insertImage',
            'insertImageViaUrl',
            'insertTable',
            'insertTableLayout',
            'highlight',
            'blockQuote',
            'codeBlock',
            'htmlEmbed',
            '|',
            'alignment',
            '|',
            'bulletedList',
            'numberedList',
            'todoList',
            'outdent',
            'indent'
          ],
          shouldNotGroupWhenFull: true
        },
        extraPlugins: [CustomUploadAdapterPlugin],
        plugins: [
          Alignment,
          Autoformat,
          AutoImage,
          AutoLink,
          Autosave,
          Base64UploadAdapter,
          BlockQuote,
          Bold,
          Code,
          CodeBlock,
          Essentials,
          FindAndReplace,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          Fullscreen,
          GeneralHtmlSupport,
          Heading,
          Highlight,
          HorizontalLine,
          HtmlComment,
          HtmlEmbed,
          ImageBlock,
          ImageCaption,
          ImageInline,
          ImageInsert,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          Indent,
          IndentBlock,
          Italic,
          Link,
          LinkImage,
          List,
          ListProperties,
          PageBreak,
          Paragraph,
          PasteFromOffice,
          PlainTableOutput,
          RemoveFormat,
          ShowBlocks,
          SpecialCharacters,
          SpecialCharactersArrows,
          SpecialCharactersCurrency,
          SpecialCharactersEssentials,
          SpecialCharactersLatin,
          SpecialCharactersMathematical,
          SpecialCharactersText,
          Strikethrough,
          Style,
          Subscript,
          Superscript,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableLayout,
          TableProperties,
          TableToolbar,
          TextTransformation,
          TodoList,
          Underline,
          WordCount
        ],
        fontFamily: {
          supportAllValues: true
        },
        fontSize: {
          options: [10, 12, 14, 'default', 18, 20, 22],
          supportAllValues: true
        },
        fullscreen: {
          onEnterCallback: container =>
            container.classList.add(
              'editor-container',
              'editor-container_classic-editor',
              'editor-container_include-style',
              'editor-container_include-fullscreen',
              'main-container'
            )
        },
        heading: {
          options: [
            {
              model: 'paragraph',
              title: 'Paragraph',
              class: 'ck-heading_paragraph'
            },
            {
              model: 'heading1',
              view: 'h1',
              title: 'Heading 1',
              class: 'ck-heading_heading1'
            },
            {
              model: 'heading2',
              view: 'h2',
              title: 'Heading 2',
              class: 'ck-heading_heading2'
            },
            {
              model: 'heading3',
              view: 'h3',
              title: 'Heading 3',
              class: 'ck-heading_heading3'
            },
            {
              model: 'heading4',
              view: 'h4',
              title: 'Heading 4',
              class: 'ck-heading_heading4'
            },
            {
              model: 'heading5',
              view: 'h5',
              title: 'Heading 5',
              class: 'ck-heading_heading5'
            },
            {
              model: 'heading6',
              view: 'h6',
              title: 'Heading 6',
              class: 'ck-heading_heading6'
            }
          ]
        },
        htmlSupport: {
          allow: [
            {
              name: /^.*$/,
              styles: true,
              attributes: true,
              classes: true
            }
          ]
        },
        image: {
          toolbar: [
            'toggleImageCaption',
            'imageTextAlternative',
            '|',
            'imageStyle:inline',
            'imageStyle:wrapText',
            'imageStyle:breakText',
            '|',
            'resizeImage'
          ]
        },
        initialData:
          '',
        licenseKey: LICENSE_KEY,
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: 'https://',
          decorators: {
            toggleDownloadable: {
              mode: 'manual',
              label: 'Downloadable',
              attributes: {
                download: 'file'
              }
            }
          }
        },
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true
          }
        },
        menuBar: {
          isVisible: true
        },
        placeholder: 'Type or paste your content here!',
        style: {
          definitions: [
            {
              name: 'Article category',
              element: 'h3',
              classes: ['category']
            },
            {
              name: 'Title',
              element: 'h2',
              classes: ['document-title']
            },
            {
              name: 'Subtitle',
              element: 'h3',
              classes: ['document-subtitle']
            },
            {
              name: 'Info box',
              element: 'p',
              classes: ['info-box']
            },
            {
              name: 'CTA Link Primary',
              element: 'a',
              classes: ['button', 'button--green']
            },
            {
              name: 'CTA Link Secondary',
              element: 'a',
              classes: ['button', 'button--black']
            },
            {
              name: 'Marker',
              element: 'span',
              classes: ['marker']
            },
            {
              name: 'Spoiler',
              element: 'span',
              classes: ['spoiler']
            }
          ]
        },
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        }
      }
    };
  }, [cloud, isLayoutReady]);

  const [content, setContent] = useState(initialData ?? "");
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
        ref={editorContainerRef}
      >
        <div className="editor-container__editor">
          <div ref={editorRef}>
            {editorConfig && ClassicEditor && (
              <CKEditor
                onReady={editor => {
                  const wordCount = editor.plugins.get('WordCount');
                  editorWordCountRef.current.appendChild(wordCount.wordCountContainer);
                  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
                    return new CustomUploadAdapter(loader);
                  }
                }}
                onAfterDestroy={() => {
                  if (editorWordCountRef.current) { // ✅ check null
                    Array.from(editorWordCountRef.current.children).forEach(child => child.remove());
                  }
                }}
                editor={ClassicEditor}
                config={editorConfig}
                data={content=="" ? "<p></p>" : content}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setContent(data); // vẫn giữ local preview
                  if (onContentChange) onContentChange(data); // gửi lên cha
                }}

              />
            )}
          </div>
        </div>
        <div className="editor_container__word-count" ref={editorWordCountRef}></div>
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
      </div>
    </div>

  );
}
