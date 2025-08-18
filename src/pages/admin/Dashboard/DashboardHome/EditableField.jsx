import React, { useState, useRef, useEffect } from "react";

export default function EditableField({ value, onChange, multiline = false }) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleBlur = () => setEditing(false);

  return (
    <span className="relative inline-flex items-center group cursor-pointer min-w-[50px]">
      {/* Text hiển thị */}
      <span
        className={`${editing ? "invisible" : "visible"} transition`}
        onClick={() => setEditing(true)}
      >
        {value || "..."}
        <span className="ml-1 text-gray-400 group-hover:text-blue-500">
          <i className="fa fa-pen text-xs"></i>
        </span>
      </span>

      {/* Input / Textarea chồng lên */}
      {editing &&
        (multiline ? (
          <textarea
            ref={inputRef}
            className="absolute left-0 top-0 w-full bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none text-black resize-none"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={handleBlur}
            rows={2}
          />
        ) : (
          <input
            ref={inputRef}
            className="absolute left-0 top-0 w-full bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none text-black"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={handleBlur}
          />
        ))}
    </span>
  );
}
