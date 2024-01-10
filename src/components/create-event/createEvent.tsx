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

interface ICreateEvent {
  name: string;
  newPrice: string;
  oldPrice: string;
  description: string;
  category: string;
}

const CreateEvent = () => {
  const [img, setImg] = useState<File | null>(null);
  const inputImgRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState<Date>(new Date());

  const [restaurantId, setRestaurantId] = useState<number>(0);

  const [mutate, { isLoading, isSuccess, error }] = useCreateEventMutation();

  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      name: "",
      oldPrice: "",
      newPrice: "",
      category: "",
      description: "",
    },
  });
  const { register, handleSubmit, formState } = form;

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

  const onSubmit = async (data: ICreateEvent) => {
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
    <div className="w-[220px] sm:w-[350px]   md:w-[500px] my-2 shadow-md overflow-y-auto flex-col flex items-center h-fit rounded-[14px] bg-blue-950 dark:bg-white p-2">
      <h1 className="sm:text-[20px] text-white dark:text-blue-950 font-bold text-center">
        Create a Event
      </h1>

      {error && (
        <h1 className="text-[15px] text-red-500 mb-1">
          {JSON.stringify(error)}
        </h1>
      )}

      <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
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
        <div className="flex flex-col ">
          <p className="text-[15px] my-1  text-red-500">
            {errors.newPrice?.message}
          </p>
          <Input
            placeholder={"Enter your newPrice"}
            {...register("newPrice", {
              required: { value: true, message: "newPrice is required" },
            })}
            label="NewPrice"
            type="number"
          />
        </div>

        <div className="flex flex-col ">
          <p className="text-[15px] my-1  text-red-500">
            {errors.oldPrice?.message}
          </p>
          <Input
            placeholder={"Enter your oldPrice"}
            {...register("oldPrice", {
              required: { value: true, message: "oldPrice is required" },
            })}
            label="oldPrice"
            type="number"
          />
        </div>

        <div className="flex flex-col">
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
        <label className="text-[14px] text-white dark:text-blue-950  my-1">
          End of Event time
        </label>

        <div className="flex  flex-col w-[75%] items-center justify-center  mt-1  h-[55px] outline-0 text-sm bg-white text-blue-950 dark:bg-white dark:text-blue-950   border border-white dark:border-blue-950  rounded-md ">
          <DateTimePicker
            data-cy="dateInput"
            onChange={setDate as any}
            value={date}
            required
            className="text-[12px] w-full h-full rounded-md outline-0 text-sm bg-white text-blue-950 dark:bg-white dark:text-blue-950   border border-white dark:border-blue-950  border-none  sm:text-[17px] overflow-x-auto sm:overflow-visible"
          />
        </div>

        <div className="flex flex-col mt-1">
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
            rows={2}
            className="w-[75%] mt-1  h-[55px] outline-0 text-sm bg-white text-blue-950 dark:bg-white dark:text-blue-950   border border-white dark:border-blue-950 p-2 rounded-md placeholder:text-blue-950"
          />
        </div>

        <div className="hidden flex-col mt-1 ">
          <label className="text-[14px] text-white dark:text-blue-950">
            img of order
          </label>
          <input onChange={onChangeImg} ref={inputImgRef} type={"file"} />
        </div>

        <div
          className="mt-2 flex items-center  cursor-pointer"
          onClick={() => inputImgRef.current?.click()}
        >
          <HiPhotograph className="text-white dark:text-blue-950" size={25} />
          <h4 className="ml-4 text-white dark:text-blue-950">photo</h4>
        </div>

        <Button isLoading={isLoading}> create</Button>
      </form>
    </div>
  );
};

export default CreateEvent;
