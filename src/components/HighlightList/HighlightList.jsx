import React from "react";
import { CheckCircle2 } from "lucide-react";

const HighlightList = ({ highlights = [], className = "" }) => {
  if (!highlights.length) return null;

  return (
    <div className={`space-y-2 ${className}`}>
      {highlights.map((h, i) => (
        <div key={i} className="flex items-center text-gray-700">
          <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
          {h}
        </div>
      ))}
    </div>
  );
};

export default HighlightList;
