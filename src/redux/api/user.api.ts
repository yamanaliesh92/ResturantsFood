import { api } from "./api";
import { IError } from "./api.common";

export interface IPayloadRegister {
  email: string;
  password: string;
  username: string;
  img: string;
}

export interface IResponseUser {
  username: string;
  password: string;
  email: string;
  id: number;
  img: string;
}

export interface IPayloadUpdateImgUser {
  img: string;
}

export interface IPayloadUpdateUsernameUser {
  username: string;
}

export interface IResponseRegister {
  acceesToken: string;
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
    }),

    changePassword: builder.mutation<void, IPayloadChangePassword>({
      query: (body) => ({
        method: "PATCH",
        body: body,
        url: "/auth/changePassword",
      }),
    }),

    updateImgInfo: builder.mutation<boolean, IPayloadUpdateImgUser>({
      query: (body) => ({
        method: "PATCH",
        body: body,
        url: "/api/auth/user/update/img",
      }),
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
    }),
    getMe: builder.query<IResponseUser, any>({
      query: () => ({
        method: "GET",
        url: "api/auth/user/me",
      }),
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
  useUpdateImgInfoMutation,
  useGetMeQuery,
  useChangePasswordMutation,
} = user;
