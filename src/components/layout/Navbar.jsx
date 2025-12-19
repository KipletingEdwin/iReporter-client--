import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Detect scroll for shrink effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // Helper: detect landing page
  const isLanding = location.pathname === "/";

  return (
    <nav
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md py-3"
          : "bg-white/80 backdrop-blur-md py-4"
      }`}
    >
      <div className=" mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link
          to={user ? "/reports" : "/"}
          className="text-2xl font-semibold tracking-wide text-blue-700 hover:text-blue-800 transition"
        >
          iReporter
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {!user && (
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

          {user && (
            <>
              <Link
                to="/reports"
                className="text-gray-800 hover:text-blue-600 transition font-medium"
              >
                Reports
              </Link>

              {user.admin && (
                <Link
                  to="/admin"
                  className="text-gray-800 hover:text-blue-600 transition font-medium"
                >
                  Admin
                </Link>
              )}

              <span className="text-gray-700 font-medium bg-gray-200 px-3 py-1 rounded-full text-sm">
                {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                menuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          {!user && (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-800 hover:text-blue-600 font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}

          {user && (
            <>
              <Link
                to="/reports"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-800 hover:text-blue-600 font-medium"
              >
                Reports
              </Link>

              {user.admin && (
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="block text-gray-800 hover:text-blue-600 font-medium"
                >
                  Admin
                </Link>
              )}

              <div className="text-gray-700 font-medium bg-gray-200 px-3 py-2 rounded">
                {user.name}
              </div>

              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
