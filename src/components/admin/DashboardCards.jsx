export default function DashboardCards({ reports }) {
    const total = reports.length;
    const draft = reports.filter(report => report.status === "draft").length;
    const pending = reports.filter(report => report.status === "pending").length;
    const submitted = reports.filter(report => report === "submitted").length;
    const investigating = reports.filter(report => report.status === "investigating").length;
    const resolved = reports.filter(report => report.status === "resolved").length;
    const rejected = reports.filter(report => report.status === "rejected").length;
  
    const cards = [
      { label: "Total Reports", value: total },
      { label: "Draft", value: draft },
      { label: "Submitted", value: submitted},
      { label: "Pending", value: pending },
      { label: "Investigating", value: investigating },
      { label: "Resolved", value: resolved },
      { label: "Rejected", value: rejected },
    ];
  
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-(--bg-surface) border border-(--border-color) shadow-sm"
          >
            <p className="text-sm text-(--text-secondary)">{card.label}</p>
            <p className="text-2xl font-bold text-(--text-primary)">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    );
  }
  