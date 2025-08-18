import EditableField from "./EditableField";

export default function EditHeroSection({ data, onChange }) {
  return (
    <section
      className="relative bg-cover bg-center p-6 rounded-xl text-white"
      style={{ backgroundImage: `url('${data.hero.background}')` }}
    >
      {/* Title */}
      <h2 className="text-3xl font-bold">
        <EditableField
          value={data.hero.title}
          onChange={(val) =>
            onChange("hero", { ...data.hero, title: val })
          }
        />
      </h2>

      {/* Subtitle */}
      <p className="mt-2">
        <EditableField
          value={data.hero.subtitle}
          onChange={(val) =>
            onChange("hero", { ...data.hero, subtitle: val })
          }
          multiline
        />
      </p>

      {/* Slogan */}
      <div className="mt-6">
        <EditableField
          value={data.hero.sloganTitle}
          onChange={(val) =>
            onChange("hero", { ...data.hero, sloganTitle: val })
          }
        />
        <br />
        <EditableField
          value={data.hero.sloganDesc}
          onChange={(val) =>
            onChange("hero", { ...data.hero, sloganDesc: val })
          }
        />
      </div>
    </section>
  );
}
