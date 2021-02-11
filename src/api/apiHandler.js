import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

export default {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getAllActivities() {
    return service
      .get("/api/activities")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getOneActivity(activityId) {
    return service
      .get(`/api/activities/${activityId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getOneUser() {
    return service
      .get("/api/user/me")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateUser(data) {
    return service
      .patch("/api/user/me", data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateActivity(activityId, data) {
    return service
      .patch(`/api/activities/${activityId}`, data)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};
