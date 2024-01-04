import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
} from "react";
import { useDispatch } from "react-redux";

import { IResponseUser, useGetMeQuery } from "../redux/api/user.api";
import { login, logout } from "../redux/reducers/user.reducer";

interface IUser {
  data: IResponseUser;
}

const initUser: IResponseUser = {
  email: "",
  password: "",
  username: "",
  id: 0,
};

const init: IUser = {
  data: initUser,
};

export const contextUser = createContext(init);

export const ProviderContext: FC<PropsWithChildren> = ({ children }) => {
  const dispatchRedux = useDispatch();
  const { data, error } = useGetMeQuery({});

  useEffect(() => {
    if (data) {
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
