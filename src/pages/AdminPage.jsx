import { useEffect, useState } from "react";
import { getReports, updateReport, deleteReport } from "../api/api.js";
import Spinner from "../components/Spinner.jsx";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Redirect non-admins
  useEffect(() => {
    if (!user || !user.admin) {
      navigate("/reports");
    }
  }, [user, navigate]);

  // Fetch all reports
  const loadReports = async () => {
    setLoading(true);
    try {
      const data = await getReports(token); // make sure this fetches all reports for admin
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

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this report?")) return;
    try {
      await deleteReport(id, token);
      loadReports();
    } catch (err) {
      alert("Failed to delete report");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateReport(id, { status }, token);
      loadReports();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((r) => (
          <div
            key={r.id}
            className="p-4 bg-white shadow rounded flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <div>
              <h2 className="font-bold text-lg mb-1">{r.title}</h2>
              <p className="text-gray-700 mb-2">{r.description}</p>
              <p className="text-gray-500 mb-2">Location: {r.location}</p>
              <p className="text-gray-500 mb-2">Reported by: {r.user_name || r.user?.name}</p>
              <span
                className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${
                  r.status === "draft"
                    ? "bg-gray-300 text-gray-800"
                    : r.status === "submitted"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
              </span>
            </div>

            <div className="flex gap-2 mt-4">
              <select
                value={r.status}
                onChange={(e) => handleStatusChange(r.id, e.target.value)}
                className="border p-1 rounded flex-1"
              >
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
                <option value="resolved">Resolved</option>
              </select>
              <button
                onClick={() => handleDelete(r.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
