import React, { ChangeEvent, FC, useState } from "react";

import {
  IResponseRestaurant,
  useUpdateRestaurantInfoMutation,
} from "../../redux/api/resturant.api";

interface IProps {
  data: IResponseRestaurant | undefined;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateRestaurantInfo: FC<IProps> = ({ setEdit, data }) => {
  const init = {
    name: data?.name,
    address: data?.address,
  };
  const [value, setValue] = useState(init);
  const [mutate, { isSuccess, isLoading }] = useUpdateRestaurantInfoMutation();

  if (isSuccess) {
    setEdit(false);
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      name: value.name,
      address: value.address,
    };
    await mutate({ id: data?.id as number, payload: body });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const styleInput =
    "appearance-none w-[65%] rounded-md block relative  px-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

  return (
    <div className="w-[220px] sm:w-[500px] h-full bg-slate-100 shadow-md p-2 sm:p-5  flex flex-col rounded-md  mt-3">
      {isLoading && <h1>Loading....</h1>}
      <h2 className="sm:text-center sm:text-2xl text-gray-900 font-extrabold">
        update Yore restaurant
      </h2>

      <form onSubmit={onSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm my-3 text-gray-700 font-medium"
          >
            name of Restaurant
          </label>

          <input
            required
            value={value.name}
            onChange={onChange}
            name="name"
            type={"text"}
            className={styleInput}
          />

          <div className="mt-4">
            <label
              htmlFor="address of restaurant"
              className="block text-sm my-3 text-gray-700 font-medium"
            >
              address of restaurant
            </label>

            <input
              value={value.address}
              onChange={onChange}
              name="address"
              className={styleInput}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center">
          <button
            className=" w-[80px]   sm:w-[100px]  h-[40px] py-2 px-4  font-medium text-white rounded-md bg-blue-500 hover:bg-blue-700"
            onClick={() => setEdit(false)}
          >
            cancel
          </button>

          <button className=" w-[80px]   sm:w-[100px]   h-[40px] py-2 px-4 ml-3 border  font-medium text-white rounded-md bg-blue-500 hover:bg-blue-700">
            edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRestaurantInfo;
