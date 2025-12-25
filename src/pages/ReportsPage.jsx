import { useState, useEffect } from "react";
import ReportForm from "../components/reports/ReportForm";
import ReportList from "../components/reports/ReportList";
import Modal from "../components/common/Modal";
import { getReports } from "../api/api";
import { Plus } from "lucide-react";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingReport, setEditingReport] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // "create" | "edit"

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  const fetchReports = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getReports(token);
      setReports(data);
    } catch (err) {
      setError("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // open create modal (regular users only)
  const openCreateModal = () => {
    setEditingReport(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  // open edit modal (admin or owner)
  const openEditModal = (report) => {
    setEditingReport(report);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingReport(null);
  };

  return (
    <div className="p-6 relative">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Floating "Create Report" button (regular users only) */}
      {!user?.admin && (
        <button
          onClick={openCreateModal}
          className="
      mb-4 px-4 py-2 rounded-md
      bg-(--primary)
      text-(--primary)text-sm font-medium
      hover:bg-(--primary-hover)
      transition
      flex items-center gap-2 cursor-pointer
    "
        >
          <Plus size={18} />
          Create Report
        </button>
      )}

      {/* Later: filters/search can go here */}

      <ReportList
        reports={reports}
        fetchReports={fetchReports}
        setEditingReport={openEditModal} // NOTE: pass our wrapper
        loading={loading}
      />

      {/* Modal for Create / Edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalMode === "create" ? "Create Report" : "Edit Report"}
      >
        <ReportForm
          fetchReports={fetchReports}
          editingReport={editingReport}
          setEditingReport={setEditingReport} // still useful inside form
          onClose={closeModal} // so form can close modal on submit/cancel
          mode={modalMode}
        />
      </Modal>
    </div>
  );
}
