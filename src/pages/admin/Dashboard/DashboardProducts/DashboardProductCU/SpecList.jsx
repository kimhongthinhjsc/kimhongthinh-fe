export default function SpecList({ specifications, onChange }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-2">
      <label className="block font-semibold">Thông số kỹ thuật</label>
      {specifications.map((spec, i) => (
        <div key={i} className="flex gap-2 items-center mb-2">
          <input
            type="text"
            placeholder="Key"
            value={spec.key}
            onChange={(e) => {
              const list = [...specifications];
              list[i] = { ...list[i], key: e.target.value };
              onChange(list);
            }}
            className="border rounded p-2 flex-1"
          />
          <input
            type="text"
            placeholder="Value"
            value={spec.value}
            onChange={(e) => {
              const list = [...specifications];
              list[i] = { ...list[i], value: e.target.value };
              onChange(list);
            }}
            className="border rounded p-2 flex-1"
          />
          <button
            onClick={() => onChange(specifications.filter((_, idx) => idx !== i))}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Xoá
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...specifications, { key: "", value: "" }])}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        + Thêm thông số
      </button>
    </div>
  );
}
