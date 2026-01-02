import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function ReportsPieChart({ reports }) {
  const data = [
    { name: "Pending", value: reports.filter(report => report.status === "pending").length },
    { name: "Submitted", value: reports.filter(report => report.status === "submitted").length },
    { name: "Investigating", value: reports.filter(report => report.status === "investigating").length },
    { name: "Resolved", value: reports.filter(report => report.status === "resolved").length },
    { name: "Rejected", value: reports.filter(report => report.status === "rejected").length },
  ];

  const COLORS = [
    "var(--primary)",
    "#facc15",
    "#22c55e",
    "#ef4444",
  ];

  return (
<div className="p-6 rounded-xl bg-(--bg-surface) border border-(--border-color) shadow-sm">
  <h2 className="text-xl font-semibold mb-4 text-(--text-primary)">
    Reports by Status
  </h2>

  <div className="w-full h-[300px]">
  
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius="80%"
          dataKey="value"
          label
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>

  );
}
