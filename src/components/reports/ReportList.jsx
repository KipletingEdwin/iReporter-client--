import { useState, useEffect } from "react";
import { deleteReport } from "../../api/api";
import Spinner from "../Spinner";

export default function ReportList({
  reports,
  fetchReports,
  setEditingReport,
  loading,
}) {
  const [deletingId, setDeletingId] = useState(null);
  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this report?")) return;
    try {
      setDeletingId(id);
      await deleteReport(id, token);
      fetchReports();
    } catch (err) {
      alert("Failed to delete report");
    } finally {
      setDeletingId(null);
    }
  };

  // Helper to color-code status
  const statusClass = (status) => {
    switch (status) {
      case "draft":
        return "bg-gray-300 text-gray-800";
      case "submitted":
        return "bg-yellow-200 text-yellow-800";
      case "resolved":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-300 text-gray-800";
    }
  };

  if (loading) {
    // Skeleton loader for 3 items
    return (
      <div className="mt-6 grid gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4 bg-white shadow rounded animate-pulse h-32"
          ></div>
        ))}
      </div>
    );
  }

  return (
<div className="mt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {reports.map((r) => (
    <div
      key={r.id}
      className="
      p-5 rounded-xl
      bg-(--bg-surface)
      border border-(--border-color)
      shadow-md shadow-black/10 dark:shadow-black/40
      flex flex-col justify-between
      transition-all duration-200
      hover:scale-[1.02] hover:shadow-lg
    "
    >
      
      <div>
        <h2 className="font-semibold text-lg mb-1 text-(--text-primary)">
          {r.title}
        </h2>

        <p className="text-sm mb-3 line-clamp-3 text-(--text-secondary)">
          {r.description}
        </p>

        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusClass(
            r.status
          )}`}
        >
          {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
        </span>
      </div>

      {user && (user.admin || r.user_id === user.id) && (
            console.log(r),
        <div className="flex gap-2 mt-5">
          <button
            onClick={() => setEditingReport(r)}
            className="
            flex-1 px-3 py-2 rounded-md text-sm
            bg-(--border-color)
            text-(--text-primary)
            hover:opacity-80
            transition
          "
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(r.id)}
            disabled={deletingId === r.id}
            className={`
              flex-1 px-3 py-2 rounded-md text-sm
              flex items-center justify-center gap-2
              text-white transition
              ${
                deletingId === r.id
                  ? "bg-red-500/60 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }
            `}
          >
            {deletingId === r.id ? (
              <>
                <Spinner size="sm" />
                Deleting…
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      )}
    </div>
  ))}
</div>

  );
}
