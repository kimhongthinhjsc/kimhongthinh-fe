import React, { useState } from "react";
import { Phone, Headphones, MessageCircle, Send, CheckCircle, QrCode, Loader2 } from "lucide-react";

export default function ContactHotline({ data }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // Đã thêm state loading
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    service: "ke-toan", // Đã sửa chính tả kew-toan
    note: "",
  });

  const renderIcon = (icon) => {
    switch (icon) {
      case "phone":
        return <Phone className="w-5 h-5 text-amber-600" />;
      case "headphones":
        return <Headphones className="w-5 h-5 text-amber-600" />;
      default:
        return <Phone className="w-5 h-5 text-amber-600" />;
    }
  };

  const getServiceName = (code) => {
    switch (code) {
      case "ke-toan":
        return "Dịch vụ Kế toán & Thuế trọn gói";
      case "pos":
        return "Thiết bị POS & Phần mềm bán hàng";
      case "dn":
        return "Thành lập doanh nghiệp / Chữ ký số";
      default:
        return "Giải pháp tổng thể khác";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbz7QLRkW4aq1u4dErYQIwD948iBW-tYA7r9xdhUd-hxHn-jkrY-TIM4Qb4IIpbZypmP0Q/exec";

    try {
      await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          service: getServiceName(formData.service),
          note: formData.note,
        }),
      });

      setSubmitted(true);
      setFormData({
        fullName: "",
        phone: "",
        service: "ke-toan",
        note: "",
      });

      setTimeout(() => setSubmitted(false), 5000);

    } catch (error) {
      console.error("Lỗi gửi thông tin:", error);
      alert("Có lỗi xảy ra, vui lòng liên hệ trực tiếp Hotline!");
    } finally {
      setLoading(false);
    }
  };  

  const displayItems = data?.items ? data.items.slice(0, 2) : [
    { title: "Hotline mua hàng", value: "03 6666 0237", icon: "phone", link: "tel:03 6666 0237" },
    { title: "Tổng đài hỗ trợ & CSKH", value: "03 6666 0237", icon: "headphones", link: "tel:03 6666 0237" }
  ];

  return (
    <section id="contact-section" className="py-16 md:py-24 bg-gradient-to-b from-amber-50/20 via-white to-amber-50/30 border-t border-amber-100/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-4 py-1.5 rounded-full border border-amber-200/80 inline-block mb-3">
            Tư Vấn Miễn Phí
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Liên Hệ Với <span className="text-amber-600">Kim Hồng Thịnh</span> Ngay
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Đội ngũ chuyên viên CNTT & Kế toán luôn sẵn sàng hỗ trợ giải đáp mọi thắc mắc của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* CỘT TRÁI: Form Đăng Ký */}
          <div className="lg:col-span-6 bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-amber-200/60 shadow-lg shadow-amber-500/5 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900">
                  Đăng Ký Tư Vấn <span className="text-amber-600">Giải Pháp</span>
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  Để lại thông tin, chuyên viên sẽ liên hệ lại tư vấn sau 15 phút.
                </p>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center my-auto transition-all">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-emerald-800 mb-1">Gửi thông tin thành công!</h4>
                  <p className="text-slate-600 text-sm">Cảm ơn bạn, Kim Hồng Thịnh sẽ gọi lại ngay.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        className="w-full bg-slate-50/70 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-amber-400 transition-all"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                        Số điện thoại / Zalo *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0901234567"
                        className="w-full bg-slate-50/70 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-amber-400 transition-all"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Dịch vụ cần tư vấn
                    </label>
                    <select
                      className="w-full bg-slate-50/70 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-amber-400 transition-all"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      <option value="kew-toan">Dịch vụ Kế Toán và Thuế trọn gói</option>
                      <option value="pos">Thiết bị POS & Phần mềm bán hàng</option>
                      <option value="dv">Dịch vụ Chữ Ký Số & Hóa Đơn</option>
                      <option value="khac">Giải pháp tổng thể khác</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Ghi chú thêm (nếu có)
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Nhu cầu cụ thể của bạn..."
                      className="w-full bg-slate-50/70 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-amber-400 transition-all resize-none"
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    ></textarea>
                  </div>

                  {/* Nút Gửi */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 uppercase tracking-wide text-xs sm:text-sm disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        GỬI YÊU CẦU TƯ VẤN
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* CỘT PHẢI */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            <div className="bg-gradient-to-br from-amber-500/10 via-amber-400/15 to-amber-500/5 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-amber-300/50 shadow-lg shadow-amber-500/5 relative overflow-hidden flex flex-col justify-between">
              
              <div className="flex items-center justify-between gap-4 relative z-10 mb-5">
                <div className="pr-2">
                  <div className="inline-flex items-center gap-1.5 bg-amber-500/15 text-amber-800 border border-amber-300/60 px-3 py-1 rounded-lg text-xs font-bold mb-3">
                    <MessageCircle className="w-3.5 h-3.5 fill-current text-amber-600" />
                    Zalo Official Account
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                    Quan tâm Zalo OA Kim Hồng Thịnh
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Nhận thông báo ưu đãi phần mềm, tra cứu thông tin hóa đơn & tư vấn kỹ thuật trực tiếp qua Zalo.
                  </p>
                </div>

                <div className="bg-white/90 p-3 rounded-2xl shrink-0 border border-amber-200/80 shadow-sm text-center">
                  <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center border border-slate-100 p-1">
                    <QrCode className="w-20 h-20 text-slate-800" />
                  </div>
                  <span className="text-[10px] font-bold text-amber-800 mt-1.5 block uppercase tracking-wider">Quét mã QR</span>
                </div>
              </div>

              <a
                href="https://zalo.me/0366660237"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20 uppercase tracking-wide"
              >
                <MessageCircle className="w-4 h-4 fill-current text-white" />
                Mở Zalo Quan Tâm Ngay
              </a>
            </div>

            <div className="space-y-3 pt-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                Kênh hỗ trợ trực tiếp
              </p>
              {displayItems.map((item, idx) => (
                /* Đã đổi từ <a> sang <div>, bỏ href và đổi cursor thành default */
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-white/80 backdrop-blur-sm p-4 sm:p-4.5 rounded-2xl border border-amber-200/60 shadow-sm transition-all cursor-default select-none"
                >
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 shrink-0">
                    {renderIcon(item.icon)}
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs font-medium">{item.title}</p>
                    <p className="text-slate-900 text-lg font-extrabold">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}