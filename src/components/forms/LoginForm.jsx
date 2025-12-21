import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/api";
import Spinner from "../Spinner";

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      const res = await login(formData);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      setMessage("Login successful!");
      // setTimeout(() => navigate("/reports"), 1000);
      setTimeout(() => {
        navigate("/reports", { replace: true });
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
    transition-all duration-200
  "
    >
      <h2 className="text-2xl font-semibold mb-2 text-center text-gray-900 dark:text-gray-100">
        Login
      </h2>

      <p className="text-sm text-gray-400 text-center mb-6">
        Welcome back to iReporter
      </p>

      {message && (
        <div className="bg-green-500/10 text-green-400 p-3 mb-4 rounded text-center text-sm">
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 text-red-400 p-3 mb-4 rounded text-center text-sm">
          {error}
        </div>
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="
      w-full p-3 mb-4 rounded-md bg-gray-50
      dark:bg-slate-800 text-gray-100 placeholder-gray-400
      border border-slate-700
      focus:outline-none focus:ring-2 focus:ring-blue-600
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
      w-full p-3 mb-6 rounded-md bg-gray-50
      dark:bg-slate-800 text-gray-100 placeholder-gray-400
      border border-slate-700
      focus:outline-none focus:ring-2 focus:ring-blue-600
      transition
    "
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="
      w-full py-3 rounded-md font-medium
      bg-blue-600 text-white
      hover:bg-blue-700
      transition
      disabled:opacity-60 disabled:cursor-not-allowed
      flex justify-center items-center gap-2
    "
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="mt-6 text-center text-sm text-gray-400">
        Don’t have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-500 hover:text-blue-400 font-medium transition"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
