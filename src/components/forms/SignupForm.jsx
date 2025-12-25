import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../api/api";
import Spinner from "../Spinner";

export default function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // success message

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await signup(formData);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      setMessage("Account created successfully!");
      setTimeout(() => navigate("/reports"), 1500); // navigate after showing success
    } catch (err) {
      setError(
        err.response?.data?.errors ||
          err.response?.data?.error ||
          "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-(--bg-app)">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
    p-8 rounded-xl
    shadow-lg shadow-black/40
    w-full max-w-md mx-auto mt-12
    bg-(--bg-surface)
    transition-all duration-200
  "
    >
      <h2 className="text-2xl font-semibold mb-2 text-center text-(--text-primary)">
        Sign Up
      </h2>

      <p className="text-sm text-(--text-secondary) text-center mb-6">
        Create your iReporter account
      </p>

      {message && (
        <div className="bg-green-500/10 text-green-400 p-3 mb-4 rounded text-center text-sm">
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 text-red-400 p-3 mb-4 rounded text-center text-sm">
          {Array.isArray(error) ? error.join(", ") : error}
        </div>
      )}

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="
      w-full p-3 mb-4 rounded-md bg-(--bg-surface)
      text-(--text-primary)
      placeholder-(--text-secondary)
      border border-(--border-color)
      focus:outline-none focus:ring-2 focus:ring-(--primary)
      transition
    "
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="
      w-full p-3 mb-6 rounded-md
       bg-(--bg-surface)
       text-(--text-primary) placeholder-(--text-secondary)
      border border-(--border-color)
      focus:outline-none focus:ring-2 focus:ring-(--primary)
      transition
    "
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="
      w-full p-3 mb-6 rounded-md
       bg-(--bg-surface)
       text-(--text-primary) placeholder-(--text-secondary)
      border border-(--border-color)
      focus:outline-none focus:ring-2 focus:ring-(--primary)
      transition
    "
        required
      />

      <input
        type="password"
        name="password_confirmation"
        placeholder="Confirm Password"
        value={formData.password_confirmation}
        onChange={handleChange}
        className="
      w-full p-3 mb-6 rounded-md
       bg-(--bg-surface)
       text-(--text-primary) placeholder-(--text-secondary)
      border border-(--border-color)
      focus:outline-none focus:ring-2 focus:ring-(--primary)
      transition
    "
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="
      w-full py-3 rounded-md font-medium
      bg-(--primary)
       text-white
      hover:opacity-90
      transition
      disabled:opacity-60 disabled:cursor-not-allowed
      flex justify-center items-center gap-2
    "
      >
        {loading ? "Creating account..." : "Sign Up"}
      </button>

      <p className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-500 hover:text-blue-400 font-medium transition"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
