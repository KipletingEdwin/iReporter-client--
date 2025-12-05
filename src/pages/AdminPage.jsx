import { useEffect, useState } from "react";
import reportService from "../api/reportService";

export default function AdminPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const data = await reportService.getAll();
      setReports(data);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (reportId, status) => {
    try {
      await reportService.update(reportId, { status });
      fetchReports();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleDelete = async (reportId) => {
    if (!confirm("Are you sure you want to delete this report?")) return;
    try {
      await reportService.remove(reportId);
      fetchReports();
    } catch (error) {
      console.error("Failed to delete report:", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) return <div className="text-center p-10">Loading reports...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <table className="min-w-full border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id} className="hover:bg-gray-50">
              <td className="p-2 border">{report.title}</td>
              <td className="p-2 border">
                <select
                  value={report.status}
                  onChange={(e) => handleStatusChange(report.id, e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="pending">Pending</option>
                  <option value="under-investigation">Under Investigation</option>
                  <option value="resolved">Resolved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
              <td className="p-2 border">{report.user?.email || "N/A"}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleDelete(report.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
