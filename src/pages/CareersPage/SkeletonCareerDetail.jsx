import React from "react";
import {
  Calendar,
  Users,
  DollarSign,
  Briefcase,
  MapPin,
  Clock,
  Building2,
  Mail,
  Phone,
  Target,
  Gift,
  FileText,
} from "lucide-react";

export default function JobDetailSkeleton() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="w-full px-8">
        <div className="grid md:grid-cols-12 gap-8 animate-pulse">
          {/* Cột trái */}
          <div className="md:col-span-8 space-y-8">
            {/* Header */}
            <div className="bg-white shadow-lg rounded-2xl p-8 flex gap-6">
              <div className="w-28 h-28 bg-gray-200 rounded-xl" />
              <div className="space-y-3 flex-1">
                <div className="h-6 w-40 bg-gray-200 rounded" />
                <div className="h-4 w-64 bg-gray-200 rounded" />
                <div className="h-4 w-52 bg-gray-200 rounded" />
                <div className="h-4 w-60 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Thông tin chính */}
            <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6 border border-gray-100">
              <div className="h-6 w-56 bg-gray-200 rounded" />

              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gray-200 rounded" />
                    <div className="h-4 w-48 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-gray-50 rounded-xl p-5 border space-y-2"
                  >
                    <div className="h-5 w-40 bg-gray-200 rounded" />
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-3/4 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cột phải */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-white shadow-md rounded-2xl p-6 space-y-4">
              <div className="h-10 w-full bg-gray-200 rounded" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 space-y-3">
              <div className="h-5 w-40 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-44 bg-gray-200 rounded" />
              <div className="h-4 w-36 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
