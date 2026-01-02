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
      //onclose();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" p-6 shadow-lg rounded-lg mb-6">
      <h2 className="font-bold text-xl mb-4 text-(--primary-text)">{editingReport ? "Edit Report" : "New Report"}</h2>

      {error && (
        <div className="bg-red-500/10 text-red-400 p-3 mb-4 rounded text-sm">{error}</div>
      )}

      {message && (
        <div className="bg-green-500/10 text-green-400 p-3 mb-4 rounded text-sm">{message}</div>
      )}

      <label className="text-sm font-medium text-(--text-secondary)">Title</label>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="
        w-full p-3 mb-3 rounded-md
        bg-(--bg-surface)
        text-(--text-primary)
        placeholder:text-(--text-secondary)
        border border-(--border-color)
        focus:outline-none
        focus:ring-2 focus:ring-(--primary)
        transition
      "
        required
      />

      <label className="text-sm font-medium text-(--text-secondary)">Description</label>
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        rows={4}
        className="
        w-full p-3 mb-3 rounded-md
        bg-(--bg-surface)
        text-(--text-primary)
        placeholder:text-(--text-secondary)
        border border-(--border-color)
        focus:outline-none
        focus:ring-2 focus:ring-(--primary)
        transition
      "
        required
      />
      <label className="text-sm font-medium text-(--text-secondary)">Location</label>
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="
        w-full p-3 mb-3 rounded-md
        bg-(--bg-surface)
        text-(--text-primary)
        placeholder:text-(--text-secondary)
        border border-(--border-color)
        focus:outline-none
        focus:ring-2 focus:ring-(--primary)
        transition
      "
      />
      <label className="text-sm font-medium text-(--text-secondary)">Status</label>
      <select disabled={!editingReport}
        name="status"
        value={formData.status}
        onChange={handleChange}
        className={` w-full p-3 mb-4 rounded-md bg-(--bg-surface) text-(--text-primary)
           border border-(--border-color) focus:outline-none focus:ring-2
            focus:ring-(--primary) transition 
            ${!editingReport ? "opacity-60 cursor-not-allowed" : ""} `}
      >
        <option value="draft">Draft</option>
        <option value="submitted">Submitted</option>
        <option value="pending">Pending</option>
        <option value="investigating">Investigating</option>     
        <option value="resolved">Resolved</option>
        <option value="rejected">Rejected</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className={`
          w-full py-3 rounded-md font-medium
          bg-(--primary)
          text-white
          hover:opacity-90
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
