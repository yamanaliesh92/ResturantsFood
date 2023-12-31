import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../utils/cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env["REACT_APP_SERVER"],
  prepareHeaders: (headers) => {
    const token = getCookie("MyToken");

    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,

  tagTypes: ["User", "Order", "Restaurant", "Event"],
  endpoints: (builder) => ({}),
});
