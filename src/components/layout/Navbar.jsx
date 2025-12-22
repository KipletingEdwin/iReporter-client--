import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import useTheme from "../../hooks/useTheme";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
  // const isLanding = location.pathname === "/";

  return (
    <nav
      className={`w-full sticky top-0 z-50 transition-all duration-300 bg-(--bg-surface)   ${
        scrolled ? "shadow-md py-3" : "backdrop-blur-md py-4"
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
              {/* Dark/light theme buttop */}
              <button
                onClick={toggleTheme}
                className="w-10 h-10 flex items-center justify-center rounded-full
                        bg-(--btn-bg)
                        hover:bg-(--btn-bg-hover)
                        transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun size={18} className="text-(--icon-sun)" />
                ) : (
                  <Moon size={18} className="text(--icon-moon)" />
                )}
              </button>

              <Link
                to="/login"
                className="text-(--primary-text) hover:text-blue-600 transition font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className=" text-(--primary-text)  hover:bg-blue-700 transition font-medium"
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
          className="md:hidden p-2 rounded-lg text-(--text-primary) hover:text(--primary)  transition  focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X className="w-7 h-7 rotate-90 transition-transform duration-200" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div
          className="
      md:hidden
      bg-(--surface)
      border-t border-(--border-color)
      px-6 py-5
      space-y-4
      animate-in slide-in-from-top-2
    "
        >
          {/* Top row: Theme toggle */}
          <div className="flex justify-end">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="
          w-10 h-10 flex items-center justify-center
          rounded-full
          bg-(--border-color)
          text-(--text-primary)
          hover:opacity-80
          transition
        "
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-(--icon-sun)" />
              ) : (
                <Moon size={18} className="text-(--icon-moon)" />
              )}
            </button>
          </div>

          {/* Guest links */}
          {!user && (
            <div className="space-y-3">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="
      block w-full text-center py-3 rounded-lg
      bg-(--bg-surface)
      text-(--text-primary)
      border border-(--border-color)
      hover:bg-(--border-color)
      transition
    "
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="
      block w-full text-center py-3 rounded-lg
      bg-(--bg-surface)
      text-(--text-primary)
      border border-(--border-color)
      hover:bg-(--border-color)
      transition
    "
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Authenticated links */}
          {user && (
            <div className="space-y-3">
              <Link
                to="/reports"
                onClick={() => setMenuOpen(false)}
                className="
      block w-full py-3 px-4 rounded-lg
      bg-(--bg-surface)
      text-(--text-primary)
      border border-(--border-color)
      hover:bg-(--border-color)
      transition
    "
              >
                Reports
              </Link>

              {user.admin && (
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="
        block w-full py-3 px-4 rounded-lg
        bg-(--bg-surface)
        text-(--text-primary)
        border border-(--border-color)
        hover:bg-(--border-color)
        transition
      "
                >
                  Admin
                </Link>
              )}

              <div
                className="
      px-4 py-3 rounded-lg
      text-sm
      bg-(--bg-surface)
      text-(--text-secondary)
      border border-(--border-color)
    "
              >
                Signed in as <span className="font-medium">{user.name}</span>
              </div>

              <button
                onClick={handleLogout}
                className="
      w-full py-3 rounded-lg
      bg-red-600 text-white
      hover:bg-red-700
      transition
    "
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
