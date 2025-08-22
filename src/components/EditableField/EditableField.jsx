import React, { useState, useRef, useEffect } from "react";

export default function EditableField({ value, onChange, multiline = false, className }) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleBlur = () => setEditing(false);

  return (
    <div className={`relative group cursor-pointer break-words translate-x-0 ${className}`}>
      {/* Text hiển thị */}
      {!editing && (
        <div
          className={` break-words border-b border-[transparent] focus:outline-none `}
          onClick={() => setEditing(true)}
        >
          {value || ""}
          <span className="ml-1 text-gray-400 group-hover:text-blue-500">
            <i className="fa fa-pen text-xs"></i>
          </span>
        </div>
      )}

      {/* Input / Textarea khi edit */}
      {editing &&
        (multiline ? (
          <textarea
            ref={inputRef}
            className="w-full bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none  resize-none break-words"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={handleBlur}
            rows={2}
          />
        ) : (
          <input
            ref={inputRef}
            className="w-full bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none break-words"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={handleBlur}
          />
        ))}
    </div>
  );
}
