import { HiPhotograph } from "react-icons/hi";
import DateTimePicker from "react-datetime-picker";

import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";

import React, { ChangeEvent, FC, useRef, useState } from "react";
import {
  IResponseEvent,
  useUpdateEventImgMutation,
  useUpdateEventMutation,
} from "../../redux/api/event.api";
import Input from "../Input/input";
import { useForm } from "react-hook-form";
import Button from "../button";
import { SerializedError } from "@reduxjs/toolkit";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
interface IProps {
  data: IResponseEvent;
  setOpen: React.Dispatch<
    React.SetStateAction<{
      id: number;
      open: boolean;
    }>
  >;
}

interface IUpdate {
  name: string;
  oldPrice: number;
  newPrice: number;
  id: number;
  category: string;
  description: string;
}
const UpdateEvent: FC<IProps> = ({ data, setOpen }) => {
  const init = {
    name: data.name,
    newPrice: data.newPrice,
    category: data.category,
    oldPrice: data.oldPrice,
    description: data.description,
  };

  const [element, setElement] = useState(init);
  const [file, setFile] = useState<File | null>(null);
  const [openUpdateImg, setOpenUpdateImg] = useState(false);

  const [mutateUpdateImg, { isSuccess: isSuccessUpdateImg, isLoading, error }] =
    useUpdateEventImgMutation();

  const [date, setDate] = useState<Date | null>(null);

  const close = () => {
    setOpen((prev) => ({ id: 0, open: false }));
  };

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
    defaultValues: {
      name: data.name,
      newPrice: data.newPrice,
      oldPrice: data.oldPrice,
      category: data.category,
      description: data.description,
    },
  });

  const { errors } = formState;

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return "";
    }
    const value = e.target.files[0];
    setFile(value);
  };

  const openGallery = () => {
    setOpenUpdateImg(true);
    inputRef.current?.click();
  };

  const [mutate, { error: errorUpdateEvent, isSuccess }] =
    useUpdateEventMutation();

  if (isSuccessUpdateImg) {
    setOpen((prev) => ({ ...prev, open: !prev.open }));
  }

  if (isSuccess) {
    close();
  }

  const onSubmit = async (body: Schema) => {
    const dto = {
      name: body.name,
      newPrice: body.newPrice,
      oldPrice: body.oldPrice,
      category: body.category,
      description: body.description,
      date: date && date.toISOString(),
    };

    await mutate({ id: data.id, payload: body });

    const formData = new FormData();
    formData.append("imgOrder", file as any);

    openUpdateImg &&
      (await mutateUpdateImg({ id: data.id, img: formData as any }));
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm  h-screen top-0   left-0 flex items-center justify-center">
      <div className="bg-dark  mt-1 dark:bg-white mb-1 h-fit   text-white dark:text-dark p-2 w-[300px]  sm:w-[500px]  rounded-md shadow-sm flex flex-col relative ">
        {error && (
          <h1 className="error">{(error as SerializedError).message}</h1>
        )}
        {errorUpdateEvent && <h1 className="error">{JSON.stringify(error)}</h1>}

        <h1 className="text-end text-2xl mr-2" onClick={close}>
          X
        </h1>

        <form
          className="p-2 w-full  flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-2 flex flex-col relative">
            <h1 className="error">{errors.name?.message}</h1>
            <Input {...register("name")} label="Name" type="text" />
          </div>

          <div className="mt-2 flex items-center  relative">
            <div className="mt-2 flex flex-col relative">
              <h1 className="error">{errors.oldPrice?.message}</h1>
              <Input {...register("oldPrice")} label="OldPrice" type="number" />
            </div>
            <div className="mt-2 flex flex-col relative">
              <h1 className="error">{errors.newPrice?.message}</h1>
              <Input {...register("newPrice")} label="NewPrice" type="number" />
            </div>
          </div>

          <div className="mt-2 flex flex-col relative">
            <h1>End Time of event</h1>
            <DateTimePicker
              data-cy="dateInput"
              onChange={setDate as any}
              className=" sm:w-[75%] bg-white text-dark dark:bg-white dark:text-dark  mt-1  h-[55px] outline-0 text-sm  p-2 rounded-md placeholder-gray-400 "
              value={data.date}
            />
          </div>

          <div className="mt-2 flex flex-col relative">
            <h1 className="error">{errors.category?.message}</h1>
            <Input
              {...register("category")}
              type="text"
              label="Category"
              name="category"
            />
          </div>

          <div className="mt-2 flex flex-col relative">
            <h1 className="error">{errors.description?.message}</h1>
            <h1>Description</h1>
            <textarea
              rows={3}
              {...register("description")}
              className=" sm:w-[75%] bg-white text-dark dark:bg-white dark:text-dark  mt-1  h-[55px] outline-0 text-sm  p-2 rounded-md placeholder-gray-400 "
            />
          </div>
          <div className="none">
            <input
              ref={inputRef}
              onChange={onChangeFile}
              type={"file"}
              className="p-2 bg-white hidden rounded-md focus:outline-none"
              placeholder="jdj"
            />
          </div>

          <div className="mt-4 items-center flex">
            <h1 className="text-[15px] font-bold mr-3">
              click here to change your img Event
            </h1>
            <HiPhotograph size={25} onClick={openGallery} />
          </div>

          <Button isLoading={isLoading}>update</Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
