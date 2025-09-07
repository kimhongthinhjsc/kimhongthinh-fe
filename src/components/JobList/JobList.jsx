import React from "react";
import Pagination from "~/components/Pagination/Pagination";
import { Calendar, Users, DollarSign, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import JobListSkeleton from "./SkeletonJobList";

export default function JobList({ careers, currentPage, totalPages, onPageChange }) {
  if (!careers || careers.length === 0) {
    return <JobListSkeleton />;
  }
  return (
    <section id="jobs" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Cơ Hội Nghề Nghiệp Tại Kim Hồng Thịnh
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8">
          {careers.map((job, index) => {
            const deadlineDate = new Date(job.deadline).toLocaleDateString("vi-VN");

            return (
              <div
                key={index}
                className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition flex flex-col"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  {job.title}
                </h2>

                <div className="space-y-2 text-sm text-gray-600 flex-1">
                  <p className="flex items-center gap-2">
                    <DollarSign size={16} className="text-yellow-500" />
                    {job.salary}
                  </p>
                  <p className="flex items-center gap-2">
                    <Briefcase size={16} className="text-purple-500" />
                    {job.experience}
                  </p>
                  <p className="flex items-center gap-2">
                    <Users size={16} className="text-green-500" />
                    {job.quantity} người
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar size={16} className="text-blue-500" />
                    Hạn: {deadlineDate}
                  </p>
                </div>
                <div className="mt-4">
                  <a
                    href={`/tuyen-dung/${job._id}`}
                    className="w-full block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
                  >
                    Xem chi tiết
                  </a></div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </section>
  );
}
