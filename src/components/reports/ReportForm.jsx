import { useState, useEffect } from "react";
import { createReport, updateReport } from "../../api/api";
//import Spinner from "../Spinner"; // reuse spinner

export default function ReportForm({ fetchReports, editingReport, setEditingReport }) {
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    status: "draft",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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
    setError("");
    setMessage("");

    try {
      if (editingReport) {
        await updateReport(editingReport.id, formData, token);
        setEditingReport(null);
        setMessage("Report updated successfully!");
      } else {
        await createReport(formData, token);
        setMessage("Report created successfully!");
      }
      setFormData({ title: "", description: "", location: "", status: "draft" });
      fetchReports();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg mb-6">
      <h2 className="font-bold text-xl mb-4">{editingReport ? "Edit Report" : "New Report"}</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
      )}

      {message && (
        <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{message}</div>
      )}

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      >
        <option value="draft">Draft</option>
        <option value="submitted">Submitted</option>
        <option value="resolved">Resolved</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-blue-600 text-white p-3 rounded-md shadow hover:bg-blue-700 transition flex justify-center items-center gap-2 ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? (
          <>
            {/* <Spinner /> */}
            {editingReport ? "Updating..." : "Creating..."}
          </>
        ) : (
          editingReport ? "Update" : "Create"
        )}
      </button>
    </form>
  );
}
