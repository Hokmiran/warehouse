import axios from "axios";
import { memoizedRefreshToken } from "./refreshToken";

const api = import.meta.env.VITE_REACT_API_URL;

axios.defaults.baseURL = api;

axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": "az",
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;
    if (error?.response?.status === 403) {
      const result = await memoizedRefreshToken();

      if (result?.accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${result?.accessToken}`,
          "Accept-Language": "az",
        };
      }

      return axios(config);
    }
    return Promise.reject(error);
  }
);

export const privateAxios = axios;
