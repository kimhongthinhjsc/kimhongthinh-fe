import React from "react";
import Pagination from "~/components/Pagination/Pagination";

export default function JobList({ jobs, currentPage, totalPages, onPageChange }) {
  return (
    <section id="jobs" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Cơ Hội Nghề Nghiệp Tại SoftDreams
        </h1>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition"
            >
              <a href={job.link} target="_blank" rel="noopener noreferrer">
                <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 mb-2">
                  {job.title}
                </h2>
              </a>
              <p className="text-gray-600 text-sm mb-3">{job.desc}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>📍 {job.location}</span>
                <span>⏱ {job.type}</span>
              </div>
              <div className="mt-2 text-sm text-gray-400">{job.date}</div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </section>
  );
}
