import React, { FC, useContext } from "react";
import { contextUser } from "../../context/user.context";

import { IResponseRestaurant } from "../../redux/api/resturant.api";
import Button from "../button";

interface IProps {
  data: IResponseRestaurant | undefined;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const RestaurantInfo: FC<IProps> = ({ data, setEdit }) => {
  const { data: dataMe } = useContext(contextUser);

  return (
    <div className=" w-[190px] sm:w-[500px] mt-5 h-[350px] dark:bg-white bg-dark shadow-md p-0 sm:p-5  flex flex-col rounded-md  ">
      <h1 className="p-2  text-white dark:text-dark text-center font-bold">
        Welcome mr {dataMe.username} in your restaurant
      </h1>
      <div className="f mt-4 p-2 flex items-center">
        <h1 className="text-[15px]  text-white dark:text-dark ">
          Restaurant name:
        </h1>
        <h1 className="text-[15px]  ml-1 sm:ml-2 text-red-500 ">
          {data?.name}
        </h1>
      </div>
      <div className="flex mt-4  p-2 items-center">
        <h1 className="text-[15px]  text-white dark:text-dark">
          Restaurant address:
        </h1>
        <h1 className="text-[15px] ml-1  sm:ml-2 text-red-500">
          {data?.address}
        </h1>
      </div>

      <div className=" flex  mt-4  p-2 items-center">
        <h1 className="text-[13px]  sm:text-[18px] mr-1  sm:mr-4  text-white dark:text-dark ">
          if you want to update your information
        </h1>
        <Button onClick={() => setEdit((prev) => !prev)}>edit</Button>
      </div>
    </div>
  );
};

export default RestaurantInfo;
