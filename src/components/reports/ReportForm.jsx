import { useState } from "react";

export default function ReportForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: "", description: "", location: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <h2 className="font-bold text-xl">Create Report</h2>

      <div>
        <label className="block font-medium">Title</label>
        <input
          className="w-full border rounded p-2"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          required
        />
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          className="w-full border rounded p-2"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </div>

      <div>
        <label className="block font-medium">Location</label>
        <input
          className="w-full border rounded p-2"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
