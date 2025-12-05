import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/reports" className="text-xl font-bold text-blue-600">
        iReporter
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-4">

        {/* Not logged in */}
        {!isAuthenticated && (
          <>
            <Link className="text-gray-700 hover:text-blue-600" to="/login">
              Login
            </Link>

            <Link className="text-gray-700 hover:text-blue-600" to="/signup">
              Signup
            </Link>
          </>
        )}

        {/* Logged in */}
        {isAuthenticated && (
          <>
            <span className="text-gray-600">Hi, {user?.email}</span>

            <Link className="text-gray-700 hover:text-blue-600" to="/reports">
              Reports
            </Link>

            <Link className="text-gray-700 hover:text-blue-600" to="/admin">
              Admin
            </Link>

            <button
              onClick={logout}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
