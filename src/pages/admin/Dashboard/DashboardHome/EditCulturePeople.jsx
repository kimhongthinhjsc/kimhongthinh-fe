import EditableField from "./EditableField";
import EditableImage from "./EditableImage";

export default function EditCulturePeople({ data, onChange }) {
  const culture = data?.culture || { title: "", images: [] };

  const handleChange = (index, value) => {
    const updatedCulture = {
      ...culture,
      images: culture.images.map((img, i) => (i === index ? value : img)),
    };
    onChange("culture", updatedCulture);
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 mt-6 border border-gray-100">
      {/* Tiêu đề */}
      <div className="mb-8 text-center">
        <EditableField
          value={culture.title || ""}
          onChange={(val) => onChange("culture", { ...culture, title: val })}
          multiline
        />
      </div>

      {/* Grid ảnh */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {culture.images?.map((src, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <EditableImage
              src={src}
              onChange={(val) => handleChange(index, val)}
              className="w-full h-56 object-cover rounded-lg"
              label={`Ảnh ${index + 1}`}
            />
            <p className="text-sm text-gray-500">Ảnh {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
