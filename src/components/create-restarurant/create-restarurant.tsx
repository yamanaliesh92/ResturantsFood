import { zodResolver } from "@hookform/resolvers/zod";
import { SerializedError } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  ICreateRestaurant,
  useCreateRestaurantMutation,
} from "../../redux/api/resturant.api";
import Button from "../button";
import Input from "../Input/input";

const CreateRestaurant = () => {
  const [mutate, { isLoading, data, isSuccess, error }] =
    useCreateRestaurantMutation();

  const schema = z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .refine((data) => data.trim() !== "", {
        message: "Name cannot be an empty string",
      }),

    address: z
      .string({
        required_error: "Address is required",
        invalid_type_error: "Address must be a string",
      })
      .refine((data) => data.trim() !== "", {
        message: "Address cannot be an empty string",
      }),
  });

  type Schema = z.infer<typeof schema>;

  const { register, handleSubmit, formState } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  const onSubmit = async (data: Schema) => {
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
        <div className="flex flex-col mt-2 relative">
          <p className="error">{errors.name?.message}</p>
          <Input
            placeholder={"enter restaurant name"}
            {...register("name")}
            label="Name of restaurant"
            type="text"
          />
        </div>

        <div className="flex flex-col mt-2 relative">
          <p className="error">{errors.address?.message}</p>
          <Input
            placeholder={"enter restaurant address"}
            {...register("name")}
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
