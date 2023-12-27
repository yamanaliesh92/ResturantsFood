import { FC, PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const PublicRouter: FC<PropsWithChildren<{}>> = ({ children }) => {
  const auth = useSelector((state: any) => state.user.authorization);
  const navigate = useNavigate();
  const l = useLocation();

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, l.pathname, navigate]);
  return <>{children}</>;
};

export default PublicRouter;
