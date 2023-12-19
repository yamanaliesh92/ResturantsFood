import { createSlice } from "@reduxjs/toolkit";

export interface IInit {
  email: string;
  authorization: boolean;
  isLoading: boolean;
}

const initState: IInit = {
  email: "",
  authorization: false,
  isLoading: false,
};

export enum Action {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}
export interface IPaylodLogin {
  email: string;
}

interface ILogin {
  //   type: "LOGIN";
  payload: IPaylodLogin;
}

const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    login: (state: IInit, action: ILogin) => {
      const d = state.authorization;
      const ddd = state.email;
      console.log("inddddddddditekkkkk", { state, action, ddd, d });
      return {
        ...state,
        email: action.payload.email,
        authorization: true,
      };
    },
    logout: (state: IInit) => {
      return {
        ...state,
        authorization: false,
        email: "",
      };
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
