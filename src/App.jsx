import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/layout/Layout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ReportsPage from "./pages/ReportsPage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* <Route
            path="/reports"
            element={user ? <ReportsPage /> : <Navigate to="/login" replace />}
          /> */}
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/admin" element={ user && user.admin ? ( <AdminPage /> ) : ( <Navigate to="/reports" replace /> ) }  />
        </Routes>
      </Layout>
    </Router>
  );
}
