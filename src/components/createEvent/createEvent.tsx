import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { HiPhotograph } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../redux/api/order.api";
import DateTimePicker from "react-datetime-picker";

import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { useCreateEventMutation } from "../../redux/api/event.api";

interface ICreateEvent {
  name: string;
  newPrice: number;
  oldPrice: number;
  description: string;
  category: string;
  // date: Date;
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

  const [mutate, { isLoading, isSuccess }] = useCreateEventMutation();

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
    <div className="w-[200px] sm:w-[350px]   md:w-[500px] my-2 shadow-md overflow-y-auto flex-col flex items-center justify-center  h-[750px] rounded-[4px] bg-white p-2">
      <h1 className="sm:text-[20px] font-bold text-center">Create a Event</h1>
      <form className="p-2 w-full flex flex-col" onSubmit={onSubmit}>
        <div className="flex flex-col mt-2">
          <label htmlFor="name">name of order</label>
          <input
            data-testid={"nameTest"}
            value={element.name}
            onChange={(e) => onChange(e, false, "name")}
            type={"text"}
            className="w-[75%] mt-2  h-[35px] outline-0  border border-gray-300 p-2  rounded-[3px] placeholder-gray-400 "
          />
        </div>

        <div className="g grid grid-cols-2 gap-2">
          <div className="f flex flex-col">
            <label htmlFor="name">old price for this order</label>
            <input
              data-testid={"nameTest"}
              value={element.oldPrice}
              onChange={(e) => onChange(e, true, "oldPrice")}
              type={"number"}
              className="w-[45%]  mt-2  h-[35px] outline-0  border border-gray-300 p-2  rounded-[3px] placeholder-gray-400 "
            />
          </div>
          <div className="f flex flex-col">
            <label htmlFor="name">new price </label>
            <input
              data-testid={"nameTest"}
              value={element.newPrice}
              onChange={(e) => onChange(e, true, "newPrice")}
              type={"number"}
              className="w-[45%]  mt-2  h-[35px] outline-0  border border-gray-300 p-2  rounded-[3px] placeholder-gray-400 "
            />
          </div>
        </div>

        {/* <div className="flex flex-col mt-2">
          <label htmlFor="name">price of order</label>
          <input
            data-testid={"nameTest"}
            value={element.oldPrice}
            onChange={(e) => onChange(e, true, "oldPrice")}
            type={"number"}
            className="w-[75%]  mt-2  h-[35px] outline-0  border border-gray-300 p-2  rounded-[3px] placeholder-gray-400 "
          />
        </div> */}

        <div className="flex flex-col mt-2">
          <label htmlFor="name">category</label>
          <input
            data-testid={"nameTest"}
            value={element.category}
            onChange={(e) => onChange(e, false, "category")}
            type={"text"}
            className="w-[75%]  mt-2  h-[35px] p-4 outline-0  border border-gray-300   rounded-[3px] placeholder-gray-400 "
          />
        </div>

        <div className="flex  flex-col w-[75%] mt-2">
          <label htmlFor="name">End of Event time</label>
          <DateTimePicker
            data-cy="dateInput"
            onChange={setDate as any}
            value={date}
            required
          />
        </div>

        <div className="flex flex-col mt-3">
          <label htmlFor="price">description</label>
          <textarea
            value={element.description}
            onChange={(e) =>
              setElement({ ...element, description: e.target.value })
            }
            rows={3}
            className="w-[90%] mt-2  h-[55px] outline-0  border border-gray-300 p-2  rounded-[3px] placeholder-gray-400  focus:border-blue-500 "
          />
        </div>

        <div className="hidden flex-col mt-2 ">
          <label htmlFor="Img">img of order</label>
          <input
            onChange={onChangeImg}
            ref={inputImgRef}
            type={"file"}
            data-testid={"imgTest"}
            className="w-full mt-2  h-[35px] outline-0  border border-gray-300 p-2  rounded-[3px] placeholder-gray-400 "
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

        {isLoading && <h1>loading .....</h1>}
        <button
          data-testid={"submitTest"}
          className="w-[90px]  sm:w-[120px] md:w-[190px] flex items-center justify-center text-yellow-50 mt-4 bg-black h-[50px] my-3  rounded-xl cursor-pointer"
        >
          create
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
