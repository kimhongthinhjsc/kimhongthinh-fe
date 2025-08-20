import React from "react";

export default function IntroduceSkeleton() {
  return (
    <div className="animate-pulse w-full">
      {/* Banner */}
      <div className="w-full h-[400px] bg-gray-200 rounded-md"></div>

      <div className="px-6 md:px-12 py-8 space-y-10">
        {/* SomethingAbout */}
        <div className="space-y-4">
          <div className="h-6 w-2/3 bg-gray-200 rounded"></div>
          <div className="h-48 w-full bg-gray-200 rounded-md"></div>
        </div>

        {/* VideoSection */}
        <div className="space-y-4">
          <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
          <div className="h-72 w-full bg-gray-200 rounded-md"></div>
        </div>

        {/* RoadSection */}
        <div className="space-y-4">
          <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
          <div className="h-64 w-full bg-gray-200 rounded-md"></div>
        </div>

        {/* BehaviorRules */}
        <div className="space-y-4">
          <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
          <div className="h-48 w-full bg-gray-200 rounded-md"></div>
        </div>

        {/* CoreValue */}
        <div className="space-y-4">
          <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
          <div className="h-56 w-full bg-gray-200 rounded-md"></div>
        </div>

        {/* Testimonials */}
        <div className="space-y-4">
          <div className="h-6 w-2/3 bg-gray-200 rounded"></div>
          <div className="h-64 w-full bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
