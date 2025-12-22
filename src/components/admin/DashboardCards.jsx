export default function DashboardCards({ reports }) {
    const total = reports.length;
    const pending = reports.filter(r => r.status === "pending").length;
    const investigating = reports.filter(r => r.status === "investigating").length;
    const resolved = reports.filter(r => r.status === "resolved").length;
    const rejected = reports.filter(r => r.status === "rejected").length;
  
    const cards = [
      { label: "Total Reports", value: total },
      { label: "Pending", value: pending },
      { label: "Investigating", value: investigating },
      { label: "Resolved", value: resolved },
      { label: "Rejected", value: rejected },
    ];
  
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {cards.map((card, i) => (
          <div
            key={i}
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
  