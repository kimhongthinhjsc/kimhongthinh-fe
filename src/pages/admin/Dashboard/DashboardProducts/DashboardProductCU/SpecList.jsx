export default function SpecList({ specifications, onChange }) {
  const handlePaste = (e, index) => {
    const paste = e.clipboardData.getData("text");
    const lines = paste.split(/\r?\n/).filter((line) => line.trim() !== "");

    if (lines.length > 1) {
      e.preventDefault();
      const parsed = lines.map((line) => {
        let [key, ...rest] = line.split(/\t|:/);
        return {
          key: key?.trim() || "",
          value: rest.join(":").trim() || "",
        };
      });

      // Ghi đè ô hiện tại + thêm các dòng mới
      const newList = [...specifications];
      newList[index] = parsed[0]; // dòng đầu thay thế ô hiện tại
      onChange([...newList, ...parsed.slice(1)]); // các dòng sau thêm mới
    }
  };

  // Nếu rỗng thì tạo sẵn 1 cặp mẫu
  const specList =
    specifications.length > 0
      ? specifications
      : [{ key: "", value: "" }];

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-2">
      <label className="block font-semibold">Thông số kỹ thuật</label>
      {specList.map((spec, i) => (
        <div key={i} className="flex gap-2 items-center mb-2">
          <input
            type="text"
            placeholder="Tên thông số"
            value={spec.key}
            onChange={(e) => {
              const list = [...specList];
              list[i] = { ...list[i], key: e.target.value };
              onChange(list);
            }}
            className="border rounded p-2 flex-1"
            onPaste={(e) => handlePaste(e, i)}
          />
          <input
            type="text"
            placeholder="Giá trị"
            value={spec.value}
            onChange={(e) => {
              const list = [...specList];
              list[i] = { ...list[i], value: e.target.value };
              onChange(list);
            }}
            className="border rounded p-2 flex-1"
          />
          <button
            onClick={() =>
              onChange(specList.filter((_, idx) => idx !== i))
            }
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Xoá
          </button>
        </div>
      ))}
      <button
        onClick={() =>
          onChange([...specList, { key: "", value: "" }])
        }
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        + Thêm thông số
      </button>
    </div>
  );
}
