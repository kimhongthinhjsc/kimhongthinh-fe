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
  const navigate = useNavigate();
  const { state } = useLocation();

  const [events, setEvents] = useState({
    title: "",
    titleLink: "",
    author: "",
    content: "",
    image: null,
    location: "",
    date: ""
  });

  const [datePreview, setDatePreview] = useState("");
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

  const getEventsId = async (stateId) => {
    try {
      if (stateId != null) {
        setLoadingData(true);
        const data = await getOneEventById(stateId);
        if (data?.event) {
          setEvents({
            title: data.event.title || "",
            titleLink: data.event.titleLink || "",
            author: data.event.author || "",
            content: data.event.content || "",
            image: data.event.image || null,
            location: data.event.location || "",
            date: data.event.date || ""
          });
          setPreview(data.event.image ? data.event.image : null);
          if (data.event.date) {
            setDatePreview(toISOString(new Date(data.event.date).getTime() - 7 * 60 * 60 * 1000));
          }
        }
      }
    } catch (error) {
      console.error("Error fetching event detail:", error);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (state?.id) {
      getEventsId(state.id);
    } else {
      setLoadingData(false);
    }
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
      setEvents((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    if (!events.title || !events.image || !events.author || !events.content || !events.location || !events.date) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const newContent = await handleContent(events.content);
      const payload = { ...events, content: newContent };

      if (state?.id) {
        await updateEvent(payload, state.id);
      } else {
        await createEvent(payload);
      }
      showToast("Lưu sự kiện thành công!", "success");
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
    setEvents((prev) => ({ 
      ...prev, 
      title: newTitle, 
      titleLink: generateSlug(newTitle || "") 
    }));
  };

  function toLocalInputValue(isoString) {
    if (!isoString) return "";
    try {
      const d = new Date(isoString);
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      return d.toISOString().slice(0, 16);
    } catch {
      return "";
    }
  }

  function toISOString(value) {
    return new Date(value).toISOString();
  }

  function isoToLocalString(isoString) {
    if (!isoString) return "";
    try {
      const d = new Date(isoString);
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      return d.toISOString().slice(0, 16);
    } catch {
      return "";
    }
  }

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
              value={events?.title || ""}
              onChange={handleTitleChange}
              placeholder="Nhập tiêu đề sự kiện..."
              required
            />
          </div>

          <div>
            <label>Link *</label>
            <input
              type="text"
              value={events?.titleLink || ""}
              onChange={(e) => setEvents((prev) => ({ ...prev, titleLink: e.target.value }))}
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
            <label>Người tham gia *</label>
            <input
              type="text"
              value={events?.author || ""}
              onChange={(e) => setEvents((prev) => ({ ...prev, author: e.target.value }))}
              placeholder="Người tham gia..."
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
              value={events?.location || ""}
              onChange={(e) => setEvents((prev) => ({ ...prev, location: e.target.value }))}
              placeholder="Nhập địa điểm tổ chức..."
              required
            />
          </div>

          <div className="news-admin-date">
            <strong>Ngày tổ chức:</strong>{" "}
            <input
              type="datetime-local"
              value={toLocalInputValue(datePreview || events?.date)}
              onChange={(e) => { 
                const val = e.target.value;
                setEvents((prev) => ({ ...prev, date: val })); 
                setDatePreview(isoToLocalString(val)); 
              }}
              className="border rounded p-1"
              required
            />
          </div>

          <div>
            <WordEditor
              label=''
              data={events?.content || ""}
              onChange={(val) => setEvents((prev) => ({ ...prev, content: val }))}
            />
          </div>

          {error && <p className="news-admin-error">{error}</p>}

          <div className="preview-container">
            <div className="button-group" style={{ marginLeft: '200px' }}>
              <FormSubmit
                handle={handleSubmit}
                update={state !== null ? true : false}
                isDisabled={!events?.title || !events?.image || !events?.author || !events?.content || !events?.location || !events?.date}>
                {state !== null ? 'Cập nhật sự kiện' : 'Đăng sự kiện'}
              </FormSubmit>
              <CancelButton urlBack="/admin/dashboard/events">Hủy</CancelButton>
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
