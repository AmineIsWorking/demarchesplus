"use client";

import { useState } from "react";

export default function Hero() {
  const [query, setQuery] = useState("");

  return (
    <div className="bg-white px-8 pt-8 pb-7 text-center border-b border-gray-200">
      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1 tracking-tight">
        Que souhaitez-vous faire ?
      </h1>
      <p className="text-sm text-gray-500 mb-5">
        Trouvez votre démarche en 2 clics — ou décrivez votre situation
      </p>
      <div className="relative max-w-[540px] mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex : « j'ai eu un bébé » ou « je veux créer une SARL »…"
          className="w-full px-5 py-3 pr-14 border-2 border-navy rounded-xl text-sm outline-none text-gray-900 placeholder:text-gray-400 focus:border-marianne-red focus:ring-4 focus:ring-marianne-red/10 transition"
        />
        <button
          aria-label="Rechercher"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-navy text-white w-8 h-8 rounded-lg flex items-center justify-center hover:bg-navy-light transition"
        >
          →
        </button>
      </div>
    </div>
  );
}
