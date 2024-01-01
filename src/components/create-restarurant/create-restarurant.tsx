import React, { ChangeEvent, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import {
  ICreateRestaurant,
  useCreateRestaurantMutation,
} from "../../redux/api/resturant.api";

const init = {
  name: "",
  address: "",
};

const CreateRestaurant = () => {
  const [value, setValue] = useState<ICreateRestaurant>(init);

  const [mutate, { isLoading, data, isSuccess, error }] =
    useCreateRestaurantMutation();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body: ICreateRestaurant = {
      address: value.address,
      name: value.name,
    };
    await mutate(body);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const navgite = useNavigate();

  if (isSuccess) {
    localStorage.setItem("id", JSON.stringify(data?.id));
    navgite("/");
  }

  console.log("data", data);

  const styleInput =
    "appearance-none w-full block relative  px-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

  return (
    <div className="mt-20 w-[230px] sm:w-[400px] md:w-[500px]  mx-[20px]  sm:mx-auto">
      <h2 className="text-center text-3xl text-gray-900 font-extrabold">
        create Your restaurant
      </h2>
      {isLoading && <h1>loading....</h1>}

      {error && (
        <h1 className="text-[15px] text-red-400 my-2">
          {JSON.stringify(error)}
        </h1>
      )}
      <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
        <form className="spec-y-6" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm text-gray-700 font-medium"
            >
              name of restaurant
            </label>
            <div className="mt-1">
              <input
                required
                value={value.name}
                onChange={onChange}
                name="name"
                type={"text"}
                className={styleInput}
              />
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="address"
              className="block text-sm text-gray-700 font-medium"
            >
              address your restaurant
            </label>
            <div className="mt-1 relative">
              <input
                required
                value={value.address}
                onChange={onChange}
                name="address"
                className={styleInput}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center">
            <button className="w-fit h-[40px] py-2 px-4 flex justify-center border border-transparent font-medium text-white rounded-md bg-blue-500 hover:bg-blue-700">
              Create Your restaurant
            </button>
            <Link
              to={"/"}
              className="w-fit ml-4  h-[40px] py-2 px-4 flex justify-center border border-transparent font-medium text-white rounded-md bg-blue-500 hover:bg-blue-700"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRestaurant;
