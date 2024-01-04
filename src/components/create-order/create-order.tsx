import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { HiPhotograph } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ICreateOrder,
  useCreateOrderMutation,
} from "../../redux/api/order.api";
import Button from "../button";
import Input from "../Input/input";

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
    if (error) {
      toast.error("Something went wrong, Please reload the page");
    }
  }, [error]);

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
      <h1 className="sm:text-[20px] font-bold text-center">New Order</h1>

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
            value={element.price}
            onChange={(e) => onChange(e, true, "price")}
            name="price"
            type="number"
            label="Price"
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

        <Button isLoading={isLoading}>Create</Button>
      </form>
    </div>
  );
};

export default CreateOrder;
