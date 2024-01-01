import React, { ChangeEvent, FC, useContext, useRef, useState } from "react";
import { contextUser } from "../../context/user.context";
import { HiPhotograph } from "react-icons/hi";
import {} from "../../redux/api/resturant.api";
import {
  useUpdateImgInfoMutation,
  useUpdateUsernameInfoMutation,
} from "../../redux/api/user.api";

interface IProps {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateInfo: FC<IProps> = ({ setEdit }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: dataMe } = useContext(contextUser);
  const init = {
    username: dataMe.username,
    img: dataMe.img,
  };

  const [username, setUserName] = useState(init.username);

  const [updateImg, setUpdateImg] = useState<File | null>(null);

  const [openUpdateImg, setOpenUpdateImg] = useState(false);

  const [mutateImg, { isSuccess, isLoading, error: errorUpdateImg }] =
    useUpdateImgInfoMutation();

  const [mutate, { isSuccess: isSuccessUpdateUsername, error }] =
    useUpdateUsernameInfoMutation();

  const onChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const value = e.target.files[0];
    setUpdateImg(value);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", updateImg as any);

    openUpdateImg && (await mutateImg(formData as any));

    dataMe.username !== username && (await mutate({ username: username }));
  };

  if (isSuccess) {
    setEdit(false);
  }
  if (isSuccessUpdateUsername) {
    setEdit(false);
  }

  const openGallery = () => {
    setOpenUpdateImg(true);
    inputRef.current?.click();
  };

  const styleInput =
    "appearance-none w-[65%] rounded-md block relative  px-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

  return (
    <div className="w-[220px] sm:w-[500px] h-full bg-slate-100 shadow-md p-2 sm:p-5  flex flex-col rounded-md  mt-3">
      {isLoading && <h1>Loading.....</h1>}
      {error && (
        <h1 className="text-[15px] text-red-400 my-2">
          {JSON.stringify(error)}
        </h1>
      )}
      {errorUpdateImg && (
        <h1 className="text-[15px] text-red-400 my-2">
          {JSON.stringify(error)}
        </h1>
      )}
      <h2 className="sm:text-center sm:text-2xl text-gray-900 font-extrabold">
        update Yore info
      </h2>

      <form onSubmit={onSubmit}>
        <div className="fle flex items-center p-3">
          <h3 className="block text-sm my-3 mr-2 text-gray-700 font-medium">
            click in icon to change your photo
          </h3>

          <HiPhotograph onClick={openGallery} />
        </div>

        <div style={{ display: "none" }}>
          <input
            ref={inputRef}
            onChange={onChangeImg}
            type={"file"}
            className={styleInput}
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="address of restaurant"
            className="block text-sm my-3 text-gray-700 font-medium"
          >
            your name
          </label>

          <input
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            name="username"
            className={styleInput}
          />
        </div>

        <div className="mt-4 flex items-center">
          <button
            type={"submit"}
            className=" w-[80px]   sm:w-[100px]   h-[40px] py-2 px-4 ml-3 border  font-medium text-white rounded-md bg-blue-500 hover:bg-blue-700"
          >
            edit
          </button>
          <button
            className=" w-[80px]   sm:w-[100px]  h-[40px] py-2 px-4  font-medium text-white rounded-md bg-blue-500 hover:bg-blue-700"
            onClick={() => setEdit(false)}
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateInfo;
