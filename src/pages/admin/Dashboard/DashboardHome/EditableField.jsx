import React, { useState } from "react";

export default function EditableField({ value, onChange, multiline = false }) {
  const [editing, setEditing] = useState(false);

  const handleBlur = () => setEditing(false);

  if (editing) {
    return multiline ? (
      <textarea
        className="border px-2 py-1 rounded w-full text-black"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        autoFocus
      />
    ) : (
      <input
        className="border px-2 py-1 rounded w-full text-black"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        autoFocus
      />
    );
  }

  return (
    <span
      className="relative group cursor-pointer"
      onClick={() => setEditing(true)}
    >
      {value}
      <span className="ml-2 text-gray-400 group-hover:text-blue-500">
        <i className="fa fa-pen"></i>
      </span>
    </span>
  );
}
