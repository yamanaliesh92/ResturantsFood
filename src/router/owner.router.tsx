import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IStateRedux } from "../redux/store";

const OwnerRouter: FC<PropsWithChildren<{}>> = ({ children }) => {
  const auth = useSelector((state: IStateRedux) => state.user.authorization);

  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("id")
      ? JSON.parse(localStorage.getItem("id") as any)
      : 0;
    if (auth && id === 0) {
      navigate("/");
    }
  }, [auth, navigate]);

  return <>{children}</>;
};

export default OwnerRouter;
