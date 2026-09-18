import axios from "axios";

export const protectedApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  withCredentials: true,
});

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
});

protectedApi.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);
