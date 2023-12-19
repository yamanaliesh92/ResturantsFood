import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../utils/cookie";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env["REACT_APP_SERVER"],
    prepareHeaders: (headers) => {
      const token = getCookie("MyToken");
      if (!token) return;
      headers.set("auth", token);
    },
  }),
  tagTypes: ["User", "Order", "Restaurant", "Event"],
  endpoints: (builder) => ({}),
});
