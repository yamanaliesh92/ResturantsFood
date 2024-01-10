import { createSlice } from "@reduxjs/toolkit";
export interface Init {
  email: string;
  authorization: boolean;
  isLoading: boolean;
}

const initState: Init = {
  email: "",
  authorization: false,
  isLoading: true,
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
    login: (state: Init) => {
      return {
        ...state,

        authorization: true,
        isLoading: false,
      };
    },
    logout: (state: Init) => {
      return {
        ...state,
        authorization: false,
        isLoading: false,

        email: "",
      };
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
