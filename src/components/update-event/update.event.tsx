import { HiPhotograph } from "react-icons/hi";
import DateTimePicker from "react-datetime-picker";

import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";

import React, { ChangeEvent, FC, useRef, useState } from "react";
import {
  IResponseEvent,
  useUpdateEventMutation,
} from "../../redux/api/event.api";
interface IProps {
  data: IResponseEvent;
  setOpen: React.Dispatch<
    React.SetStateAction<{
      id: number;
      open: boolean;
    }>
  >;
}

interface IPayloadUpdateEvent {
  name: string;
  oldPrice: number;
  date: Date;
  newPrice: number;
  description: string;
  category: string;
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
  //   const [open, setOpen] = useState(false);

  const [date, setDate] = useState<Date | null>(null);

  const close = () => {
    setOpen((prev) => ({ id: 0, open: false }));
  };

  //   const inputRef = useRef<HTMLInputElement>(null);
  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return "";
    }
    const value = e.target.files[0];
    setFile(value);
  };

  //   const openImg = () => {
  //     setOpen((prev) => !prev);
  //     inputRef.current?.click();
  //   };

  //   const { mutateAsync } = useMutation({
  //     mutationFn: UpdateCarApi,
  //     onSuccess: () => {
  //       client.invalidateQueries({ queryKey: ["allCar"] });
  //       {
  //         !open && close();
  //       }
  //     },
  //   });

  //   const { mutateAsync: mutateAsyncImg } = useMutation({
  //     mutationFn: UpdateImgCarApi,
  //     onSuccess: () => {
  //       client.invalidateQueries({ queryKey: ["allCar"] });
  //       close();
  //       toast("update is doen");
  //     },
  //   });

  const [mutate, { isLoading, isSuccess }] = useUpdateEventMutation();

  if (isSuccess) {
    close();
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      name: element.name,
      newPrice: element.newPrice,
      oldPrice: element.oldPrice,
      category: element.category,
      description: element.description,
      date: date && date.toISOString(),
    };

    await mutate({ id: data.id, payload: body });

    const form = new FormData();
    if (!file) {
      return;
    }
    form.append("img", file);
  };

  const onChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof IPayloadUpdateEvent,
    isNumber: boolean
  ) => {
    const value = isNumber ? e.target.valueAsNumber : e.target.value;
    setElement((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const [openCategory, setOpenCategory] = useState(false);

  const changeOpenCategory = () => {
    setOpenCategory((prev) => !prev);
  };

  return (
    <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
      <div className="bg  bg-white p-4 w-[270px]  sm:w-[500px] h-[460px] rounded-md shadow-sm flex flex-col relative ">
        <div className="block sm:flex sm:justify-between mt-2">
          <h1 className="text-red-500 font-bold text-2xl">update your event</h1>
          <h1 onClick={close}>X</h1>
        </div>
        <form className="mt-4 flex flex-col" onSubmit={onSubmit}>
          <div className="mt-2">
            <input
              required
              onChange={(e) => onChange(e, "name", false)}
              value={element.name}
              className="w-full block relative p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2 relative">
            <input
              value={element.oldPrice}
              type={"number"}
              onChange={(e) => onChange(e, "oldPrice", true)}
              className="w-[40%] block relative  p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />

            <input
              value={element.newPrice}
              type={"number"}
              onChange={(e) => onChange(e, "newPrice", true)}
              className="w-[40%] block relative  p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mt-2">
            <DateTimePicker
              data-cy="dateInput"
              onChange={setDate as any}
              value={data.date}
            />
          </div>

          <div className="mt-2">
            <input
              onChange={(e) => onChange(e, "category", false)}
              value={element.category}
              className="w-full block relative p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mt-2 relative">
            <textarea
              value={element.description}
              rows={3}
              onChange={(e) =>
                setElement({ ...element, description: e.target.value })
              }
              className="w-full block relative  p-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
            <HiPhotograph size={25} onClick={() => inputRef.current?.click()} />
          </div>

          {isLoading && <h1>loading.....</h1>}

          <div className="mt-4 block sm:flex sm:justify-between">
            <button
              onClick={close}
              className="w-fit mb-2 sm:mb-0 h-[40px] py-2 px-4 flex justify-center border border-transparent font-medium text-white rounded-md bg-blue-500 hover:bg-blue-700"
            >
              cancel
            </button>

            <button
              className="w-fit mr-0 sm:mr-4 h-[40px] py-2 px-4 flex justify-center border border-transparent font-medium text-white rounded-md bg-blue-500 hover:bg-blue-700"
              type={"submit"}
            >
              update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
