// pages/admin/Dashboard/DashboardIntroduceSkeleton.jsx
import React from "react";
import { Skeleton } from "@mui/material";

export default function DashboardIntroduceSkeleton() {
  return (
    <div className="w-full p-6">
      {/* Banner */}
      <div className="mb-6">
        <Skeleton variant="text" width={200} height={30} />
        <Skeleton variant="rectangular" width="100%" height={256} className="rounded-xl" />
      </div>

      {/* Something About */}
      <div className="mb-6">
        <Skeleton variant="text" width={250} height={30} />
        <div className="space-y-2">
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="80%" height={20} />
        </div>
      </div>

      {/* Video Section */}
      <div className="mb-6">
        <Skeleton variant="text" width={200} height={30} />
        <Skeleton variant="rectangular" width="100%" height={200} className="rounded-xl" />
      </div>

      {/* Road Section */}
      <div className="mb-6">
        <Skeleton variant="text" width={220} height={30} />
        <div className="space-y-2">
          <Skeleton variant="text" width="90%" height={20} />
          <Skeleton variant="text" width="70%" height={20} />
        </div>
      </div>

      {/* Behavior Rules */}
      <div className="mb-6">
        <Skeleton variant="text" width={180} height={30} />
        <div className="space-y-2">
          <Skeleton variant="text" width="95%" height={20} />
          <Skeleton variant="text" width="80%" height={20} />
        </div>
      </div>

      {/* Core Value */}
      <div className="mb-6">
        <Skeleton variant="text" width={200} height={30} />
        <div className="grid grid-cols-2 gap-4 mt-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width="100%"
              height={120}
              className="rounded-xl"
            />
          ))}
        </div>
      </div>

      {/* Clients Testimonials */}
      <div className="mb-6">
        <Skeleton variant="text" width={220} height={30} />
        <div className="grid grid-cols-3 gap-4 mt-2">
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width="100%"
              height={160}
              className="rounded-xl"
            />
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <Skeleton variant="rectangular" width={150} height={40} className="rounded-xl" />
      </div>
    </div>
  );
}
