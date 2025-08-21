export default function ServiceDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-6 bg-white rounded-xl shadow-md max-w-4xl mx-auto">
      <div className="h-8 bg-gray-300 rounded w-1/2"></div>
      <div className="h-64 bg-gray-300 rounded"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
      <div className="h-6 bg-gray-300 rounded w-1/4 mt-4"></div>
    </div>
  );
}
