import React, { ChangeEvent, FC, useState } from "react";

import {
  IResponseRestaurant,
  useUpdateRestaurantInfoMutation,
} from "../../redux/api/resturant.api";
import Input from "../Input/input";

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
  const [mutate, { isSuccess, isLoading, error }] =
    useUpdateRestaurantInfoMutation();

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

  return (
    <div className="w-[220px] sm:w-[500px] h-full bg-slate-100 dark:bg-black shadow-md p-2 sm:p-5  flex flex-col rounded-md  mt-3">
      {isLoading && <h1>Loading.....</h1>}
      {error && (
        <h1 className="text-[15px] text-red-400 my-2">
          {JSON.stringify(error)}
        </h1>
      )}
      <h2 className="sm:text-center sm:text-2xl text-gray-900 dark:text-white font-extrabold">
        update Yore restaurant
      </h2>

      <form onSubmit={onSubmit}>
        <div>
          <Input
            value={value.name as string}
            onChange={onChange}
            name="name"
            type={"text"}
            label="Name"
          />

          <div className="mt-4">
            <Input
              value={value.address as string}
              onChange={onChange}
              name="address"
              label="Address"
              type={"text"}
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
