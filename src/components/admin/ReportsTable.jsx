export default function ReportsTable({ reports, loading }) {
    if (loading) {
      return <p className="text-(--text-secondary)">Loading reports...</p>;
    }
  
    return (
<div className="p-6 rounded-xl bg-(--bg-surface) border border-(--border-color) shadow-sm">
  <h2 className="text-xl font-semibold mb-4 text-(--text-primary)">
    Recent Reports
  </h2>

  {/* Desktop Table */}
  <div className="hidden md:block overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-(--border-color)">
          <th className="p-3">Reporter</th>
          <th className="p-3">Category</th>
          <th className="p-3">Status</th>
          <th className="p-3">Date</th>
        </tr>
      </thead>

      <tbody>
        {reports.map((report) => (
          <tr
            key={report.id}
            className="border-b border-(--border-color) hover:bg-(--border-color)/20"
          >
            <td className="p-3">{report.user?.name}</td>
            <td className="p-3">{report.category}</td>
            <td className="p-3 capitalize">{report.status}</td>
            <td className="p-3">
              {new Date(report.created_at).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Mobile Card Layout */}
  <div className="md:hidden space-y-4">
    {reports.map((report) => (
      <div
        key={report.id}
        className="p-4 rounded-lg border border-(--border-color) bg-(--bg-surface) shadow-sm"
      >
        <div className="flex justify-between mb-2">
          <span className="text-(--text-secondary) text-sm">Reporter</span>
          <span className="text-(--text-primary) font-medium">
            {report.user?.name}
          </span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-(--text-secondary) text-sm">Category</span>
          <span className="text-(--text-primary)">{report.category}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-(--text-secondary) text-sm">Status</span>
          <span className="capitalize text-(--text-primary)">
            {report.status}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-(--text-secondary) text-sm">Date</span>
          <span className="text-(--text-primary)">
            {new Date(report.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>

    );
  }
  