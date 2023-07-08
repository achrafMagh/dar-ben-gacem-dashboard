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

  getAllCategory: async () => {
    return requests.get("/category");
  },

  getAllCategories: async () => {
    return requests.get("/category/all");
  },

  getCategoryById: async (id) => {
    return requests.get(`/category/${id}`);
  },

  addCategory: async (body) => {
    return requests.post("/category/add", body);
  },

  addAllCategory: async (body) => {
    return requests.post("/category/add/all", body);
  },

  updateCategory: async (id, body) => {
    return requests.put(`/category/${id}`, body);
  },

  updateStatus: async (id, body) => {
    return requests.put(`/category/status/${id}`, body);
  },

  deleteCategory: async (id, body) => {
    return requests.delete(`/category/${id}`, body);
  },

  updateManyCategory: async (body) => {
    return requests.patch("/category/update/many", body);
  },

  deleteManyCategory: async (body) => {
    return requests.patch("/category/delete/many", body);
  },
};

export default CategoryServices;
