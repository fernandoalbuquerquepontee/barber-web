import axios from "axios";

export const protectedApi = axios.create({
  baseURL: "https://barber-pro-umber.vercel.app",
  withCredentials: true,
});

export const publicApi = axios.create({
  baseURL: "https://barber-pro-umber.vercel.app",
});

protectedApi.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);
