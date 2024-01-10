import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { HiPhotograph } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../redux/api/order.api";
import Button from "../button";
import Input from "../Input/input";

export type ICreateOrders = {
  name: string;
  price: string;
  category: string;
  description: string;
};
const CreateOrder = () => {
  const [img, setImg] = useState<File | null>(null);
  const inputImgRef = useRef<HTMLInputElement>(null);
  const [mutate, { isLoading, isSuccess, error }] = useCreateOrderMutation();
  const [restaurantId, setRestaurantId] = useState<number>(0);

  const form = useForm({
    defaultValues: {
      name: "",
      price: "",
      category: "",
      description: "",
    },
  });
  const { register, handleSubmit, formState } = form;

  const { errors } = formState;

  useEffect(() => {
    const id: number = localStorage.getItem("id")
      ? JSON.parse(localStorage.getItem("id") as string)
      : 0;
    setRestaurantId(id);
  }, []);

  const onSubmit = async (body: ICreateOrders) => {
    if (!img) return;
    const fromDate = new FormData();
    fromDate.append("name", body.name);
    fromDate.append("price", String(body.price));
    fromDate.append("imgOrder", img);
    fromDate.append("description", body.description);
    fromDate.append("category", body.category);
    fromDate.append("restaurantId", String(restaurantId));

    await mutate(fromDate as any);
  };

  const onChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const value = e.target.files[0];
    setImg(value);
  };

  const navigate = useNavigate();

  if (isSuccess) {
    navigate("/");
  }

  return (
    <div className="w-[200px] sm:w-[350px]   md:w-[550px] my-1 shadow-md overflow-y-auto flex-col flex  items-center h-fit rounded-[14px] bg-blue-950 dark:bg-white p-2">
      <h1 className="sm:text-[20px] text-white dark:text-blue-950 font-bold text-center">
        New Order
      </h1>
      {error && (
        <h1 className="text-center text-red-500"> {JSON.stringify(error)}</h1>
      )}

      <form
        className="p-2 w-full flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col mt-2">
          <p className="text-[15px] my-1  text-red-500">
            {errors.name?.message}
          </p>
          <Input
            placeholder={"Enter your name"}
            {...register("name", {
              required: { value: true, message: "name is required" },
            })}
            label="Name"
            type="text"
          />
        </div>

        <div className="flex flex-col mt-2">
          <p className="text-[15px] my-1  text-red-500">
            {errors.price?.message}
          </p>
          <Input
            placeholder={"Enter your price"}
            {...register("price", {
              min: 1,
              required: { value: true, message: "price is required" },
            })}
            type="number"
            label="Price"
          />
        </div>

        <div className="flex flex-col mt-2">
          <p className="text-[15px] my-1  text-red-500">
            {errors.category?.message}
          </p>
          <Input
            placeholder={"Enter your category"}
            {...register("category", {
              required: { value: true, message: "category is required" },
            })}
            type="text"
            label="Category"
          />
        </div>

        <div className="flex flex-col mt-2">
          <p className="text-[15px] my-1  text-red-500">
            {errors.description?.message}
          </p>
          <label className="text-[14px] text-white dark:text-blue-950">
            Description
          </label>
          <textarea
            {...register("description", {
              required: { value: true, message: "description is required" },
            })}
            placeholder="Enter your description"
            rows={3}
            className="w-[75%] mt-1  h-[55px] outline-0 text-sm bg-white text-blue-950 dark:bg-white dark:text-blue-950   border border-white dark:border-blue-950 p-2 rounded-md placeholder:text-blue-950   "
          />
        </div>

        <div className="hidden flex-col mt-2 ">
          <input onChange={onChangeImg} type="file" ref={inputImgRef} />
        </div>

        <div
          className="mt-2 flex items-center  cursor-pointer"
          onClick={() => inputImgRef.current?.click()}
        >
          <HiPhotograph size={25} className="text-white dark:text-blue-950" />
          <h4 className="ml-4 text-[14px] text-white dark:text-blue-950">
            photo
          </h4>
        </div>

        <Button isLoading={isLoading}>Create</Button>
      </form>
    </div>
  );
};

export default CreateOrder;
