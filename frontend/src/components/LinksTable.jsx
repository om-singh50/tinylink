import { Link } from "react-router-dom";

export default function LinksTable({ links, onDelete }) {
  const baseUrl =
    import.meta.env.VITE_BASE_URL || window.location.origin;

  const handleCopy = async (code) => {
    const shortUrl = `${baseUrl}/${code}`;
    try {
      await navigator.clipboard.writeText(shortUrl);
      alert("Copied: " + shortUrl);
    } catch {
      alert("Could not copy link");
    }
  };

  if (!links.length) {
    return (
      <div className="mt-4 rounded-xl border border-dashed border-slate-700 bg-slate-900/40 p-6 text-center text-sm text-slate-400">
        No links yet. Create your first short link using the form above.
      </div>
    );
  }

  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-900/90">
          <tr>
            <th className="px-3 py-2 text-left font-medium text-slate-300">
              Short code
            </th>
            <th className="px-3 py-2 text-left font-medium text-slate-300">
              Target URL
            </th>
            <th className="px-3 py-2 text-right font-medium text-slate-300">
              Total clicks
            </th>
            <th className="px-3 py-2 text-left font-medium text-slate-300">
              Last clicked
            </th>
            <th className="px-3 py-2 text-right font-medium text-slate-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr
              key={link.code}
              className="border-t border-slate-800 hover:bg-slate-800/60"
            >
              <td className="px-3 py-2 align-top">
                <Link
                  to={`/code/${link.code}`}
                  className="font-mono text-xs text-indigo-400 hover:underline"
                >
                  {link.code}
                </Link>
              </td>
              <td className="px-3 py-2 align-top max-w-xs">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block truncate text-xs text-slate-200 hover:text-indigo-400"
                  title={link.url}
                >
                  {link.url}
                </a>
              </td>
              <td className="px-3 py-2 align-top text-right">
                {link.clicks ?? 0}
              </td>
              <td className="px-3 py-2 align-top text-xs text-slate-400">
                {link.last_clicked
                  ? new Date(link.last_clicked).toLocaleString()
                  : "Never"}
              </td>
              <td className="px-3 py-2 align-top">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleCopy(link.code)}
                    className="rounded-md border border-slate-700 px-2 py-1 text-xs hover:border-indigo-500 hover:text-indigo-400"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => onDelete(link.code)}
                    className="rounded-md border border-red-500/60 px-2 py-1 text-xs text-red-300 hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
