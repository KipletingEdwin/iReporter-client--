import { useState, useEffect } from "react";
import { createReport, updateReport } from "../../api/api";

export default function ReportForm({ fetchReports, editingReport, setEditingReport }) {
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    status: "draft",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingReport) {
      setFormData({
        title: editingReport.title,
        description: editingReport.description,
        location: editingReport.location,
        status: editingReport.status,
      });
    }
  }, [editingReport]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingReport) {
        await updateReport(editingReport.id, formData, token);
        setEditingReport(null);
      } else {
        await createReport(formData, token);
      }
      setFormData({ title: "", description: "", location: "", status: "draft" });
      fetchReports();
    } catch (err) {
      alert("Failed to save report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-6">
      <h2 className="font-bold mb-2">{editingReport ? "Edit Report" : "New Report"}</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      >
        <option value="draft">Draft</option>
        <option value="submitted">Submitted</option>
        <option value="resolved">Resolved</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Saving..." : editingReport ? "Update" : "Create"}
      </button>
    </form>
  );
}
