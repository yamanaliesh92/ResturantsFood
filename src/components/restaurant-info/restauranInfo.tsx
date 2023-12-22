import React, { FC, useContext } from "react";
import { contextUser } from "../../context/user.context";

import { IResponseRestaurant } from "../../redux/api/resturant.api";

interface IProps {
  data: IResponseRestaurant | undefined;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const RestaurantInfo: FC<IProps> = ({ data, setEdit }) => {
  const { data: dataMe } = useContext(contextUser);

  return (
    <div className=" w-[190px] sm:w-[500px] h-full bg-slate-100 shadow-md p-0 sm:p-5  flex flex-col rounded-md  mt-3">
      <h1 className="t p-2  text-center font-bold">
        Welcome mr {dataMe.username} in your restaurant
      </h1>
      <div className="f mt-4 p-2 flex items-center">
        <h1 className="text-[13px]  sm:text-[18px]">restaurant name:</h1>
        <h1 className="text-[15px] sm:text-[18px] ml-1 sm:ml-4 text-blue-500">
          {data?.name}
        </h1>
      </div>
      <div className="f flex mt-4  p-2 items-center">
        <h1 className="text-[13px]  sm:text-[18px]">restaurant address:</h1>
        <h1 className="text-[15px] ml-1 sm:text-[18px] sm:ml-4 text-blue-500">
          {data?.address}
        </h1>
      </div>

      <div className=" flex  mt-4  p-2 items-center">
        <h1 className="text-[15px] font-bold sm:text-[18px] ml-1 sm:ml-4 text-blue-500">
          if you want to update info
        </h1>
        <button
          onClick={() => setEdit((prev) => !prev)}
          className=" text-white ml-4 w-[50px] sm:w-[70px]  bg-blue-600 hover:bg-white hover:text-blue-600 p-2 rounded-md"
          type={"submit"}
        >
          edit
        </button>
      </div>
    </div>
  );
};

export default RestaurantInfo;
