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
        scrolled
          ? "shadow-md py-3"
          : "backdrop-blur-md py-4"
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
                        bg-slate-200 dark:bg-slate-800
                        hover:bg-slate-300 dark:hover:bg-slate-700
                        transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun size={18} className="text-yellow-400" />
                ) : (
                  <Moon size={18} className="text-slate-700" />
                )}
              </button>

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
          className="md:hidden p-2 rounded-lg text-(--text-primary) hover:text(--primary)  transition  focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {
            menuOpen ? ( <X className="w-7 h-7" />) : (<Menu className="w-7 h-7" />)
          }

        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden  border-t border-slate-800 px-6 py-4 space-y-4">
          {!user && (
            <>
            <div className="flex items-center justify-between">
              <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-full 
              bg-(--border-color) hover:opacity-80 transition " aria-label="Toggle theme"
              
              >
                {
                  theme === "dark" ? (
                    <Sun size={18} className="text-yellow-400"    />
                  ) : (
                    <Moon size={18} className="text-(--text-primary)"    />
                  )
                }

              </button>

            </div>

              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className=" block text-(--text-primary) text-center  hover:text-blue-400 font-medium transition "
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="  block text-(--text-primary) text-center hover:text-blue-400 font-medium transition    "
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
                className="block text-gray-100 hover:text-blue-400 font-medium transition"
              >
                Reports
              </Link>

              {user.admin && (
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="block text-gray-100 hover:text-blue-400 font-medium transition"
                >
                  Admin
                </Link>
              )}

              <div className="text-gray-200 font-medium bg-slate-800 px-3 py-2 rounded">
                {user.name}
              </div>

              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
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
