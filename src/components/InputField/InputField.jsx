export default function InputField({ label, type = "text", value, onChange }) {
  return (
    <div>
      <label className="block font-semibold">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="border rounded p-2 w-full"
      />
    </div>
  );
}
