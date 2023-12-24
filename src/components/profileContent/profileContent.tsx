import React, { ChangeEvent, FC, useContext, useRef, useState } from "react";
import woman from "../../img/woman.jpeg";
import { MdAddAPhoto } from "react-icons/md";
import AllOrder from "../AllOrders/AllOrder";

import { contextUser } from "../../context/user.context";
import {
  useUpdateImgInfoMutation,
  useUpdateUsernameInfoMutation,
} from "../../redux/api/user.api";
import { HiPhotograph } from "react-icons/hi";

interface IProps {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileContent: FC<IProps> = ({ active, setEdit, setActive }) => {
  const { data: dataMe } = useContext(contextUser);

  return (
    <>
      {active === 1 ? (
        <div className=" w-[190px] sm:w-[500px] h-full bg-slate-100 shadow-md p-0 sm:p-5  flex flex-col items-center rounded-md  mt-3">
          <h1 className="t p-2  text-center font-bold">
            Welcome in your information page
          </h1>
          <div className="flex items-center w-[150px] h-[150px] p-4  justify-center ">
            <img
              src={dataMe.img}
              alt="ds"
              className="w-full h-full rounded-full border border-b-gray-600"
            />
          </div>
          <div className="f flex mt-4  p-2 items-center">
            <h1 className="text-[13px]  sm:text-[18px]">
              your name in this application :
            </h1>
            <h1 className="text-[15px] ml-1 sm:text-[18px] sm:ml-4 text-blue-500">
              {dataMe?.username}
            </h1>
          </div>

          <div className=" flex  mt-4  p-2 items-center">
            <h1 className="text-[15px] font-bold sm:text-[18px] ml-1 sm:ml-4 text-blue-500">
              if you want to update info
            </h1>
            <button
              onClick={() => setEdit(true)}
              className=" text-white ml-4 w-[50px] sm:w-[70px]  bg-blue-600 hover:bg-white hover:text-blue-600 p-2 rounded-md"
              type={"submit"}
            >
              edit
            </button>
          </div>
        </div>
      ) : null}

      {active === 2 ? <AllOrder /> : null}
    </>
  );
};

export default ProfileContent;
