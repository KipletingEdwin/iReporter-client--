import { useState, useEffect } from "react";
import ReportForm from "../components/reports/ReportForm";
import ReportList from "../components/reports/ReportList";
import { getReports } from "../api/api";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingReport, setEditingReport] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  //console.log(user);

  const token = localStorage.getItem("token");

  const fetchReports = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getReports(token);
      setReports(data);
    } catch (err) {
      setError("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {!user.admin && (
        <ReportForm
          fetchReports={fetchReports}
          editingReport={editingReport}
          setEditingReport={setEditingReport}
        />
      )}
      <ReportList
        reports={reports}
        fetchReports={fetchReports}
        setEditingReport={setEditingReport}
      />
    </div>
  );
}
