import { SerializedError } from "@reduxjs/toolkit";
import React from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import {
  ICreateRestaurant,
  useCreateRestaurantMutation,
} from "../../redux/api/resturant.api";
import Button from "../button";
import Input from "../Input/input";

const CreateRestaurant = () => {
  const [mutate, { isLoading, data, isSuccess, error }] =
    useCreateRestaurantMutation();

  const form = useForm({
    defaultValues: {
      name: "",
      address: "",
    },
  });
  const { register, handleSubmit, formState } = form;

  const { errors } = formState;

  const onSubmit = async (data: ICreateRestaurant) => {
    const body: ICreateRestaurant = {
      address: data.address,
      name: data.name,
    };
    await mutate(body);
  };

  const navigate = useNavigate();

  if (isSuccess) {
    localStorage.setItem("id", JSON.stringify(data?.id));
    navigate("/");
  }

  return (
    <div className="mt-20 w-[230px] sm:w-[400px] md:w-[500px] bg-dark dark:bg-white  mx-[20px]  sm:mx-auto">
      <h2 className="text-center text-3xl text-white dark:text-dark font-extrabold">
        create Your restaurant
      </h2>

      {error && <h1 className="error">{(error as SerializedError).message}</h1>}
      <form
        className="p-2 w-full flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col mt-2">
          <p className="error">{errors.name?.message}</p>
          <Input
            placeholder={"enter restaurant name"}
            {...register("name", {
              required: { value: true, message: "restaurant name is required" },
            })}
            label="Name of restaurant"
            type="text"
          />
        </div>

        <div className="flex flex-col mt-2">
          <p className="error">{errors.address?.message}</p>
          <Input
            placeholder={"enter restaurant address"}
            {...register("name", {
              required: {
                value: true,
                message: "restaurant address is required",
              },
            })}
            label="Address of restaurant"
            type="text"
          />
        </div>

        <Button isLoading={isLoading}>Create</Button>
      </form>
    </div>
  );
};

export default CreateRestaurant;
