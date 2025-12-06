import axios from "axios";

// Replace with your Rails API URL
const api = axios.create({
  baseURL: "http://localhost:3000",
});

// --- AUTH ---
export const signup = async (data) => {
  const res = await api.post("/signup", data);
  return res.data; // expected { user, token }
};

export const login = async (data) => {
  const res = await api.post("/login", data);
  return res.data; // expected { user, token }
};

// admin@test.com    password
// user@test.com     password

// export const login = async (data) => {
//   // temporary mock for frontend test
//   return { token: "mock-token", user: { name: "Test User", admin: true } };
// };


// --- REPORTS CRUD ---
export const getReports = async (token) => {
  const res = await api.get("/reports", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getReport = async (id, token) => {
  const res = await api.get(`/reports/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createReport = async (data, token) => {
  const res = await api.post("/reports", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateReport = async (id, data, token) => {
  const res = await api.put(`/reports/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteReport = async (id, token) => {
  const res = await api.delete(`/reports/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
