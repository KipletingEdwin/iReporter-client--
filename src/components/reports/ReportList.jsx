import { deleteReport } from "../../api/api";

export default function ReportList({ reports, fetchReports, setEditingReport }) {
  const token = localStorage.getItem("token");

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this report?")) return;
    try {
      await deleteReport(id, token);
      fetchReports();
    } catch (err) {
      alert("Failed to delete report");
    }
  };

  return (
    <div className="mt-6 grid gap-4">
      {reports.map((r) => (
        <div
          key={r.id}
          className="p-4 bg-white shadow rounded flex justify-between items-center"
        >
          <div>
            <h2 className="font-bold">{r.title}</h2>
            <p>{r.description}</p>
            <p className="text-gray-500">Status: {r.status}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditingReport(r)}
              className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(r.id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
