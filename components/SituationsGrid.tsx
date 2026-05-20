import { SITUATIONS } from "@/lib/situations";

export default function SituationsGrid() {
  return (
    <div className="mb-8">
      <div className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-3">
        Situations de vie
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {SITUATIONS.map((s) => (
          <a
            key={s.slug}
            href={`#${s.slug}`}
            className="group relative bg-white rounded-2xl p-4 flex flex-col items-center text-center gap-2 border-[1.5px] border-gray-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            style={{ borderColor: undefined }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = s.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "";
            }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition"
              style={{ background: s.bg }}
            >
              {s.icon}
            </div>
            <div className="text-sm font-bold text-gray-800 leading-tight">{s.label}</div>
            <div className="text-[11px] text-gray-400">{s.sub}</div>
            {s.badge && (
              <div
                className={`absolute top-2 right-2 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border uppercase tracking-wide ${
                  s.badge.type === "new"
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-amber-100 text-amber-700 border-amber-200"
                }`}
              >
                {s.badge.text}
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
