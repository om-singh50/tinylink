import { useEffect, useState } from "react";
import api from "../api";
import LinkForm from "../components/LinkForm.jsx";
import LinksTable from "../components/LinksTable.jsx";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const loadLinks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/api/links");
      setLinks(res.data);
    } catch (err) {
      setError("Failed to load links. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const handleDelete = async (code) => {
    if (!window.confirm(`Delete link "${code}"?`)) return;
    try {
      await api.delete(`/api/links/${code}`);
      setLinks((prev) => prev.filter((l) => l.code !== code));
    } catch {
      alert("Failed to delete link.");
    }
  };

  const handleCreated = () => {
    loadLinks();
  };

  const filteredLinks = links.filter((l) => {
    const term = search.toLowerCase();
    return (
      l.code.toLowerCase().includes(term) ||
      l.url.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <p className="text-xs text-slate-400">
            Create and manage short links. Click on a code to view detailed stats.
          </p>
        </div>
        <input
          type="text"
          placeholder="Search by code or URL..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <LinkForm onCreated={handleCreated} />

      {loading ? (
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-6 text-sm text-slate-300">
          Loading links...
        </div>
      ) : error ? (
        <div className="mt-4 rounded-xl border border-red-500/60 bg-red-950/40 px-4 py-6 text-sm text-red-200">
          {error}
        </div>
      ) : (
        <LinksTable links={filteredLinks} onDelete={handleDelete} />
      )}
    </div>
  );
}
