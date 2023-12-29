import { FC, PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PublicRouter: FC<PropsWithChildren<{}>> = ({ children }) => {
  const auth = useSelector((state: any) => state.user.authorization);
  const navigate = useNavigate();
  const isLoading = useSelector((state: any) => state.user.isLoading);

  useEffect(() => {
    if (auth && !isLoading) {
      navigate("/");
    }
  }, [auth, navigate, isLoading]);
  return <>{children}</>;
};

export default PublicRouter;
