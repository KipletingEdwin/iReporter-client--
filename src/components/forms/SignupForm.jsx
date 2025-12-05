import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function SignupForm() {
  const { signup } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signup(formData);
    } catch (err) {
      setError("Failed to create account");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center">Create Account</h2>

      {error && (
        <div className="bg-red-100 text-red-800 p-2 rounded">{error}</div>
      )}

      <div>
        <label className="block font-medium">Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
        />
      </div>

      <div>
        <label className="block font-medium">Password</label>
        <input
          type="password"
          className="w-full p-2 border rounded"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
      </div>

      <div>
        <label className="block font-medium">Confirm Password</label>
        <input
          type="password"
          className="w-full p-2 border rounded"
          value={formData.password_confirmation}
          onChange={(e) =>
            setFormData({
              ...formData,
              password_confirmation: e.target.value,
            })
          }
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
      >
        Sign Up
      </button>
    </form>
  );
}
