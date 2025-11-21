import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import api from "../api";

export default function CodeStats() {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const baseUrl =
    import.meta.env.VITE_BASE_URL || window.location.origin;

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/api/links/${code}`);
        setLink(res.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("This short code does not exist.");
        } else {
          setError("Failed to load stats. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [code]);

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-6 text-sm">
        Loading stats...
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-red-500/60 bg-red-950/40 px-4 py-6 text-sm text-red-200">
          {error}
        </div>
        <RouterLink
          to="/"
          className="inline-flex text-sm text-indigo-400 hover:underline"
        >
          ← Back to dashboard
        </RouterLink>
      </div>
    );
  }

  const shortUrl = `${baseUrl}/${link.code}`;

  return (
    <div className="space-y-4">
      <RouterLink
        to="/"
        className="inline-flex text-xs text-indigo-400 hover:underline"
      >
        ← Back to dashboard
      </RouterLink>

      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
        <h2 className="text-lg font-semibold">Stats for <span className="font-mono">{link.code}</span></h2>

        <div className="space-y-1 text-sm">
          <p className="text-slate-400 text-xs uppercase tracking-wide">
            Short URL
          </p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-indigo-400 hover:underline break-all"
          >
            {shortUrl}
          </a>
        </div>

        <div className="space-y-1 text-sm">
          <p className="text-slate-400 text-xs uppercase tracking-wide">
            Target URL
          </p>
          <a
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-slate-200 hover:text-indigo-400 break-all"
          >
            {link.url}
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-sm">
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
            <p className="text-xs text-slate-400 uppercase tracking-wide">
              Total clicks
            </p>
            <p className="mt-1 text-lg font-semibold">{link.clicks ?? 0}</p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
            <p className="text-xs text-slate-400 uppercase tracking-wide">
              Last clicked
            </p>
            <p className="mt-1 text-sm">
              {link.last_clicked
                ? new Date(link.last_clicked).toLocaleString()
                : "Never"}
            </p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
            <p className="text-xs text-slate-400 uppercase tracking-wide">
              Created at
            </p>
            <p className="mt-1 text-sm">
              {link.created_at
                ? new Date(link.created_at).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
