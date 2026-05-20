export default function AideStrip() {
  return (
    <div className="bg-navy rounded-2xl p-5 flex items-center justify-between gap-4 mb-8 hover:bg-navy-light cursor-pointer transition">
      <div className="flex items-center gap-4">
        <div className="text-2xl">💡</div>
        <div>
          <div className="font-extrabold text-sm text-white mb-0.5">
            Découvrez les aides auxquelles vous avez droit
          </div>
          <div className="text-xs text-white/50">
            En moyenne, nos utilisateurs trouvent 340€/mois d'aides inconnues
          </div>
        </div>
      </div>
      <button className="bg-marianne-red text-white rounded-lg px-4 py-2 text-xs font-bold whitespace-nowrap hover:bg-red-700 transition shrink-0">
        Faire mon bilan gratuit →
      </button>
    </div>
  );
}
