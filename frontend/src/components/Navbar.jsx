import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-sm font-bold">
            TL
          </span>
          <div>
            <h1 className="text-lg font-semibold">TinyLink</h1>
            <p className="text-xs text-slate-400">
              Simple URL shortener with stats
            </p>
          </div>
        </Link>

        <nav className="flex gap-4 text-sm">
          <Link
            to="/"
            className={
              "hover:text-indigo-400 transition " +
              (location.pathname === "/" ? "text-indigo-400" : "text-slate-300")
            }
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
