import EditableImage from "~/components/EditableImage/EditableImage";
import EditableField from "~/components/EditableField/EditableField";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";

export default function SortableItem({ item, updateItem, removeItem }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group bg-white rounded-2xl shadow-md p-6 relative ${
        isDragging ? "bg-emerald-50" : ""
      }`}
    >
      {/* Handle để kéo thả */}
      <button
        {...attributes}
        {...listeners}
        className="absolute top-0 left-0 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <FaExpandArrowsAlt size={20} />
      </button>

      {/* Nút xóa */}
      <button
        onClick={() => removeItem(item.id)}
        className="absolute top-0 right-0 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <TiDeleteOutline size={28} />
      </button>

      <div className="flex items-start gap-4 min-h-20">
        {/* Logo bên trái */}
        <div className="flex-shrink-0 w-16 h-16">
          <EditableImage
            src={item.icon}
            onChange={(val) => updateItem(item.id, { icon: val })}
            label="Icon"
          />
        </div>

        {/* Nội dung bên phải */}
        <div className="flex-1 text-left px-2">
          {/* Name */}
          <h3 className="text-lg font-semibold text-[#363F69]">
            <EditableField
              value={item.name}
              onChange={(val) => updateItem(item.id, { name: val })}
              placeholder="Tên phần mềm"
            />
          </h3>

          {/* Desc */}
          <p className="text-gray-600 text-sm line-clamp-2">
            <EditableField
              value={item.desc}
              onChange={(val) => updateItem(item.id, { desc: val })}
              placeholder="Mô tả ngắn"
              className="text-gray-600 text-sm mt-1 line-clamp-2"
              multiline
            />
          </p>
        </div>
      </div>
      {/* Link */}
      <div className="mt-2 flex  text-sm">
        <span className="text-gray-500">🔗</span>
        <EditableField
          value={item.link}
          onChange={(val) => updateItem(item.id, { link: val })}
          type="url"
          placeholder="https://..."
        />
      </div>
    </div>
  );
}
