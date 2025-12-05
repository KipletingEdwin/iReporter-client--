import { createContext, useState, useEffect } from "react";
import API from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // Auto-load user profile if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await API.get("/auth/me"); // Rails endpoint that returns user info
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  // Login
  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });

    const token = res.data.token;
    localStorage.setItem("token", token);
    setToken(token);

    // load user profile
    const userRes = await API.get("/auth/me");
    setUser(userRes.data);

    return userRes.data;
  };

  // Signup
  const signup = async (formData) => {
    const res = await API.post("/auth/signup", formData);

    const token = res.data.token;
    localStorage.setItem("token", token);
    setToken(token);

    const userRes = await API.get("/auth/me");
    setUser(userRes.data);

    return userRes.data;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
