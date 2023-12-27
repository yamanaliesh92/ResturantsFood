import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OwnerRouter: FC<PropsWithChildren<{}>> = ({ children }) => {
  const auth = useSelector((state: any) => state.user.authorization);
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState<number>(0);

  useEffect(() => {
    const id = localStorage.getItem("id")
      ? JSON.parse(localStorage.getItem("id") as any)
      : 0;
    setRestaurantId(id);
  }, []);

  if (!auth) {
    navigate("/auth");
  }
  if (auth && restaurantId === 0) {
    navigate("/");
  }

  return <>{children}</>;
};

export default OwnerRouter;
