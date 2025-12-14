import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-semibold tracking-wide text-blue-700 hover:text-blue-800 transition"
      >
        iReporter
      </Link>

      <div className="flex items-center gap-6">
        {user ? (
          <>
            {/* My Reports */}
            <Link
              to="/reports"
              className="text-gray-700 hover:text-blue-600 hover:underline underline-offset-4 transition"
            >
              My Reports
            </Link>

            {/* Create Report */}
            <Link
              to="/reports/new"
              className="text-gray-700 hover:text-blue-600 hover:underline underline-offset-4 transition"
            >
              Create Report
            </Link>

            {/* Admin Panel */}
            {user.admin && (
              <Link
                to="/admin"
                className="text-gray-700 hover:text-blue-600 hover:underline underline-offset-4 transition"
              >
                Admin Panel
              </Link>
            )}

            {/* User Chip */}
            <span className="text-blue-700 bg-blue-50 px-3 py-1 rounded-full text-sm font-medium">
              {user.name}
            </span>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition shadow-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 hover:underline underline-offset-4 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
