import axios from "axios";
import { axiosBase } from "../axiosBase";
import { getCsrfToken, getSession } from "next-auth/react";

interface refreshToken {
  access_token: string;
  refresh_token: string;
}

export const axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_SIDE,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosAuth.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session) {
    config.headers["Authorization"] = `Bearer ${session.user.access_token}`;
  }

  return config;
});

axiosAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const user = await getSession();
    if (
      originalRequest &&
      error.response.status == 401 &&
      !originalRequest?.__isRetryRequest
    ) {
      originalRequest.retry = true;

      const res = await axiosBase.post<refreshToken>("/auth/refresh", {
        refresh_token: user?.user.refresh_token,
      });

      const csrfToken = await getCsrfToken();
      const updatedSession = await getSession({
        req: {
          body: {
            csrfToken,
            data: {
              user: {
                access_token: res.data.access_token,
                refresh_token: res.data.refresh_token,
              },
            },
          },
        },
      });

      return axiosAuth(originalRequest);
    }

    return Promise.reject(error);
  }
);
