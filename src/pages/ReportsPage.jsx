import { useEffect, useState } from "react";
import reportService from "../api/reportService";
import ReportList from "../components/reports/ReportList";
import ReportForm from "../components/reports/ReportForm";
import ReportDetail from "../components/reports/ReportDetail";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const fetchReports = async () => {
    const data = await reportService.getAll();
    setReports(data);
  };

  const handleCreate = async (formData) => {
    await reportService.create(formData);
    fetchReports();
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

      <div className="md:col-span-1">
        <ReportForm onSubmit={handleCreate} />
      </div>

      <div className="md:col-span-1">
        <h2 className="font-bold text-xl mb-4">Reports</h2>
        <ReportList reports={reports} onSelect={setSelectedReport} />
      </div>

      <div className="md:col-span-1">
        <h2 className="font-bold text-xl mb-4">Details</h2>
        <ReportDetail report={selectedReport} />
      </div>

    </div>
  );
}
