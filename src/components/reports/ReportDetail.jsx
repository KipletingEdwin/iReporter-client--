export default function ReportDetail({ report }) {
  if (!report) {
    return (
      <div className="text-gray-500 italic p-4">
        Select a report to view details.
      </div>
    );
  }

  return (
    <div className="p-4 border rounded">
      <h2 className="text-2xl font-bold">{report.title}</h2>
      <p className="mt-2">{report.description}</p>

      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Status:</strong> {report.status}</p>
        <p><strong>Location:</strong> {report.location}</p>
      </div>
    </div>
  );
}
