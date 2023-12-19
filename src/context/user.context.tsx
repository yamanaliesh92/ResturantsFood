import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useDispatch } from "react-redux";
import { IResponseUser, useGetMeQuery } from "../redux/api/user.api";
import { login, logout } from "../redux/reducers/user.reducer";

interface IUser {
  isLoading?: boolean;
  data: IResponseUser;
}

const initUser: IResponseUser = {
  email: "",
  password: "",
  username: "",
  id: 0,
  img: "",
};

const init: IUser = {
  isLoading: false,
  data: initUser,
};

export enum ActionUser {
  "SET_LOADING" = "SET_LOADING",
}

const reduce = (prev: IUser, action: any) => {
  switch (action.type) {
    case ActionUser.SET_LOADING: {
      return { ...prev, isLoading: action.loading };
    }
  }
};
export const contextUser = createContext(init);

export const ProviderContext: FC<PropsWithChildren> = ({ children }) => {
  const dispatchRedux = useDispatch();
  const { data, error } = useGetMeQuery({});

  useEffect(() => {
    if (data) {
      console.log("data", data);
      dispatchRedux(login({ email: data.email }));
    }
    if (error) {
      dispatchRedux(logout());
    }
  }, [data, dispatchRedux, error]);

  const value = useMemo(() => {
    return { data };
  }, [data]);

  return (
    <contextUser.Provider value={value as any}>{children}</contextUser.Provider>
  );
};
