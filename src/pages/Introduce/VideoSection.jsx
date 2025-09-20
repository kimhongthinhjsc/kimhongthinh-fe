import { useState } from "react";

export default function VideoSection({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  const lightbox_open = () => setIsOpen(true);
  const lightbox_close = () => setIsOpen(false);

  if (!data) return null;

  // Kiểm tra link YouTube
  const isYouTube =
    data.videoUrl.includes("youtube.com") || data.videoUrl.includes("youtu.be");

  // Tạo link nhúng YouTube nếu có
  let youtubeEmbedUrl = "";
  if (isYouTube) {
    if (data.videoUrl.includes("youtu.be")) {
      youtubeEmbedUrl = data.videoUrl
        .replace("youtu.be/", "www.youtube.com/embed/")
        .split("?")[0];
    } else if (data.videoUrl.includes("watch?v=")) {
      youtubeEmbedUrl = data.videoUrl.replace("watch?v=", "embed/");
    }
  }

  return (
    <section id="sdsc_video" className="py-10 bg-gray-50">
      <div className="container mx-auto max-w-5xl px-6 md:px-12 text-center">
        {/* Thumbnail */}
        <div className="company-video cursor-pointer" onClick={lightbox_open}>
          <img
            className="max-w-full mx-auto rounded-lg shadow-md hover:opacity-90 transition"
            src={data.poster}
            alt="Softdreams Video"
          />
        </div>

        {/* Lightbox */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/70 z-40"
              onClick={lightbox_close}
            ></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="relative w-[90%] max-w-3xl">
                <button
                  className="absolute -top-10 right-0 text-white text-3xl font-bold hover:text-gray-300"
                  onClick={lightbox_close}
                >
                  &times;
                </button>

                {/* Nếu YouTube thì render iframe, còn lại render video */}
                {isYouTube ? (
                  <div className="w-full aspect-video">
                    <iframe
                      className="w-full h-full rounded-lg shadow-lg"
                      src={`${youtubeEmbedUrl}?autoplay=1`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <video
                    controls
                    autoPlay
                    className="w-full rounded-lg shadow-lg"
                  >
                    <source src={data.videoUrl} type="video/mp4" />
                    Trình duyệt của bạn không hỗ trợ video.
                  </video>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
