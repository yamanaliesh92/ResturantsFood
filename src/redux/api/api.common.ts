import axios from "axios";
import { getCookie } from "../../utils/cookie";
import { getEnv } from "../../utils/env";

export interface IError {
  statusCode: number;
  message: string;
  error: number;
}

export const http = axios.create({
  baseURL: getEnv({ IKey: "REACT_APP_SERVER" }),
});

const HEADER_NAME = "auth";

http.interceptors.request.use((config) => {
  const Token = getCookie("MyToken");

  console.log("toekn,", Token);

  return {
    ...config,
    headers: {
      [HEADER_NAME]: Token,
    },
  } as any;
});

export {};
