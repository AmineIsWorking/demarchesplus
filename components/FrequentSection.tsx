import { FREQUENT } from "@/lib/situations";

export default function FrequentSection() {
  return (
    <div>
      <div className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-3">
        Démarches fréquentes
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {FREQUENT.map((f, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-4 border-[1.5px] border-gray-200 cursor-pointer flex items-center gap-3 hover:border-navy hover:shadow transition"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
              style={{ background: f.bg }}
            >
              {f.icon}
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-gray-800">{f.title}</div>
              <div className="text-xs text-gray-400">{f.sub}</div>
            </div>
            <div className="text-gray-300 text-base">›</div>
          </div>
        ))}
      </div>
    </div>
  );
}
