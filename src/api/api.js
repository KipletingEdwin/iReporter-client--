import axios from "axios";

const API_URL = "http://localhost:3000";

export const signup = async (data) => {
  const res = await axios.post(`${API_URL}/signup`, data);
  return res.data;
};

export const login = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);
  return res.data;
};

export const getReports = async (token) => {
  const res = await axios.get(`${API_URL}/reports`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getReport = async (id, token) => {
  const res = await axios.get(`${API_URL}/reports/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createReport = async (data, token) => {
  const res = await axios.post(`${API_URL}/reports`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateReport = async (id, data, token) => {
  const res = await axios.put(`${API_URL}/reports/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteReport = async (id, token) => {
  const res = await axios.delete(`${API_URL}/reports/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
