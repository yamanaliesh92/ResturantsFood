import { FC, PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const PublicRouter: FC<PropsWithChildren<{}>> = ({ children }) => {
  const auth = useSelector((state: any) => state.user.authorization);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);
  return <>{children}</>;
};

export default PublicRouter;
