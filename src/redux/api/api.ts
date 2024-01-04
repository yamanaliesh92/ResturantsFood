import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { getCookie, setCookie } from "../../utils/cookie";

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log("hello", result?.meta?.response?.headers.get("new_token"));

  const token = result.meta?.response?.headers?.get("new_token");
  if (token) {
    setCookie("MyToken", token);
  }

  const refreshToken = result.meta?.response?.headers.get("new_refresh_token");
  if (refreshToken) {
    setCookie("MyRefreshToken", refreshToken);
  }

  console.log("====================", {
    token,
    refreshToken,
    result: result.meta,
  });

  return result;
};

const baseQuery = fetchBaseQuery({
  baseUrl: process.env["REACT_APP_SERVER"],
  prepareHeaders: (headers) => {
    const token = getCookie("MyToken");
    const refreshToken = getCookie("MyRefreshToken");

    token && headers.set("authorization", token);
    refreshToken && headers.set("refresh", refreshToken);

    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Order", "Restaurant", "Event"],
  endpoints: (builder) => ({}),
});
