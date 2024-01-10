import React, { useEffect, useState } from "react";

import DashboardSideBar from "../components/dashboardSideBar/dashboradSideBar";
import RestaurantInfo from "../components/restaurant-info/restauranInfo";
import UpdateRestaurantInfo from "../components/update-resturantInfo/update-resturantInfo";
import { useGetOneRestaurantQuery } from "../redux/api/resturant.api";

const RestaurantInfoPage = () => {
  const [restaurantId, setRestaurantId] = useState<number>(0);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("id")
      ? JSON.parse(localStorage.getItem("id") as any)
      : 0;
    setRestaurantId(id);
  }, []);

  const { data } = useGetOneRestaurantQuery({ id: restaurantId });

  return (
    <div>
      <div className="flex w-full  justify-between bg-white dark:bg-blue-950">
        <div className="w-[150px] h-screen sm:w-[330px]">
          <DashboardSideBar active={6} />
        </div>
        <div className="w-full flex justify-center bg-white dark:bg-blue-950   h-[450px]">
          {!edit ? (
            <RestaurantInfo data={data} setEdit={setEdit} />
          ) : (
            <UpdateRestaurantInfo data={data} setEdit={setEdit} />
          )}
        </div>
      </div>
    </div>
  );
};
export default RestaurantInfoPage;
