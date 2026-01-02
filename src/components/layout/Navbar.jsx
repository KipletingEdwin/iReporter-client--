import { Link, useNavigate, NavLink } from "react-router-dom";
import {
  // useEffect,
  useState,
} from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  // useEffect(() => {
  //   const handleScroll = () => setScrolled(window.scrollY > 10);
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);
  const mobileNavLinkClasses = ({ isActive }) => `
  block w-full py-3 px-4 rounded-lg border transition
  ${isActive 
    ? "bg-[var(--primary)/10] border-[var(--primary)] text-[var(--primary)]" 
    : "bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--border-color)]"}
`;

const desktopNavLinkClasses = ({ isActive }) => `
  relative font-medium transition
  ${isActive 
    ? "text-[var(--primary)] after:w-full" 
    : "text-[var(--text-primary)] hover:text-[var(--primary)] after:w-0"}
  after:absolute after:left-0 after:-bottom-1 after:h-0.5
  after:bg-[var(--primary)] after:transition-all after:duration-300
`;



  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav
      className={`
        w-full sticky top-0 z-50 transition-all duration-300 bg-(--bg-surface/80) backdrop-blur-xl
        border-b border-(--border-color) ${
          scrolled ? "shadow-md py-3" : "backdrop-blur-md py-4 "
        }
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
              <NavLink
                to="/login"
                className={desktopNavLinkClasses
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className={desktopNavLinkClasses
                }
              >
                Sign Up
              </NavLink>
            </>
          )}

          {user && (
            <>
              <NavLink
                to="/reports"
                className={desktopNavLinkClasses
                }
              >
                Reports
              </NavLink>

              {user.admin && (
                <NavLink
                  to="/admin"
                  className={desktopNavLinkClasses
                  }
                >
                  Admin
                </NavLink>
              )}

              <div className="w-9 h-9 rounded-full bg-(--primary) text-white flex items-center justify-center font-semibold cursor-pointer ">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer
                           hover:bg-red-600 transition shadow-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile: Theme toggle + Hamburger */}
        <div className="flex items-center gap-3 md:hidden mb-3">
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
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className={mobileNavLinkClasses}
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className= {mobileNavLinkClasses}
              >
                Sign Up
              </NavLink>
            </div>
          )}

          {user && (
            <div className="space-y-3">
              <NavLink
                to="/reports"
                onClick={() => setMenuOpen(false)}
                className= {mobileNavLinkClasses}
              >
                Reports
              </NavLink>

              {user.admin && (
                <NavLink
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className={mobileNavLinkClasses}
                >
                  Admin
                </NavLink>
              )}

              {/* <div className="w-9 h-9 rounded-full bg-(--primary) text-white flex items-center justify-center font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div> */}

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

// relative font-medium text-(--text-primary)
// hover:text-(--primary) transition
// after:absolute after:left-0 after:-bottom-1 after:h-0.5
// after:w-0 after:bg-(--primary)
// after:transition-all after:duration-300
// hover:after:w-full
