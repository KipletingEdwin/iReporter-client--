import { useEffect, useState } from "react";
import {
  fetchReports,
  updateReport,
  deleteReport,
} from "../api/api";
import Spinner from "../components/Spinner";

export default function AdminPage() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Redirect non-admins (UI only, backend still protects)
  useEffect(() => {
    if (!user || !user.admin) {
      window.location.href = "/reports";
    }
  }, [user]);

  const loadReports = async () => {
    try {
      setLoading(true);
      const data = await fetchReports(token);
      setReports(data);
    } catch (err) {
      alert("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingId(id);
      await updateReport(id, { status }, token);
      loadReports();
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this report permanently?")) return;

    try {
      setDeletingId(id);
      await deleteReport(id, token);
      loadReports();
    } catch (err) {
      alert("Failed to delete report");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {reports.length === 0 ? (
        <p className="text-gray-600">No reports available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Owner</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-3 font-medium">{r.title}</td>
                  <td className="p-3 text-gray-600">
                    {r.user?.name || "Unknown"}
                  </td>
                  <td className="p-3">
                    <select
                      value={r.status}
                      disabled={updatingId === r.id}
                      onChange={(e) =>
                        handleStatusChange(r.id, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="draft">Draft</option>
                      <option value="submitted">Submitted</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleDelete(r.id)}
                      disabled={deletingId === r.id}
                      className={`px-3 py-1 rounded text-white ${
                        deletingId === r.id
                          ? "bg-red-400"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {deletingId === r.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
