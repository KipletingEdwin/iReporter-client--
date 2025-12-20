import { useState, useEffect } from "react";
import { createReport, updateReport } from "../../api/api";
import Spinner from "../Spinner";

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
    <form onSubmit={handleSubmit} className=" bg-white dark:bg-slate-900 p-6 shadow-lg rounded-lg mb-6">
      <h2 className="font-bold text-xl mb-4 text-gray-900 dark:text-gray-100 ">{editingReport ? "Edit Report" : "New Report"}</h2>

      {error && (
        <div className="bg-red-500/10 text-red-400 p-3 mb-4 rounded text-sm">{error}</div>
      )}

      {message && (
        <div className="bg-green-500/10 text-green-400 p-3 mb-4 rounded text-sm">{message}</div>
      )}

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-3 mb-3 rounded-md
      bg-slate-800 text-gray-100 placeholder-gray-400
      border border-slate-700
      focus:outline-none focus:ring-2 focus:ring-blue-600
      transition"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        rows={4}
        className="w-full p-3 mb-3 rounded-md
      bg-slate-800 text-gray-100 placeholder-gray-400
      border border-slate-700
      focus:outline-none focus:ring-2 focus:ring-blue-600
      transition"
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full p-3 mb-3 rounded-md
      bg-slate-800 text-gray-100 placeholder-gray-400
      border border-slate-700
      focus:outline-none focus:ring-2 focus:ring-blue-600
      transition"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full p-3 mb-4 rounded-md
      bg-slate-800 text-gray-100
      border border-slate-700
      focus:outline-none focus:ring-2 focus:ring-blue-600
      transition"
      >
        <option value="draft">Draft</option>
        <option value="submitted">Submitted</option>
        <option value="resolved">Resolved</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className={`
          w-full py-3 rounded-md font-medium
          bg-blue-600 text-white
          hover:bg-blue-700
          transition
          flex justify-center items-center gap-2
          ${loading ? "opacity-60 cursor-not-allowed" : ""}
        `}
      >
        {loading ? (
          <>
            <Spinner />
            {editingReport ? "Updating..." : "Creating..."}
          </>
        ) : (
          editingReport ? "Update" : "Create"
        )}
      </button>
    </form>
  );
}
