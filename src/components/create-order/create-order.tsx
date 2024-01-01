import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { HiPhotograph } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import {
  ICreateOrder,
  useCreateOrderMutation,
} from "../../redux/api/order.api";

const init: ICreateOrder = {
  name: "",
  price: 0,
  category: "",
  description: "",
  imgOrder: "",
  restaurantId: 0,
};
const CreateOrder = () => {
  const [element, setElement] = useState<ICreateOrder>(init);
  const [img, setImg] = useState<File | null>(null);
  const inputImgRef = useRef<HTMLInputElement>(null);
  const [mutate, { isLoading, isSuccess, error }] = useCreateOrderMutation();
  const [restaurantId, setRestaurantId] = useState<number>(0);

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
    fromDate.append("price", String(element.price));
    fromDate.append("imgOrder", img);
    fromDate.append("description", element.description);
    fromDate.append("category", element.category);
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

  const onChange = (
    e: ChangeEvent<HTMLInputElement>,
    isNumber: boolean,
    key: keyof ICreateOrder
  ) => {
    const value = isNumber ? e.target.valueAsNumber : e.target.value;
    setElement((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const navigate = useNavigate();

  if (isSuccess) {
    navigate("/");
  }

  return (
    <div className="w-[200px] sm:w-[350px]   md:w-[500px] my-2 shadow-md overflow-y-auto flex-col flex  items-center  h-[550px] rounded-[4px] bg-white p-2">
      <h1 className="sm:text-[20px] font-bold text-center">Create a order</h1>
      {isLoading && <h1>loading....</h1>}

      {error && (
        <h1 className="text-[15px] text-red-400 my-2">
          {JSON.stringify(error)}
        </h1>
      )}
      <form className="p-2 w-full flex flex-col" onSubmit={onSubmit}>
        <div className="flex flex-col mt-2">
          <label className="text-[14px]">name of order:</label>
          <input
            data-testid={"nameTest"}
            value={element.name}
            onChange={(e) => onChange(e, false, "name")}
            type={"text"}
            className="w-[75%] mt-2  h-[35px] outline-0  border border-gray-300 p-2  rounded-[3px] placeholder-gray-400 "
          />
        </div>

        <div className="flex flex-col mt-2">
          <label htmlFor="name">price of order</label>
          <input
            data-testid={"nameTest"}
            value={element.price}
            onChange={(e) => onChange(e, true, "price")}
            type={"number"}
            className="w-[75%]  mt-2  h-[35px] outline-0  border border-gray-300 p-2  rounded-[3px] placeholder-gray-400 "
          />
        </div>

        <div className="flex flex-col mt-2">
          <label className="text-[14px]">category:</label>
          <input
            value={element.category}
            onChange={(e) => onChange(e, false, "category")}
            type={"text"}
            className="w-[75%]  mt-2  h-[35px] p-4 outline-0  border border-gray-300   rounded-[3px] placeholder-gray-400 "
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
      </form>
    </div>
  );
};

export default CreateOrder;
