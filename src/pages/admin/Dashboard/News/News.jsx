import { useState, useEffect } from "react";
import ComposeNews from "./ComposeNews";
import './News.scss';
import { createNews } from "~/services/adminAPI";

export default function NewsAdmin() {
  const [title, setTitle] = useState("");
  const [titleLink, setTitleLink] = useState("");
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const newsData = {
    title,
    titleLink,
    author,
    content,
    date,
    image: image // hoặc URL ảnh sau khi upload
  };

  useEffect(() => {
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !image || !author || !content) {
      setError("⚠️ Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    setError("");
    //Call api
    //tạo json
    await createNews(newsData);
    alert("Đăng tin thành công!");
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
      <h1>Quản trị Tin tức</h1>
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
          <input type="file" accept="image/*" onChange={handleThumbnailChange} required />
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
          <strong>Ngày đăng:</strong> {date}
        </div>

        <div>
          <ComposeNews onContentChange={setContent} />
        </div>

        {error && <p className="news-admin-error">{error}</p>}

        <div className="preview-container">
          <div className="button-group" style={{ marginLeft: '200px' }}>
            <button type="submit" className="btn save-btn">Lưu bài viết</button>
            <button type="button" className="btn cancel-btn" onClick={() => console.log('Hủy')}>Hủy</button>
          </div>
        </div>
      </form>
    </div>
  );
}
