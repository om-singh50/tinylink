import { useState } from "react";
import api from "../api";

const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

export default function LinkForm({ onCreated }) {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!url || !validateUrl(url)) {
      setError("Please enter a valid URL (including http/https).");
      return;
    }

    if (code && !CODE_REGEX.test(code)) {
      setError("Custom code must be 6–8 characters (A–Z, a–z, 0–9).");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/api/links", {
        url,
        code: code || undefined,
      });
      setSuccess(`Short link created: ${res.data.code}`);
      setUrl("");
      setCode("");
      onCreated && onCreated(res.data);
    } catch (err) {
      if (err.response?.status === 409) {
        setError("This code already exists. Please try another one.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1">
          Target URL <span className="text-red-400">*</span>
        </label>
        <input
          type="url"
          placeholder="https://example.com/article"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Custom code (optional)
        </label>
        <input
          type="text"
          placeholder="e.g. docs123"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
        <p className="mt-1 text-xs text-slate-400">
          Must be 6–8 characters, letters or digits only.
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-950/40 rounded-md px-3 py-2">
          {error}
        </p>
      )}
      {success && (
        <p className="text-sm text-emerald-400 bg-emerald-950/40 rounded-md px-3 py-2">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm disabled:opacity-60 disabled:cursor-not-allowed hover:bg-indigo-600 transition"
      >
        {loading ? "Creating..." : "Create short link"}
      </button>
    </form>
  );
}
