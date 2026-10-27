import React from "react";
import { Monitor, FileSpreadsheet, ArrowRight, CheckCircle2 } from "lucide-react";
import EditableField from "~/components/EditableField/EditableField";

export default function EditDualCoreServices({ data, onChange }) {
  const dualCore = data?.dualCore ?? {};

  const setDualCore = (patch) => {
    onChange("dualCore", { ...dualCore, ...patch });
  };

  const handleItemChange = (section, idx, val) => {
    const list = [...(dualCore[section] || [])];
    list[idx] = val;
    setDualCore({ [section]: list });
  };

  const addItem = (section) => {
    const list = [...(dualCore[section] || [])];
    list.push("Tính năng mới...");
    setDualCore({ [section]: list });
  };

  const removeItem = (section, idx) => {
    const list = [...(dualCore[section] || [])];
    list.splice(idx, 1);
    setDualCore({ [section]: list });
  };

  const itItems = dualCore.itItems || [
    "Máy tính văn phòng, bộ PC build theo yêu cầu",
    "Máy in bill, máy quét mã vạch, phần mềm POS",
    "Lắp đặt hệ thống mạng & bảo trì máy tính tận nơi",
  ];

  const accItems = dualCore.accItems || [
    "Kế toán thuế trọn gói & kê khai thuế định kỳ",
    "Thành lập doanh nghiệp, thay đổi đăng ký kinh doanh",
    "Rà soát sổ sách & tư vấn tối ưu chi phí thuế",
  ];

  return (
    <section className="py-12 bg-gray-50/50 relative overflow-hidden rounded-2xl mb-8 border border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Tiêu đề khối */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-3">
            <EditableField
              value={dualCore.sectionBadge}
              onChange={(val) => setDualCore({ sectionBadge: val })}
              placeholder="DỊCH VỤ CỐT LÕI SONG HÀNH"
            />
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            <EditableField
              value={dualCore.sectionTitle}
              onChange={(val) => setDualCore({ sectionTitle: val })}
              placeholder="Giải Pháp Toàn Diện Cho Doanh Nghiệp"
            />
          </h2>
          <div className="mt-3 text-sm sm:text-base text-gray-600">
            <EditableField
              value={dualCore.sectionDesc}
              onChange={(val) => setDualCore({ sectionDesc: val })}
              multiline
              placeholder="Sự kết hợp hoàn hảo giữa hạ tầng công nghệ hiện đại và giải pháp tài chính minh bạch."
            />
          </div>
        </div>

        {/* Lưới 2 cột dịch vụ - Khớp 100% Bố cục Client */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Card 1: Mảng Công Nghệ & Bán Hàng */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100">
                  <Monitor className="w-8 h-8 text-blue-600" />
                </div>
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  <EditableField
                    value={dualCore.itBadge}
                    onChange={(val) => setDualCore({ itBadge: val })}
                    placeholder="Mảng Công Nghệ & Bán Hàng"
                  />
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                <EditableField
                  value={dualCore.itTitle}
                  onChange={(val) => setDualCore({ itTitle: val })}
                  placeholder="Giải Pháp CNTT & Thiết Bị POS"
                />
              </h3>
              <div className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                <EditableField
                  value={dualCore.itDesc}
                  onChange={(val) => setDualCore({ itDesc: val })}
                  multiline
                  placeholder="Cung cấp hạ tầng máy tính, phần mềm quản lý..."
                />
              </div>

              {/* Danh sách đặc điểm mảng IT */}
              <ul className="space-y-3 mb-6 border-t border-gray-100 pt-6">
                {itItems.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between gap-3 text-sm text-gray-700 font-medium group">
                    <div className="flex items-start gap-3 w-full">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div className="w-full">
                        <EditableField
                          value={item}
                          onChange={(val) => handleItemChange("itItems", idx, val)}
                          placeholder="Nhập tiêu chuẩn..."
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem("itItems", idx)}
                      className="text-red-400 hover:text-red-600 text-xs px-2 py-1 rounded bg-red-50"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => addItem("itItems")}
                className="text-xs font-semibold text-blue-600 hover:underline mb-6 block"
              >
                + Thêm dòng ưu điểm
              </button>
            </div>

            <div>
              <div className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-blue-600 text-white font-semibold rounded-xl shadow-md">
                <EditableField
                  value={dualCore.itBtnText}
                  onChange={(val) => setDualCore({ itBtnText: val })}
                  placeholder="Khám phá sản phẩm CNTT"
                />
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 2: Mảng Tài Chính & Pháp Lý */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-100">
                  <FileSpreadsheet className="w-8 h-8 text-indigo-600" />
                </div>
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  <EditableField
                    value={dualCore.accBadge}
                    onChange={(val) => setDualCore({ accBadge: val })}
                    placeholder="Mảng Tài Chính & Pháp Lý"
                  />
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                <EditableField
                  value={dualCore.accTitle}
                  onChange={(val) => setDualCore({ accTitle: val })}
                  placeholder="Dịch Vụ Kế Toán & Thuế Trọn Gói"
                />
              </h3>
              <div className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                <EditableField
                  value={dualCore.accDesc}
                  onChange={(val) => setDualCore({ accDesc: val })}
                  multiline
                  placeholder="Đồng hành cùng doanh nghiệp xử lý hồ sơ thuế..."
                />
              </div>

              {/* Danh sách đặc điểm mảng Kế Toán */}
              <ul className="space-y-3 mb-6 border-t border-gray-100 pt-6">
                {accItems.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between gap-3 text-sm text-gray-700 font-medium group">
                    <div className="flex items-start gap-3 w-full">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div className="w-full">
                        <EditableField
                          value={item}
                          onChange={(val) => handleItemChange("accItems", idx, val)}
                          placeholder="Nhập tiêu chuẩn..."
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem("accItems", idx)}
                      className="text-red-400 hover:text-red-600 text-xs px-2 py-1 rounded bg-red-50"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => addItem("accItems")}
                className="text-xs font-semibold text-indigo-600 hover:underline mb-6 block"
              >
                + Thêm dòng ưu điểm
              </button>
            </div>

            <div>
              <div className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-indigo-600 text-white font-semibold rounded-xl shadow-md">
                <EditableField
                  value={dualCore.accBtnText}
                  onChange={(val) => setDualCore({ accBtnText: val })}
                  placeholder="Tìm hiểu dịch vụ Kế toán"
                />
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
