import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "https://barberpro-ap33.onrender.com";

export const protectedApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const publicApi = axios.create({
  baseURL: API_URL,
});

protectedApi.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);
