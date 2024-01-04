import React, { ChangeEvent, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  ICreateRestaurant,
  useCreateRestaurantMutation,
} from "../../redux/api/resturant.api";
import Button from "../button";
import Input from "../Input/input";

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

  const navigate = useNavigate();

  if (isSuccess) {
    localStorage.setItem("id", JSON.stringify(data?.id));
    navigate("/");
  }

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
      <form className="p-2 w-full flex flex-col" onSubmit={onSubmit}>
        <div className="flex flex-col mt-2">
          <Input
            value={value.name}
            onChange={(e) => setValue({ ...value, name: e.target.value })}
            label="Name of restaurant"
            name="name"
            type="text"
          />
        </div>

        <div className="flex flex-col mt-2">
          <Input
            value={value.address}
            onChange={(e) => setValue({ ...value, address: e.target.value })}
            label="address of restaurant"
            name="address"
            type="text"
          />
        </div>

        <Button isLoading={isLoading}>Create</Button>
      </form>
    </div>
  );
};

export default CreateRestaurant;
