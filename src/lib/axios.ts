import axios from "axios";

export const protectedApi = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export const publicApi = axios.create({
  baseURL: "http://localhost:8080",
});

protectedApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response?.status === 401) {
    //   window.location.href = "/auth";
    // }
    return Promise.reject(error);
  },
);
