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

  const form = useForm({
    defaultValues: {
      name: data.name,
      newPrice: data.newPrice,
      oldPrice: data.oldPrice,
      category: data.category,
      description: data.description,
      id: data.id,
    },
  });
  const { register, handleSubmit } = form;

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

  const onSubmit = async (data: IUpdate) => {
    const body = {
      name: element.name,
      newPrice: element.newPrice,
      oldPrice: element.oldPrice,
      category: element.category,
      description: element.description,
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
    <div className="fixed w-full h-screen top-0  left-0 bg-white dark:bg-blue-950 z-50 flex items-center justify-center">
      <div className="bg-blue-950  mt-1 dark:bg-white mb-1 h-[545px] overflow-y-auto  text-white dark:text-blue-950 p-2 w-[300px]  sm:w-[500px]  rounded-md shadow-sm flex flex-col relative ">
        {error && (
          <h1 className="text-[15px] text-red-400 my-2">
            {JSON.stringify(error)}
          </h1>
        )}
        {errorUpdateEvent && (
          <h1 className="text-[15px] text-red-400 my-2">
            {JSON.stringify(error)}
          </h1>
        )}

        <div className="p-2 flex justify-between mt-1">
          <h1 className="font-bold text-[18px] dark:text-blue-950 text-white">
            update your event
          </h1>
          <h1 onClick={close}>X</h1>
        </div>
        <form
          className="p-2 w-full  flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-2 flex flex-col">
            <Input {...register("name")} label="Name" type="text" />
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2 relative">
            <div className="mt-2 flex flex-col">
              <Input {...register("oldPrice")} label="OldPrice" type="number" />
            </div>
            <div className="mt-2 flex flex-col">
              <Input {...register("newPrice")} label="NewPrice" type="number" />
            </div>
          </div>

          <div className="mt-2 flex flex-col">
            <DateTimePicker
              data-cy="dateInput"
              onChange={setDate as any}
              className=" sm:w-[75%] bg-white text-blue-950 dark:bg-white dark:text-blue-950  mt-1  h-[55px] outline-0 text-sm  p-2 rounded-md placeholder-gray-400 "
              value={data.date}
            />
          </div>

          <div className="mt-2 flex flex-col">
            <Input
              {...register("category")}
              type="text"
              label="Category"
              name="category"
            />
          </div>

          <div className="mt-2 flex flex-col">
            <textarea
              rows={3}
              {...register("description")}
              className=" sm:w-[75%] bg-white text-blue-950 dark:bg-white dark:text-blue-950  mt-1  h-[55px] outline-0 text-sm  p-2 rounded-md placeholder-gray-400 "
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

          <div className="my-2 items-center flex">
            <h1 className="text-[15px] font-bold mr-3">
              click here to change your img Event
            </h1>
            <HiPhotograph size={25} onClick={openGallery} />
          </div>

          <div className="mt-2 block sm:flex sm:justify-between">
            <Button onClick={close}>cancel</Button>

            <Button isLoading={isLoading}>update</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
