import { FC, PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IStateRedux } from "../redux/store";

const PrivateRouter: FC<PropsWithChildren<{}>> = ({ children }) => {
  const auth = useSelector((state: IStateRedux) => state.user.authorization);
  const isLoading = useSelector((state: IStateRedux) => state.user.isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("=====================", { isLoading, auth });

    if (!auth && !isLoading) {
      navigate("/auth");
    }
  }, [auth, isLoading, navigate]);

  return <>{children}</>;
};

export default PrivateRouter;
