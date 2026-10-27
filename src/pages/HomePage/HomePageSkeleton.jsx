import React from "react";

export default function HomePageSkeleton() {
  return (
    <div className="animate-pulse space-y-10 p-6 max-w-7xl mx-auto">
      {/* Hero */}
      <div className="h-[400px] bg-gray-200 rounded-xl" />

      {/* Dual Core Services Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-64 bg-gray-200 rounded-2xl" />
        <div className="h-64 bg-gray-200 rounded-2xl" />
      </div>

      {/* Ecosystem */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-40 bg-gray-200 rounded-xl" />
        ))}
      </div>

      {/* Testimonial */}
      <div className="h-56 bg-gray-200 rounded-xl" />

      {/* CulturePeople */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-36 bg-gray-200 rounded-xl" />
        ))}
      </div>

      {/* Partners */}
      <div className="h-32 bg-gray-200 rounded-xl" />

      {/* News */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-48 bg-gray-200 rounded-xl" />
        ))}
      </div>

      {/* Contact */}
      <div className="h-28 bg-gray-200 rounded-xl" />
    </div>
  );
}
