import { useState, useEffect } from "react";
import ComposeNewsUpdate from "./UpdateComposeNews";
import { useLocation, useNavigate } from "react-router-dom";
import './News.scss';
import { getOneNewsById, updateNews } from "~/services/adminAPI";
import CancelButton from "./FormCancel";
import FormSubmit from "./FormSubmit";
import UpdateNewsSkeleton from "../../../../components/News/NewsSkeleton";

export default function UpdateNews() {
  const [title, setTitle] = useState("");
  const [titleLink, setTitleLink] = useState("");
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const { state } = useLocation();
  const [toast, setToast] = useState(null); // ✅ state thông báo
  const [loading, setLoading] = useState(false); // ✅ state loading
  const [loadingData, setLoadingData] = useState(true); // ✅ loading khi fetch
  const navigate = useNavigate(); // ✅ khởi tạo navigate

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000); // 3 giây tự biến mất
  };

  const newsData = {
    _id: state.id,
    title,
    titleLink,
    author,
    content,
    date,
    image: image // hoặc URL ảnh sau khi upload
  };

  const getNews = async () => {
    try {
      setLoadingData(true);
      const data = await getOneNewsById(state.id);
      setAuthor(data.news.author);
      setContent(data.news.content);
      setImage(data.news.image);
      setPreview(data.news.image ? data.news.image : null);
      setTitle(data.news.title);
      setTitleLink(data.news.titleLink);
      setDate(new Date().toLocaleString("vi-VN"));
    } catch (error) {
      console.error("Lỗi khi lấy tin tức:", error);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    getNews();
    const now = new Date();
    const formatted =
      now.toLocaleDateString("vi-VN") +
      " " +
      now.toLocaleTimeString("vi-VN");
    setDate(formatted);

  }, []);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async () => {
    if (!title || !image || !author || !content) {
      setError("⚠️ Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    setError("");
    try {
      setLoading(true); // ✅ bật loading
      await updateNews(newsData);
      showToast("Cập nhật thành công!", "success"); // ✅ dùng toast
      setTimeout(() => {
        navigate(-1); // quay lại trang trước đó
      }, 500);
    } catch (err) {
      console.error(err);
      showToast("Vui lòng thử lại sau!", "error");
    } finally {
      setLoading(false); // ✅ tắt loading
    }
  };

  const generateSlug = (str) => {
    return str
      .toLowerCase()
      .replace(/đ/g, "d")   // thay đ thành d
      .replace(/Đ/g, "D")   // thay Đ thành D (nếu cần)
      .normalize("NFD")     // tách dấu
      .replace(/[\u0300-\u036f]/g, "") // xóa dấu
      .replace(/[^a-z0-9\s-]/g, "")    // xóa ký tự đặc biệt
      .trim()
      .replace(/\s+/g, "-"); // thay space bằng "-"
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setTitleLink(generateSlug(newTitle)); // tự động sinh slug
  };

  return (
    <div className="news-admin-container">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      {loadingData ? (
        <UpdateNewsSkeleton />  // ✅ hiển thị skeleton khi chờ API
      ) : (
        <form onSubmit={handleSubmit} className="news-admin-form">
          <div>
            <label>Tiêu đề *</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Nhập tiêu đề bài viết..."
              required
            />
          </div>

          <div>
            <label>Link</label>
            <input
              type="text"
              value={titleLink}
              onChange={(e) => setTitleLink(e.target.value)} // vẫn cho phép sửa tay
              placeholder="Link bài viết"
              required
            />
          </div>

          <div>
            <label>Thumbnail *</label>
            <input type="file" accept="image/*" onChange={handleThumbnailChange} required={!image} />
            {preview && <img src={preview} alt="preview" className="preview" />}
          </div>

          <div>
            <label>Người đăng *</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Nhập tên người đăng..."
              required
            />
          </div>

          <div className="news-admin-date">
            <strong>Ngày cập nhật:</strong> {date}
          </div>

          {image ? (
            <ComposeNewsUpdate onContentChange={setContent} initialData={content} />
          ) : (
            <p className="text-gray-500">Không có dữ liệu, vui lòng quay lại danh sách.</p>
          )}

          {error && <p className="news-admin-error">{error}</p>}

          <div className="preview-container">
            <div className="button-group" style={{ marginLeft: '200px' }}>
              <FormSubmit handle={handleSubmit} update={true} fields={{ title, image, author, content }}>Cập nhật</FormSubmit>
              <CancelButton>Hủy</CancelButton>
            </div>
          </div>
        </form>)}
      {/* Toast notification */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
