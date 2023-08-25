import mem from "mem";
import { publicAxios } from "./publicAxios";

const refreshTokenFn = async () => {
  const token = localStorage.getItem("refreshToken");

  if (token) {
    try {
      const response = await publicAxios.post("/users/refresh-token", {
        token: token,
      });

      const accessToken = await response.data.data.accessToken;
      const refreshToken = await response.data.data.refreshToken;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const session = {
        accessToken,
        refreshToken,
      };
      return session;
    } catch (error) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location = window.location.origin + "/users/login";
    }
  } else {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location = window.location.origin + "/users/login";
  }
};

export const memoizedRefreshToken = mem(refreshTokenFn);
