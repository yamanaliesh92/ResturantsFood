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

export interface IResponseRegister {
  user: IResponseUser;
  token: string;
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

    loginUser: builder.mutation<IResponseRegister, IPayloadLogin>({
      query: (body) => ({
        body: body,
        method: "POST",
        url: "/auth/user/login",
      }),
    }),
    getMe: builder.query<IResponseUser, any>({
      query: () => ({
        method: "GET",
        url: "api/auth/user/me",
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useGetMeQuery,
  useChangePasswordMutation,
} = user;
