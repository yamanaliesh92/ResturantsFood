import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { HiPhotograph } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../redux/api/order.api";
import DateTimePicker from "react-datetime-picker";

import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { useCreateEventMutation } from "../../redux/api/event.api";
import Button from "../button";
import Input from "../Input/input";

interface ICreateEvent {
  name: string;
  newPrice: number;
  oldPrice: number;
  description: string;
  category: string;

  imgOrder: string;
}
const init: ICreateEvent = {
  name: "",
  description: "",
  oldPrice: 0,
  newPrice: 0,
  imgOrder: "",
  category: "",
};
const CreateEvent = () => {
  const [img, setImg] = useState<File | null>(null);
  const inputImgRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [element, setElement] = useState<ICreateEvent>(init);
  const [restaurantId, setRestaurantId] = useState<number>(0);

  const [mutate, { isLoading, isSuccess, error }] = useCreateEventMutation();

  const navigate = useNavigate();

  if (isSuccess) {
    navigate("/");
  }

  useEffect(() => {
    const id = localStorage.getItem("id")
      ? JSON.parse(localStorage.getItem("id") as any)
      : 0;
    setRestaurantId(id);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!img) return;
    const fromDate = new FormData();
    fromDate.append("name", element.name);
    fromDate.append("oldPrice", String(element.newPrice));
    fromDate.append("newPrice", String(element.oldPrice));
    fromDate.append("imgOrder", img);
    fromDate.append("date", date.toISOString());
    fromDate.append("description", element.description);
    fromDate.append("category", element.category);
    fromDate.append("restaurantId", restaurantId as any);

    await mutate(fromDate as any);
  };

  const onChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const value = e.target.files[0];
    setImg(value);
  };

  const onChange = (
    e: ChangeEvent<HTMLInputElement>,
    isNumber: boolean,
    key: keyof ICreateEvent
  ) => {
    const value = isNumber ? e.target.valueAsNumber : e.target.value;
    setElement((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  return (
    <div className="w-[220px] sm:w-[350px]   md:w-[500px] my-2 shadow-md overflow-y-auto flex-col flex items-center   h-[750px] rounded-[4px] bg-white p-2">
      <h1 className="sm:text-[20px] font-bold text-center">Create a Event</h1>

      {error && (
        <h1 className="text-[15px] text-red-400 my-2">
          {JSON.stringify(error)}
        </h1>
      )}

      <form className="p-2 w-full flex flex-col" onSubmit={onSubmit}>
        <div className="flex flex-col mt-2">
          <Input
            value={element.name}
            onChange={(e) => onChange(e, false, "name")}
            label="Name"
            name="name"
            type="text"
          />
        </div>
        <div className="flex flex-col mt-3">
          <Input
            value={element.oldPrice}
            onChange={(e) => onChange(e, true, "oldPrice")}
            name="oldPrice"
            type="number"
            label="oldPrice of order"
          />
        </div>

        <div className="flex flex-col mt-3">
          <Input
            value={element.newPrice}
            onChange={(e) => onChange(e, true, "newPrice")}
            name="newPrice"
            type="number"
            label="newPrice of order"
          />
        </div>

        <div className="flex flex-col mt-3">
          <Input
            value={element.category}
            onChange={(e) => onChange(e, false, "category")}
            name="category"
            type="text"
            label="Category"
          />
        </div>

        <div className="flex  flex-col w-[75%] mt-2">
          <label className="text-[14px] mb-2">End of Event time</label>

          <DateTimePicker
            data-cy="dateInput"
            onChange={setDate as any}
            value={date}
            required
            className="text-[12px]  sm:text-[17px] overflow-x-auto sm:overflow-visible"
          />
        </div>

        <div className="flex flex-col mt-3">
          <textarea
            value={element.description}
            placeholder="Order Description"
            onChange={(e) =>
              setElement({ ...element, description: e.target.value })
            }
            rows={3}
            className="w-[90%] mt-2  h-[55px] outline-0  border border-gray-300 p-2  rounded-[3px] placeholder-gray-400  focus:border-blue-500 "
          />
        </div>

        <div className="hidden flex-col mt-2 ">
          <label className="text-[14px]">img of order</label>
          <input
            onChange={onChangeImg}
            ref={inputImgRef}
            type={"file"}
            data-testid={"imgTest"}
          />
        </div>

        <div
          className="mt-4 flex items-center  cursor-pointer"
          onClick={() => inputImgRef.current?.click()}
        >
          <HiPhotograph size={25} />
          <h4 className="ml-4">photo</h4>
        </div>

        <Button> create</Button>
      </form>
      {/* <form className="p-2 w-full flex flex-col" onSubmit={onSubmit}>
        <div className="flex flex-col my-2">
          <label className="text-[14px]">name of order:</label>
          <input
            data-testid={"nameTest"}
            value={element.name}
            onChange={(e) => onChange(e, false, "name")}
            type={"text"}
            className="w-[75%]   h-[35px] outline-0  border border-gray-300 p-2  rounded-[3px] placeholder-gray-400 "
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <label className="sm:text-[14px]">old price</label>
            <input
              data-testid={"nameTest"}
              value={element.oldPrice}
              onChange={(e) => onChange(e, true, "oldPrice")}
              type={"number"}
              className="w-full    h-[35px] outline-0  border border-gray-300 p-2  rounded-[3px] placeholder-gray-400 "
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[14px]">new price: </label>
            <input
              data-testid={"nameTest"}
              value={element.newPrice}
              onChange={(e) => onChange(e, true, "newPrice")}
              type={"number"}
              className="w-full   h-[35px] outline-0  border border-gray-300 p-2  rounded-[3px] placeholder-gray-400 "
            />
          </div>
        </div>

        <div className="flex flex-col mt-2">
          <label className="text-[14px]">category:</label>
          <input
            data-testid={"nameTest"}
            value={element.category}
            onChange={(e) => onChange(e, false, "category")}
            type={"text"}
            className="w-[75%]    h-[35px] p-4 outline-0  border border-gray-300   rounded-[3px] placeholder-gray-400 "
          />
        </div>

        <div className="flex  flex-col w-[75%] mt-2">
          <label className="text-[14px] mb-2">End of Event time</label>

          <DateTimePicker
            data-cy="dateInput"
            onChange={setDate as any}
            value={date}
            required
            className="text-[12px]  sm:text-[17px] overflow-x-auto sm:overflow-visible"
          />
        </div>

        <div className="flex flex-col mt-3">
          <label className="text-[14px]">description:</label>
          <textarea
            value={element.description}
            onChange={(e) =>
              setElement({ ...element, description: e.target.value })
            }
            rows={3}
            className="w-[90%]   h-[55px] outline-0  border border-gray-300 p-2  rounded-[3px] placeholder-gray-400  focus:border-blue-500 "
          />
        </div>

        <div className="hidden flex-col mt-2 ">
          <label className="text-[14px]">img of order:</label>
          <input
            onChange={onChangeImg}
            ref={inputImgRef}
            type={"file"}
            data-testid={"imgTest"}
          />
        </div>

        <div
          className="mt-4 flex flex-col cursor-pointer"
          onClick={() => inputImgRef.current?.click()}
          data-testid={"GallaryTest"}
        >
          <HiPhotograph size={25} />
          <h4>img Product</h4>
        </div>

        <button
          data-testid={"submitTest"}
          className="w-[90px]  sm:w-[120px] md:w-[190px] flex items-center justify-center text-yellow-50 mt-4 bg-black h-[50px] my-3  rounded-xl cursor-pointer"
        >
          create
        </button>
      </form> */}
    </div>
  );
};

export default CreateEvent;
