import { getCookie } from "@/actions/cookie";

import axios from "axios";

const axiosApiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosApiInstance.interceptors.request.use(
  async (config) => {
    const token = await getCookie("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
