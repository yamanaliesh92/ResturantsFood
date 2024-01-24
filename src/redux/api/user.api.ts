import { SerializedError } from "@reduxjs/toolkit";
import { api } from "./api";
import { IError } from "./api.common";

export interface IPayloadRegister {
  email: string;
  password: string;
  username: string;
}

export interface IResponseUser {
  username: string;
  password: string;
  email: string;
  id: number;
}

export interface IPayloadUpdateImgUser {
  img: string;
}

export interface IPayloadPayment {
  amount: number;
}

export interface IPayloadUpdateUsernameUser {
  username: string;
}

export interface IResponseRegister {
  accessToken: string;
  refreshToken: string;
}

export interface IResponsePayment {
  data: {
    id: number;
    object: string;
    amount: number;
    client_secret: string;
  };
}

export interface IPayloadChangePassword {
  password: string;
}

export interface IResponseLogin {
  token: string;
}
export interface IPayloadLogin {
  email: string;
  password: string;
}
const user = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createUser: builder.mutation<IResponseRegister, IPayloadRegister>({
      query: (body) => ({
        body: body,
        url: "/api/auth/user/create",
        method: "POST",
      }),
      transformErrorResponse: (err): SerializedError => {
        return (err.data as IError)?.message
          ? { message: (err.data as IError)?.message }
          : { message: "default" };
      },
    }),

    createPayment: builder.mutation<IResponsePayment, IPayloadPayment>({
      query: (body) => ({
        body: body,
        url: "/api/auth/pay/checkout",
        method: "POST",
      }),
      transformErrorResponse: (err): SerializedError => {
        return (err.data as IError)?.message
          ? { message: (err.data as IError)?.message }
          : { message: "default" };
      },
    }),

    changePassword: builder.mutation<void, IPayloadChangePassword>({
      query: (body) => ({
        method: "PATCH",
        body: body,
        url: "/auth/changePassword",
      }),
      transformErrorResponse: (err): SerializedError => {
        return (err.data as IError)?.message
          ? { message: (err.data as IError)?.message }
          : { message: "default" };
      },
    }),

    updateImgInfo: builder.mutation<boolean, IPayloadUpdateImgUser>({
      query: (body) => ({
        method: "PATCH",
        body: body,
        url: "/api/auth/user/update/img",
      }),
      transformErrorResponse: (err): SerializedError => {
        return (err.data as IError)?.message
          ? { message: (err.data as IError)?.message }
          : { message: "default" };
      },
      invalidatesTags: ["User"],
    }),

    updateUsernameInfo: builder.mutation<boolean, IPayloadUpdateUsernameUser>({
      query: (body) => ({
        method: "PATCH",
        body: body,
        url: "/api/auth/update",
      }),
      invalidatesTags: ["User"],
    }),

    loginUser: builder.mutation<IResponseRegister, IPayloadLogin>({
      query: (body) => ({
        body: body,
        method: "POST",
        url: "/api/auth/user/login",
      }),
      transformErrorResponse: (err): SerializedError => {
        return (err.data as IError)?.message
          ? { message: (err.data as IError)?.message }
          : { message: "default" };
      },
    }),
    getMe: builder.query<IResponseUser, any>({
      query: () => ({
        method: "GET",
        url: "api/auth/user/me",
      }),
      transformErrorResponse: (err): SerializedError => {
        return (err.data as IError)?.message
          ? { message: (err.data as IError)?.message }
          : { message: "default" };
      },
      providesTags: (result) =>
        result
          ? [{ type: "User", id: "LIST" }]
          : [{ id: "LIST", type: "User" }],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useUpdateUsernameInfoMutation,
  useCreatePaymentMutation,
  useUpdateImgInfoMutation,
  useGetMeQuery,
  useChangePasswordMutation,
} = user;
