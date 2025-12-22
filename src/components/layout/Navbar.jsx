import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav
      className={`
        w-full sticky top-0 z-50 transition-all duration-300
        bg-(--bg-surface)
        ${scrolled ? "shadow-md py-3" : "backdrop-blur-md py-4"}
      `}
    >
      <div className="mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link
          to={user ? "/reports" : "/"}
          className="text-2xl font-semibold tracking-wide
                     text-(--text-primary)
                     hover:text-(--primary)
                     transition"
        >
          iReporter
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <ThemeToggle />

          {!user && (
            <>
              <Link
                to="/login"
                className="text-(--text-primary) hover:text-(--primary) transition font-medium"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="text-(--text-primary) hover:text-(--primary) transition font-medium"
              >
                Sign Up
              </Link>
            </>
          )}

          {user && (
            <>
              <Link
                to="/reports"
                className="text-(--text-primary) hover:text-(--primary) transition font-medium"
              >
                Reports
              </Link>

              {user.admin && (
                <Link
                  to="/admin"
                  className="text-(--text-primary) hover:text-(--primary) transition font-medium"
                >
                  Admin
                </Link>
              )}

              <span
                className="px-3 py-1 rounded-full text-sm font-medium
                               bg-(--primary) text-white"
              >
                {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg
                           hover:bg-red-600 transition shadow-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile: Theme toggle + Hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg text-(--text-primary)
                       hover:text-(--primary) transition"
          >
            {menuOpen ? (
              <X className="w-7 h-7 rotate-90 transition-transform duration-200" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="
            md:hidden
            bg-(--bg-surface)
            border-t border-(--border-color)
            px-6 py-5 space-y-4
            animate-in slide-in-from-top-2 duration-200 ease-out
          "
        >
          {!user && (
            <div className="space-y-3">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center py-3 rounded-lg
                           bg-(--bg-surface)
                           text-(--text-primary)
                           border border-(--border-color)
                           hover:bg-(--border-color)
                           transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center py-3 rounded-lg
                           bg-(--bg-surface)
                           text-(--text-primary)
                           border border-(--border-color)
                           hover:bg-(--border-color)
                           transition"
              >
                Sign Up
              </Link>
            </div>
          )}

          {user && (
            <div className="space-y-3">
              <Link
                to="/reports"
                onClick={() => setMenuOpen(false)}
                className="block w-full py-3 px-4 rounded-lg
                           bg-(--bg-surface)
                           text-(--text-primary)
                           border border-(--border-color)
                           hover:bg-(--border-color)
                           transition"
              >
                Reports
              </Link>

              {user.admin && (
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full py-3 px-4 rounded-lg
                             bg-(--bg-surface)
                             text-(--text-primary)
                             border border-(--border-color)
                             hover:bg-(--border-color)
                             transition"
                >
                  Admin
                </Link>
              )}

              <div
                className="px-4 py-3 rounded-lg text-sm
                           bg-(--bg-surface)
                           text-(--text-secondary)
                           border border-(--border-color)"
              >
                Signed in as: <span className="font-medium">{user.name}</span>
              </div>

              <button
                onClick={handleLogout}
                className="w-full py-3 rounded-lg
                           bg-red-600 text-white
                           hover:bg-red-700 transition"
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
