import React from "react";

export default function JobListSkeleton() {
  return (
    <section id="jobs" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Cơ Hội Nghề Nghiệp Tại Kim Hồng Thịnh
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8 animate-pulse">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-6 flex flex-col space-y-4"
            >
              {/* Title */}
              <div className="h-5 w-3/4 bg-gray-200 rounded" />

              {/* Info lines */}
              <div className="space-y-3 flex-1">
                <div className="h-4 w-1/2 bg-gray-200 rounded" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
                <div className="h-4 w-1/3 bg-gray-200 rounded" />
                <div className="h-4 w-1/2 bg-gray-200 rounded" />
              </div>

              {/* Button */}
              <div className="h-9 w-28 bg-gray-200 rounded-lg" />
            </div>
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="mt-8 flex justify-center gap-2 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-9 w-9 bg-gray-200 rounded-lg"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
