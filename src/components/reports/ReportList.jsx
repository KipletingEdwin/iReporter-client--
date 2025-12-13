import { useState, useEffect } from "react";
import { deleteReport } from "../../api/api";
import Spinner from "../Spinner"; 

export default function ReportList({ reports, fetchReports, setEditingReport, loading }) {
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
    <div className="mt-6 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {reports.map((r) => (
        <div
          key={r.id}
          className="p-4 bg-white shadow rounded flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-lg"
        >
          <div>
            <h2 className="font-bold text-lg mb-1">{r.title}</h2>
            <p className="text-gray-700 mb-2">{r.description}</p>
            <span
              className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${statusClass(
                r.status
              )}`}
            >
              {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
            </span>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setEditingReport(r)}
              className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
            >
              Edit
            </button>
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
  );
}
