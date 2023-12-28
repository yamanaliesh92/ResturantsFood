import { createSlice } from "@reduxjs/toolkit";

export interface Init {
  email: string;
  authorization: boolean;
  isLoading: boolean;
}

const initState: Init = {
  email: "",
  authorization: false,
  isLoading: false,
};

export interface IPayloadLogin {
  email: string;
}

export interface IPayloadLoading {
  isLoading: boolean;
}

interface ILogin {
  payload: IPayloadLogin;
}

const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    login: (state: Init, action: ILogin) => {
      return {
        ...state,
        email: action.payload.email,
        authorization: true,
      };
    },
    logout: (state: Init) => {
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
