import { useState } from "react";
import { deleteReport } from "../../api/api";
import Spinner from "../Spinner";
import {
  CheckCircle,
  Clock,
  FileEdit,
  Pencil,
  Search,
  Send,
  Trash2,
  XCircle,
} from "lucide-react";

export default function ReportList({
  reports,
  fetchReports,
  setEditingReport,
  loading,
}) {
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleDelete = async (id) => {
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
        return "bg-gray-300 text-gray-800"; // Draft
      case "submitted":
        return "bg-blue-200 text-blue-800"; // Submitted
      case "pending":
        return "bg-yellow-200 text-yellow-800"; // Pending
      case "investigating":
        return "bg-purple-200 text-purple-800"; // Investigating
      case "resolved":
        return "bg-green-200 text-green-800"; // Resolved
      case "rejected":
        return "bg-red-200 text-red-800"; // Rejected
      default:
        return "bg-gray-300 text-gray-800";
    }
  };

  const statusIcons = {
    draft: FileEdit,
    submitted: Send,
    pending: Clock,
    investigating: Search,
    resolved: CheckCircle,
    rejected: XCircle,
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
      {reports.map((r) => {
        const Icon = statusIcons[r.status];
        return (
          <div
            key={r.id}
            className="
      p-5 rounded-xl
      bg-(--bg-surface)
      border border-(--border-color)
      shadow-md shadow-black/10 dark:shadow-black/40
      flex flex-col justify-between
      transition-all duration-200
      hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10 
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
              
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusClass(
                  r.status
                )}`}
              >
                <Icon size={14} />
                {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
              </span>
            </div>

            {user && (user.admin || r.user_id === user.id) && (
              <div className="flex gap-2 mt-5">
                <button
                  onClick={() => setEditingReport(r)}
                  className="
            flex-1 px-3 py-2 rounded-md text-sm
            bg-(--btn-bg)
            text-(--text-primary)
            hover:bg-(--btn-bg-hover)
            transition
            flex items-center justify-center gap-2
            cursor-pointer
          "
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  onClick={() => setConfirmDeleteId(r.id)}
                  className="
                    flex-1 px-3 py-2 rounded-md text-sm
                    bg-red-600 text-white
                    hover:bg-red-700 transition 
                    flex items-center justify-center gap-2 cursor-pointer
                  "
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            )}
          </div>
        );
      })}

      {confirmDeleteId && (
        <div
          className="
      fixed inset-0 
      bg-black/50 
      flex items-center justify-center 
      z-50
    "
        >
          <div
            className="
        bg-(--bg-surface)
        p-6 rounded-xl shadow-xl 
        w-[90%] max-w-md
        border border-(--border-color)
      "
          >
            <h2 className="text-xl font-semibold text-(--text-primary) mb-4">
              Confirm Delete
            </h2>

            <p className="text-(--text-secondary) mb-6">
              Are you sure you want to delete this report? This action cannot be
              undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="
            flex-1 px-4 py-2 rounded-md
            bg-(--border-color)
            text-(--text-primary)
            hover:opacity-80 transition
          "
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleDelete(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="
            flex-1 px-4 py-2 rounded-md
            bg-red-600 text-white
            hover:bg-red-700 transition
          "
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
