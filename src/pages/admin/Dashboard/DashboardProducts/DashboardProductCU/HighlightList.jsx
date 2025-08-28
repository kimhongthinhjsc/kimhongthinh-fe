export default function HighlightList({ highlights, onChange }) {
  const handlePasteOrEnter = (e, index) => {
    // Xử lý dán nhiều dòng
    if (e.type === "paste") {
      const paste = e.clipboardData.getData("text");
      const lines = paste.split(/\r?\n/).filter((line) => line.trim() !== "");

      if (lines.length > 1) {
        e.preventDefault();
        const newList = [...highlights];
        newList[index] = lines[0]; // dòng đầu thay thế
        onChange([...newList, ...lines.slice(1)]); // thêm các dòng sau
      }
    }

    // Xử lý nhấn Enter (xuống dòng)
    if (e.type === "keydown" && e.key === "Enter") {
      e.preventDefault();
      const newList = [...highlights];
      // thêm 1 dòng trống sau ô hiện tại
      newList.splice(index + 1, 0, "");
      onChange(newList);
    }
  };

  // Nếu rỗng thì render sẵn 1 ô
  const list = highlights.length > 0 ? highlights : [""];

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-2">
      <label className="block font-semibold">Ưu điểm nổi bật</label>
      {list.map((h, i) => (
        <div key={i} className="flex gap-2 items-center mb-2">
          <input
            type="text"
            value={h}
            placeholder="Nhập ưu điểm nổi bật..."
            onChange={(e) => {
              const newList = [...list];
              newList[i] = e.target.value;
              onChange(newList);
            }}
            onPaste={(e) => handlePasteOrEnter(e, i)}
            onKeyDown={(e) => handlePasteOrEnter(e, i)}
            className="border rounded p-2 flex-1"
          />
          <button
            onClick={() => onChange(list.filter((_, idx) => idx !== i))}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Xoá
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...list, ""])}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        + Thêm ưu điểm nổi bật
      </button>
    </div>
  );
}

