export default function Nav() {
  return (
    <nav className="bg-white px-8 h-[58px] flex items-center justify-between border-b border-gray-200 sticky top-0 z-10">
      <div className="font-extrabold text-lg text-navy tracking-tight">
        dé<em className="text-marianne-red not-italic">marches</em>+
      </div>
      <div className="flex items-center gap-4">
        <a href="#" className="text-sm text-gray-500 font-medium hover:text-navy">
          Se connecter
        </a>
        <button className="bg-navy text-white rounded-lg px-4 py-2 text-sm font-bold hover:bg-navy-light transition">
          Mon espace
        </button>
      </div>
    </nav>
  );
}
