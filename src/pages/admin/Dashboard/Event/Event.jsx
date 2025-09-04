import { useState, useEffect } from "react";
import './Event.scss';
import { createEvent, getOneEventById, updateEvent } from "~/services/adminAPI";
import { useNavigate, useLocation } from "react-router-dom";
import CancelButton from "~/components/FormNotify/FormCancel";
import FormSubmit from "~/components/FormNotify/FormSubmit";
import NewsSkeleton from "../../../../components/News/NewsSkeleton";
import { generateSlug } from "~/utils/constants";
import { handleContent } from "~/utils/handleContent";
import WordEditor from "~/components/RichTextEditor/WordEditor";

export default function EventsAdmin() {
  const navigate = useNavigate(); // ✅ khởi tạo navigate
  const { state } = useLocation();

  const [events, setEvents] = useState({
    title: "",
    titleLink: "",
    author: "",
    content: "",
    image: null,
    location: "",
    date: null
  });

  // const [updatedAt, setUpdatedAt] = useState("");
  const [datePreview, setDatePreview] = useState("");
  const [date, setDate] = useState("");
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ state loading
  const [loadingData, setLoadingData] = useState(true); // ✅ loading khi fetch
  const [toast, setToast] = useState(null); // ✅ state thông báo

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000); // 3 giây tự biến mất
  };

  const getEventsId = async (state) => {
    try {
      if (state != null) {
        setLoadingData(true);
        const data = await getOneEventById(state?.id);
        setEvents(data.event);
        setPreview(data.event.image ? data.event.image : null);
        setDatePreview(toISOString(new Date(data.event.date).getTime() - 7 * 60 * 60 * 1000));
      }
    }
    catch (error) { }
    finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    getEventsId(state);
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
      setEvents({ ...events, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e) => {
    if (!events.title || !events.image || !events.author || !events.content) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    setError("");
    setLoading(true); // ✅ bật loading
    try {
      if (state?.id) {
        const newContent = await handleContent(events.content);
        await updateEvent({ ...events, content: newContent });
      } else {
        const newContent = await handleContent(events.content);
        await createEvent({ ...events, content: newContent });
      }
      showToast("Đăng tin thành công!", "success"); // ✅ dùng toast
      // Delay 0.5s để toast hiển thị rồi quay lại trang trước
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

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setEvents({ ...events, title: newTitle, titleLink: generateSlug(newTitle) });
  };

  function toLocalInputValue(isoString) {
    if (!isoString) return "";
    const d = new Date(isoString);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
  }

  function toISOString(value) {
    return new Date(value).toISOString(); // convert local -> UTC
  }
  // luôn trả về local string cho datetime-local
  function isoToLocalString(isoString) {
    if (!isoString) return "";
    const d = new Date(isoString);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
  }

  return (
    <div className="news-admin-container">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      {loadingData ? (
        <NewsSkeleton />  // ✅ hiển thị skeleton khi chờ API
      ) : (

        <div className="news-admin-form">
          <div>
            <label>Tiêu đề *</label>
            <input
              type="text"
              value={events?.title}
              onChange={handleTitleChange}
              placeholder="Nhập tiêu đề bài viết..."
              required
            />
          </div>

          <div>
            <label>Link</label>
            <input
              type="text"
              value={events?.titleLink}
              onChange={(e) => setEvents({ ...events, titleLink: e.target.value })} // vẫn cho phép sửa tay
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
            <label>Người tham gia *</label>
            <input
              type="text"
              value={events?.author}
              onChange={(e) => setEvents({ ...events, author: e.target.value })}
              placeholder="Người tham gia (có thể nhiều người)"
              required
            />
          </div>

          <div className="news-admin-date">
            <strong>{state?.id ? 'Ngày cập nhật:' : 'Ngày đăng:'}</strong> {date}
          </div>

          <div>
            <label>Địa điểm *</label>
            <input
              type="text"
              value={events?.location}
              onChange={(e) => setEvents({ ...events, location: e.target.value })}
              placeholder="Nhập địa điểm tổ chức..."
              required
            />
          </div>

          <div className="news-admin-date">
            <strong>Ngày tổ chức:</strong>{" "}
            <input
              type="datetime-local"
              value={toLocalInputValue(datePreview)}
              onChange={(e) => { setEvents({ ...events, date: e.target.value }); setDatePreview(isoToLocalString(e.target.value)); }} // lưu tạm theo dạng YYYY-MM-DDTHH:mm
              className="border rounded p-1"
            />
          </div>

          <div>
            <WordEditor
              label=''
              data={events?.content}
              onChange={(val) => setEvents({ ...events, content: val })}
            />
          </div>

          {error && <p className="news-admin-error">{error}</p>}

          <div className="preview-container">
            <div className="button-group" style={{ marginLeft: '200px' }}>
              <FormSubmit
                handle={handleSubmit}
                update={state !== null ? true : false}
                isDisabled={events?.title === '' || events?.image === '' || events?.author === '' || events?.content === '' || events?.location === '' || events?.date === ''}>
                {state !== null ? 'Cập nhật tin' : 'Đăng tin'}</FormSubmit>
              <CancelButton urlBack="/admin/dashboard/events">Hủy</CancelButton>
            </div>
          </div>
        </div>)}
      {/* Toast notification */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
