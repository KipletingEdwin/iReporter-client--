import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReport } from "../../api/api";

export default function ReportDetail() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getReport(id, token);
        setReport(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id, token]);

  if (loading) return <div>Loading...</div>;
  if (!report) return <div>Report not found</div>;

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-2">{report.title}</h2>
      <p>{report.description}</p>
      <p className="text-gray-500 mt-2">Status: {report.status}</p>
      <p className="text-gray-500">Location: {report.location}</p>
    </div>
  );
}
