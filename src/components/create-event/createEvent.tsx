import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { HiPhotograph } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";

import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { useCreateEventMutation } from "../../redux/api/event.api";
import Button from "../button";
import Input from "../Input/input";
import { useForm } from "react-hook-form";
import { SerializedError } from "@reduxjs/toolkit";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const CreateEvent = () => {
  const [img, setImg] = useState<File | null>(null);
  const inputImgRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState<Date>(new Date());

  const [restaurantId, setRestaurantId] = useState<number>(0);

  const [mutate, { isLoading, isSuccess, error }] = useCreateEventMutation();

  const navigate = useNavigate();

  const schema = z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .refine((data) => data.trim() !== "", {
        message: "Name cannot be an empty string",
      }),
    newPrice: z.coerce
      .number({
        required_error: "NewPrice is required",
        invalid_type_error: "NewPrice must be a number",
      })
      .int()
      .gte(1)
      .lte(99999),
    oldPrice: z.coerce
      .number({
        required_error: "OldPrice is required",
        invalid_type_error: "OldPrice must be a number",
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

  if (isSuccess) {
    navigate("/");
  }

  useEffect(() => {
    const id: number = localStorage.getItem("id")
      ? JSON.parse(localStorage.getItem("id") as string)
      : 0;
    setRestaurantId(id);
  }, []);

  const onSubmit = async (data: Schema) => {
    if (!img) return;
    const fromDate = new FormData();
    fromDate.append("name", data.name);
    fromDate.append("oldPrice", String(data.newPrice));
    fromDate.append("newPrice", String(data.oldPrice));
    fromDate.append("imgOrder", img);
    fromDate.append("date", date.toISOString());
    fromDate.append("description", data.description);
    fromDate.append("category", data.category);
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

  return (
    <div className="w-[235px] sm:w-[350px]   md:w-[500px] my-2 shadow-md overflow-y-auto flex-col flex items-center h-fit rounded-[14px] bg-dark dark:bg-white p-2">
      <h1 className="sm:text-[20px] text-white dark:text-dark font-bold text-center">
        Create a Event
      </h1>

      {error && <h1 className="error">{(error as SerializedError).message}</h1>}

      <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col relative">
          <p className="error">{errors.name?.message}</p>
          <Input
            placeholder={"Enter your name"}
            {...register("name")}
            label="Name"
            type="text"
          />
        </div>
        <div className="grid grid-cols-2 my-2 ">
          <div className="flex flex-col relative ">
            <p className="error">{errors.newPrice?.message}</p>
            <Input
              placeholder={"Enter your newPrice"}
              {...register("newPrice", { valueAsNumber: true })}
              label="NewPrice"
              type="number"
            />
          </div>

          <div className="flex flex-col relative ">
            <p className="error">{errors.oldPrice?.message}</p>
            <Input
              placeholder={"Enter your oldPrice"}
              {...register("oldPrice", { valueAsNumber: true })}
              label="OldPrice"
              type="number"
            />
          </div>
        </div>

        <div className="flex flex-col relative">
          <p className="error">{errors.category?.message}</p>
          <Input
            placeholder={"Enter your category"}
            {...register("category")}
            type="text"
            label="Category"
          />
        </div>
        <label className="text-[14px] text-white dark:text-dark  my-1">
          End of Event time
        </label>

        <div className="flex  flex-col w-[75%] items-center justify-center  mt-1  h-[55px] outline-0 text-sm bg-white text-dark dark:bg-white dark:text-dark   border border-white dark:border-dark  rounded-md ">
          <DateTimePicker
            data-cy="dateInput"
            onChange={setDate as any}
            value={date}
            required
            className="text-[12px] w-full h-full rounded-md outline-0 text-sm bg-white text-dark dark:bg-white dark:text-dark   border border-white dark:border-dark  border-none  sm:text-[17px] overflow-x-auto sm:overflow-visible"
          />
        </div>

        <div className="flex flex-col mt-1 relative">
          <p className="error">{errors.description?.message}</p>
          <label className="text-[14px] text-white dark:text-dark">
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Enter your description"
            rows={2}
            className="w-[75%] mt-1  h-[55px] outline-0 text-sm bg-white text-dark dark:bg-white dark:text-dark   border border-white dark:border-dark p-2 rounded-md placeholder:text-dark"
          />
        </div>

        <div className="hidden flex-col mt-1 ">
          <label className="text-[14px] text-white dark:text-dark">
            img of order
          </label>
          <input onChange={onChangeImg} ref={inputImgRef} type={"file"} />
        </div>

        <div
          className="mt-2 flex items-center  cursor-pointer"
          onClick={() => inputImgRef.current?.click()}
        >
          <HiPhotograph className="text-white dark:text-dark" size={25} />
          <h4 className="ml-4 text-white dark:text-dark">photo</h4>
        </div>

        <Button isLoading={isLoading}> create</Button>
      </form>
    </div>
  );
};

export default CreateEvent;
