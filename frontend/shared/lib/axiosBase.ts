import axios from "axios";

export const axiosBase = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_SIDE,
  headers: {
    "Content-Type": "application/json",
  },
});
