import requests from "./httpService";

const EventServices = {
  updateEvent: async (id, body) => {
    return requests.put(`/events/${id}`, body);
  },

  addEvent: async (body) => {
    return requests.post("/events/", body);
  },

  deleteEvent: async (id) => {
    return requests.delete(`/events/${id}`);
  },

  getAllEvents: async () => {
    return requests.get("/events/");
  },

  getEventById: async (id) => {
    return requests.get(`/events/${id}`);
  },

  publishEvent: async (id, body) => {
    return requests.put(`/events/publish/${id}`, body);
  },
};

export default EventServices;
