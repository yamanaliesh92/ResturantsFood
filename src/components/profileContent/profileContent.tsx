import React, { FC, useContext, useState } from "react";
import woman from "../../img/woman.jpeg";
import { MdAddAPhoto } from "react-icons/md";
import AllOrder from "../AllOrders/AllOrder";
import MethodPayment from "../methodPayement/methodPayement";
import { contextUser } from "../../context/user.context";

interface IProps {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}

const ProfileContent: FC<IProps> = ({ active, setActive }) => {
  const [edit, setEdit] = useState(false);
  const { data: dateMe } = useContext(contextUser);

  console.log("dateMe", dateMe.img);

  const init = {
    username: dateMe.username,
    img: dateMe.img,
  };
  const [username, setUserName] = useState(init.username);
  const [file, setFile] = useState(init.img);
  return (
    <div className="w-full p-10 ">
      {active === 1 ? (
        <div className="w-full flex items-center flex-col p-5">
          <div className="relative items-center justify-center flex">
            {edit ? (
              <input
                value={file}
                type={file}
                onChange={(e) => setFile(e.target.value)}
                className=" w-full block relative  px-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            ) : (
              <img
                src={dateMe.img}
                alt="ads"
                className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] rounded-full border-[3px] object-cover border-[#3da123]"
              />
            )}
          </div>

          <div className="flex items-center mt-3">
            {edit ? (
              <input
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className=" w-full block relative  px-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            ) : (
              <>
                <h1 className="text-[18px] ml-1">{username}</h1>
              </>
            )}
          </div>

          <div className="mt-4 flex items-center">
            {edit && (
              <button
                className=" text-white ml-3 bg-blue-600 hover:bg-white hover:text-blue-600 p-4 rounded-md"
                type={"submit"}
              >
                update
              </button>
            )}
            <button
              onClick={() => setEdit((prev) => !prev)}
              className=" text-white bg-blue-600 hover:bg-white hover:text-blue-600 p-4 rounded-md"
              type={"submit"}
            >
              {edit ? "cancel" : "edit"}
            </button>
          </div>
        </div>
      ) : null}

      {active === 2 ? <AllOrder /> : null}

      {active === 6 ? <MethodPayment /> : null}
    </div>
  );
};

export default ProfileContent;
