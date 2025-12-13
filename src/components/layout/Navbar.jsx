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
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-semibold tracking-wide text-blue-700 hover:text-blue-800 transition"
      >
        iReporter
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-6">
        {user ? (
          <>
            {/* User name */}
            <span className="text-gray-700 font-medium bg-gray-200 px-3 py-1 rounded-full text-sm">
              {user.name}
            </span>

            {/* Reports */}
            <Link
              to="/reports"
              className="text-gray-800 hover:text-blue-600 transition font-medium"
            >
              Reports
            </Link>

            {/* Admin link */}
            {user.admin && (
              <Link
                to="/admin"
                className="text-gray-800 hover:text-blue-600 transition font-medium"
              >
                Admin
              </Link>
            )}

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-800 hover:text-blue-600 transition font-medium"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
