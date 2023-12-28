import { FC, PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRouter: FC<PropsWithChildren<{}>> = ({ children }) => {
  const auth = useSelector((state: any) => state.user.authorization);
  const isLoading = useSelector((state: any) => state.user.isLoading);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      navigate("/auth");
    }
  }, [auth, isLoading, navigate]);

  return <>{children}</>;
};

export default PrivateRouter;
