export default function ReportList({ reports, onSelect }) {
  return (
    <div className="space-y-3">
      {reports.map((report) => (
        <div
          key={report.id}
          className="p-4 border rounded hover:bg-gray-50 cursor-pointer"
          onClick={() => onSelect(report)}
        >
          <h3 className="font-bold text-lg">{report.title}</h3>
          <p className="text-sm text-gray-600">{report.status}</p>
        </div>
      ))}
    </div>
  );
}
