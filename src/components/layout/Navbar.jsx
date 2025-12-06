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
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="font-bold text-lg"><Link to="/">iReporter</Link></div>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span>{user.name}</span>
            <Link to="/reports" className="hover:underline">Reports</Link>
            {user.admin && <Link to="/admin" className="hover:underline">Admin</Link>}
            <button onClick={handleLogout} className="bg-red-500 px-2 py-1 rounded hover:bg-red-600">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
