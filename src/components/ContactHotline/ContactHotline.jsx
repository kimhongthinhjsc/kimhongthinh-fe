import React from "react";
import { Phone, Headphones, MessageCircle } from "lucide-react";

export default function ContactHotline({ data }) {
    if (!data) return null;
  const renderIcon = (icon) => {
    switch (icon) {
      case "phone":
        return <Phone className="w-6 h-6 text-[#EF5627]" />;
      case "headphones":
        return <Headphones className="w-6 h-6 text-[#EF5627]" />;
      case "zalo":
        return <MessageCircle className="w-6 h-6 text-[#00aaff]" />;
      default:
        return null;
    }
  };
  console.log(data);

  return (
    <section className="bg-white py-12 px-6 md:px-20">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.items.map((item, idx) => (
          <a
            key={idx}
            href={item.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <div className="shrink-0">{renderIcon(item.icon)}</div>
            <div>
              <p className="text-gray-900 font-semibold text-base">
                {item.title}
              </p>
              <p className="text-[#EF5627] text-lg font-bold">{item.value}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
