export default function HighlightList({ highlights, onChange }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-2">
      <label className="block font-semibold">Highlights</label>
      {highlights.map((h, i) => (
        <div key={i} className="flex gap-2 items-center mb-2">
          <input
            type="text"
            value={h}
            onChange={(e) => {
              const list = [...highlights];
              list[i] = e.target.value;
              onChange(list);
            }}
            className="border rounded p-2 flex-1"
          />
          <button
            onClick={() => onChange(highlights.filter((_, idx) => idx !== i))}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Xoá
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...highlights, ""])}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        + Thêm highlight
      </button>
    </div>
  );
}
