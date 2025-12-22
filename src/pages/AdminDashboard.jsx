
import DashboardCards from "../components/admin/DashboardCards";
import ReportsPieChart from "../components/admin/ReportsPieChart";
import ReportsTable from "../components/admin/ReportsTable";
import { useEffect, useState } from "react";
import { getReports } from "../api/api";


export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getReports(token);
        setReports(data);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (!user?.admin) {
    return (
      <div className="p-6 text-red-500">
        You do not have permission to view this page.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-(--text-primary)">
        Admin Dashboard
      </h1>

      <DashboardCards reports={reports} />

      <ReportsPieChart reports={reports} />

      <ReportsTable reports={reports} loading={loading} />
    </div>
  );
}
