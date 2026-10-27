import { useState, useEffect } from "react";
import './News.scss';
import { createNews, getOneNewsById, updateNews } from "~/services/adminAPI";
import { useNavigate, useLocation } from "react-router-dom";
import CancelButton from "~/components/FormNotify/FormCancel";
import FormSubmit from "~/components/FormNotify/FormSubmit";
import NewsSkeleton from "../../../../components/News/NewsSkeleton";
import { generateSlug } from "~/utils/constants";
import { handleContent } from "~/utils/handleContent";
import WordEditor from "~/components/RichTextEditor/WordEditor";

export default function NewsAdmin() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [news, setNews] = useState({
    title: "",
    titleLink: "",
    author: "",
    content: "",
    image: null
  });

  const [date, setDate] = useState("");
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const getNewsId = async (state) => {
    try {
      if (state?.id != null) {
        setLoadingData(true);
        const data = await getOneNewsById(state.id);
        if (data?.news) {
          setNews({
            title: data.news.title || "",
            titleLink: data.news.titleLink || "",
            author: data.news.author || "",
            content: data.news.content || "",
            image: data.news.image || null
          });
          setPreview(data.news.image ? data.news.image : null);
        }
      }
    } catch (error) {
      console.error("Error fetching news detail:", error);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    getNewsId(state);
    const now = new Date();
    const formatted =
      now.toLocaleDateString("vi-VN") +
      " " +
      now.toLocaleTimeString("vi-VN");
    setDate(formatted);
  }, [state]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNews((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    if (!news.title || !news.image || !news.author || !news.content) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const newContent = await handleContent(news.content);
      const payload = { ...news, content: newContent };

      if (state?.id) {
        await updateNews(payload, state.id);
      } else {
        await createNews(payload);
      }
      showToast("Đăng tin thành công!", "success");
      setTimeout(() => {
        navigate(-1);
      }, 500);
    } catch (err) {
      console.error(err);
      showToast("Vui lòng thử lại sau!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setNews((prev) => ({ 
      ...prev, 
      title: newTitle, 
      titleLink: generateSlug(newTitle || "") 
    }));
  };

  return (
    <div className="news-admin-container">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      {loadingData && state?.id ? (
        <NewsSkeleton />
      ) : (
        <div className="news-admin-form">
          <div>
            <label>Tiêu đề *</label>
            <input
              type="text"
              value={news?.title || ""}
              onChange={handleTitleChange}
              placeholder="Nhập tiêu đề bài viết..."
              required
            />
          </div>

          <div>
            <label>Link</label>
            <input
              type="text"
              value={news?.titleLink || ""}
              onChange={(e) => setNews((prev) => ({ ...prev, titleLink: e.target.value }))}
              placeholder="Link bài viết"
              required
            />
          </div>

          <div>
            <label>Thumbnail *</label>
            <input type="file" accept="image/*" onChange={handleThumbnailChange} />
            {preview && <img src={preview} alt="preview" className="preview" />}
          </div>

          <div>
            <label>Người đăng *</label>
            <input
              type="text"
              value={news?.author || ""}
              onChange={(e) => setNews((prev) => ({ ...prev, author: e.target.value }))}
              placeholder="Nhập tên người đăng..."
              required
            />
          </div>

          <div className="news-admin-date">
            <strong>{state?.id ? 'Ngày cập nhật:' : 'Ngày đăng:'}</strong> {date}
          </div>

          <div>
            <WordEditor
              label=''
              data={news?.content || ""}
              onChange={(val) => setNews((prev) => ({ ...prev, content: val }))}
            />
          </div>

          {error && <p className="news-admin-error">{error}</p>}

          <div className="preview-container">
            <div className="button-group" style={{ marginLeft: '200px' }}>
              <FormSubmit 
                handle={handleSubmit} 
                update={state !== null ? true : false} 
                isDisabled={!news?.title || !news?.image || !news?.author || !news?.content}
              >
                {state !== null ? 'Cập nhật tin' : 'Đăng tin'}
              </FormSubmit>
              <CancelButton urlBack="/admin/dashboard/news">Hủy</CancelButton>
            </div>
          </div>
        </div>
      )}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}