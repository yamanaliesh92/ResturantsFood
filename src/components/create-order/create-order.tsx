import { zodResolver } from "@hookform/resolvers/zod";
import { SerializedError } from "@reduxjs/toolkit";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { HiPhotograph } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useCreateOrderMutation } from "../../redux/api/order.api";
import Button from "../button";
import Input from "../Input/input";

const CreateOrder = () => {
  const [img, setImg] = useState<File | null>(null);
  const inputImgRef = useRef<HTMLInputElement>(null);
  const [mutate, { isLoading, isSuccess, error }] = useCreateOrderMutation();
  const [restaurantId, setRestaurantId] = useState<number>(0);

  const schema = z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .refine((data) => data.trim() !== "", {
        message: "Name cannot be an empty string",
      }),
    price: z.coerce
      .number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
      })
      .int()
      .gte(1)
      .lte(99999),
    category: z
      .string({
        required_error: "Category is required",
        invalid_type_error: "Category must be a string",
      })
      .refine((data) => data.trim() !== "", {
        message: "Category cannot be an empty string",
      }),

    description: z
      .string({
        required_error: "Description is required",
        invalid_type_error: "Description must be a string",
      })
      .refine((data) => data.trim() !== "", {
        message: "Description cannot be an empty string",
      }),
  });

  type Schema = z.infer<typeof schema>;

  const { register, handleSubmit, formState } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  console.log("error", errors.name);

  useEffect(() => {
    const id: number = localStorage.getItem("id")
      ? JSON.parse(localStorage.getItem("id") as string)
      : 0;
    setRestaurantId(id);
  }, []);

  const onSubmit = async (body: Schema) => {
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
    <div className="w-[234px] sm:w-[350px]   md:w-[550px] my-1 shadow-md overflow-y-auto flex-col flex  items-center h-fit rounded-[14px] bg-dark dark:bg-white p-2">
      <h1 className="sm:text-[20px] text-white dark:text-dark font-bold text-center">
        New Order
      </h1>
      {error && <h1 className="error">{(error as SerializedError).message}</h1>}

      <form
        className="p-2 w-full flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col mt-2 relative">
          <p className="error">{errors.name?.message}</p>
          <Input
            placeholder={"Enter your name"}
            {...register("name")}
            label="Name"
            type="text"
          />
        </div>

        <div className="flex flex-col mt-2 relative">
          <p className="error">{errors.price?.message}</p>
          <Input
            placeholder={"Enter your price"}
            {...register("price", { valueAsNumber: true })}
            type="number"
            label="Price"
          />
        </div>

        <div className="flex flex-col mt-2 relative">
          <p className="error">{errors.category?.message}</p>
          <Input
            placeholder={"Enter your category"}
            {...register("category")}
            type="text"
            label="Category"
          />
        </div>

        <div className="flex flex-col mt-2 relative">
          <p className="error">{errors.description?.message}</p>
          <label className="text-[14px] text-white dark:text-dark">
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Enter your description"
            rows={3}
            className="w-[75%] mt-1  h-[55px] outline-0 text-sm bg-white text-dark dark:bg-white dark:text-dark   border border-white dark:border-dark p-2 rounded-md placeholder:text-dark   "
          />
        </div>

        <div className="hidden flex-col mt-2 ">
          <input onChange={onChangeImg} type="file" ref={inputImgRef} />
        </div>

        <div
          className="mt-2 flex items-center  cursor-pointer"
          onClick={() => inputImgRef.current?.click()}
        >
          <HiPhotograph size={25} className="text-white dark:text-dark" />
          <h4 className="ml-4 text-[14px] text-white dark:text-dark">photo</h4>
        </div>

        <Button isLoading={isLoading}>Create</Button>
      </form>
    </div>
  );
};

export default CreateOrder;
