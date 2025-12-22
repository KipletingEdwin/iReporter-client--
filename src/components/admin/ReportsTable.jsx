export default function ReportsTable({ reports, loading }) {
    if (loading) {
      return <p className="text-(--text-secondary)">Loading reports...</p>;
    }
  
    return (
      <div className="p-6 rounded-xl bg-(--bg-surface) border border-(--border-color) shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-(--text-primary)">
          Recent Reports
        </h2>
  
        <div className="overflow-x-auto">
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
              {reports.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-(--border-color) hover:bg-(--border-color)/20"
                >
                  <td className="p-3">{r.user?.name}</td>
                  <td className="p-3">{r.category}</td>
                  <td className="p-3 capitalize">{r.status}</td>
                  <td className="p-3">{new Date(r.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  