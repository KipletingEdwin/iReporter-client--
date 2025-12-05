import API from "./api";

const reportService = {
  getAll: async () => {
    const res = await API.get("/reports");
    return res.data;
  },

  getOne: async (id) => {
    const res = await API.get(`/reports/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await API.post("/reports", data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await API.put(`/reports/${id}`, data);
    return res.data;
  },

  remove: async (id) => {
    const res = await API.delete(`/reports/${id}`);
    return res.data;
  }
};

export default reportService;
