import React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { nanoid } from "nanoid";

import EditableField from "~/components/EditableField/EditableField";

// Sortable Item
import SortableItem from "./SortableItem";

// Main Component
export default function EditEcosystemSection({ data, onChange }) {
  const eco = data?.ecosystem ?? {};

  const setEco = (patch) => onChange("ecosystem", { ...eco, ...patch });

  // Khi load data, thêm id nếu chưa có
  const items = (eco.items || []).map((item) => ({
    ...item,
    id: item.id || nanoid(),
  }));

  const updateItem = (id, patch) => {
    const list = items.map((item) =>
      item.id === id ? { ...item, ...patch } : item
    );
    setEco({ items: list });
  };

  const removeItem = (id) => {
    const list = items.filter((item) => item.id !== id);
    setEco({ items: list });
  };

  const addItem = () => {
    const list = [...items];
    list.push({ id: nanoid(), name: "", desc: "", link: "", icon: "" });
    setEco({ items: list });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      const newItems = arrayMove([...items], oldIndex, newIndex);
      setEco({ items: newItems });
    }
  };

  return (
    <section className="py-12 px-6 md:px-20 bg-gray-50 rounded-xl">
      <div className="max-w-7xl mx-auto text-center">
        {/* Tiêu đề */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#EF5627] mb-10">
          <EditableField
            value={eco.title}
            onChange={(val) => setEco({ title: val })}
            placeholder="Tiêu đề Ecosystem"
          />
        </h2>

        {/* Grid Items */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((i) => i.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <SortableItem
                  key={item.id}
                  item={item}
                  updateItem={updateItem}
                  removeItem={removeItem}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {/* Thêm mới */}
        <div className="mt-8">
          <button
            onClick={addItem}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded"
          >
            + Thêm phần mềm
          </button>
        </div>
      </div>
    </section>
  );
}
