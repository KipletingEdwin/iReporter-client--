import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function ReportsPieChart({ reports }) {
  const data = [
    { name: "Pending", value: reports.filter(r => r.status === "pending").length },
    { name: "Investigating", value: reports.filter(r => r.status === "investigating").length },
    { name: "Resolved", value: reports.filter(r => r.status === "resolved").length },
    { name: "Rejected", value: reports.filter(r => r.status === "rejected").length },
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

      <PieChart width={350} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
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
    </div>
  );
}
