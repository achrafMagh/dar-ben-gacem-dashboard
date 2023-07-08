import requests from "./httpService";

const PressServices = {
  getAllPress: async () => {
    return requests.get("/press");
  },

  getAllPresses: async () => {
    return requests.get("/press");
  },

  getPressById: async (id) => {
    return requests.get(`/press/${id}`);
  },

  addPress: async (body) => {
    return requests.post("/press", body);
  },

  updatePress: async (id, body) => {
    return requests.put(`/press/${id}`, body);
  },

  updateStatus: async (id, body) => {
    return requests.put(`/press/status/${id}`, body);
  },

  deletePress: async (id, body) => {
    return requests.delete(`/press/${id}`, body);
  },
};

export default PressServices;
