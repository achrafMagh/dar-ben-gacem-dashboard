import requests from "./httpService";

const CategoryServices = {
  updatePress: async (id, body) => {
    return requests.put(`/press/${id}`, body);
  },

  addPress: async (body) => {
    return requests.post("/press/", body);
  },

  getAllPress: async () => {
    return requests.get("/press/");
  },

  getPressById: async (id) => {
    return requests.get(`/press/${id}`);
  },

  deletePress: async (id) => {
    return requests.delete(`/press/${id}`);
  },

  publishPress: async (id, body) => {
    return requests.put(`/press/publish/${id}`, body);
  },
};

export default CategoryServices;
