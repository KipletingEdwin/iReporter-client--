import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ReportsPage from "../pages/ReportsPage";
import AdminPage from "../pages/AdminPage";
import PrivateRoute from "../components/PrivateRoute";
import Layout from "../components/layout/Layout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public pages */}
        <Route
          path="/login"
          element={
            <Layout>
              <LoginPage />
            </Layout>
          }
        />

        <Route
          path="/signup"
          element={
            <Layout>
              <SignupPage />
            </Layout>
          }
        />

        {/* Private pages */}
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <Layout>
                <ReportsPage />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Layout>
                <AdminPage />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/reports" />} />
      </Routes>
    </BrowserRouter>
  );
}
