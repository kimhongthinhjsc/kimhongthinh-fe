import React from "react";
import Pagination from "~/components/Pagination/Pagination";
import { Calendar, Users, DollarSign, Briefcase, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import JobListSkeleton from "./SkeletonJobList";

export default function JobList({ careers, currentPage, totalPages, onPageChange }) {
  if (!careers || careers.length === 0) {
    return <JobListSkeleton />;
  }

  return (
    <section id="jobs" className="py-12 bg-transparent">
      <div className="container mx-auto px-4">
        {/* Tiêu đề phần */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Vị Trí Đang Tuyển Dụng
          </h2>
          <p className="text-gray-500 text-base mt-3">
            Gia nhập cùng Kim Hồng Thịnh để bắt đầu hành trình sự nghiệp mới
          </p>
        </div>

        {/* Danh sách thẻ công việc */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8">
          {careers.map((job, index) => {
            const deadlineDate = new Date(job.deadline).toLocaleDateString("vi-VN");

            return (
              <div
                key={job._id || index}
                className="bg-white border border-gray-200/80 rounded-2xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Tên công việc: Tăng từ text-lg lên text-xl md:text-2xl */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 pb-4 border-b border-gray-100 line-clamp-2 leading-snug">
                    {job.title}
                  </h3>

                  {/* Chi tiết: Tăng spacing, size chữ text-base và size Icon lên 20px */}
                  <div className="space-y-4 text-base text-gray-600">
                    <p className="flex items-center gap-3">
                      <DollarSign size={20} className="text-amber-500 shrink-0" />
                      <span className="font-semibold text-gray-800">{job.salary}</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <Briefcase size={20} className="text-blue-500 shrink-0" />
                      <span className="text-gray-700">{job.experience}</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <Users size={20} className="text-emerald-500 shrink-0" />
                      <span className="text-gray-700">{job.quantity} người</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <Calendar size={20} className="text-rose-500 shrink-0" />
                      <span className="text-gray-700">Hạn nộp: {deadlineDate}</span>
                    </p>
                  </div>
                </div>

                {/* Nút Xem chi tiết: Tăng padding py-3 và font-size text-base */}
                <div className="mt-8 pt-4 border-t border-gray-100">
                  <Link
                    to={`/tuyen-dung/${job._id}`}
                    className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base rounded-xl transition duration-200 shadow-md shadow-blue-500/20 group"
                  >
                    <span>Xem chi tiết</span>
                    <ArrowRight size={18} className="transform group-hover:translate-x-1 transition" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
}
