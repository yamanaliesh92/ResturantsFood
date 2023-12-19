import { Modal } from "@mantine/core";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Await } from "react-router-dom";
import { IResponseEvent } from "../../redux/api/event.api";
import {
  IResponseOrder,
  IResponseProduct,
  IUpdateOrder,
  useUpdateOrderMutation,
} from "../../redux/api/order.api";
import { IProductData } from "../../sataic/product.data";

interface IProps {
  data: IResponseOrder;
  activeOpen: string;
  open: {
    open: boolean;
    id: number;
  };
  setOpen: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      id: number;
    }>
  >;
}

const UpdateOrderModal: FC<IProps> = ({ open, data, setOpen }) => {
  const init: IUpdateOrder = {
    category: data.category,
    description: data.description,
    name: data.name,
    price: data.price,
  };

  const [update, setUpdate] = useState(init);

  const [mutate, { isLoading, isSuccess }] = useUpdateOrderMutation();

  const onChange = (
    e: ChangeEvent<HTMLInputElement>,
    isNumber: boolean,
    key: keyof IUpdateOrder
  ) => {
    const value = isNumber ? e.target.valueAsNumber : e.target.value;
    setUpdate((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  if (isSuccess) {
    setOpen((prev) => ({ id: 0, open: false }));
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body: IUpdateOrder = {
      category: update.category,
      description: update.description,
      name: update.name,
      price: update.price,
    };

    await mutate({ id: data.id, payload: body });
    setOpen((prev) => ({ ...prev, open: !prev.open }));
  };

  const cancel = () => {
    setOpen((prev) => ({ ...prev, open: !prev.open }));
  };

  return (
    <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
      <div className="bg  bg-white p-4 w-[270px]  sm:w-[500px] h-[500px] rounded-md shadow-sm flex flex-col relative ">
        <h1 className="d text-center mt-2">update product</h1>
        <form className="mt-4" onSubmit={submit}>
          <div className="mt-2">
            <input
              value={update.name}
              onChange={(e) => onChange(e, false, "name")}
              className="w-full block relative  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mt-3 relative">
            <input
              value={update.category}
              onChange={(e) => onChange(e, false, "category")}
              className="w-full block relative  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mt-3 relative">
            <input
              value={update.price}
              type={"number"}
              onChange={(e) => onChange(e, true, "price")}
              className="w-full block relative  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mt-3 relative">
            <textarea
              value={update.description}
              onChange={(e) =>
                setUpdate({ ...update, description: e.target.value })
              }
              rows={3}
              className="w-full block relative  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mt-4 block sm:flex sm:justify-between">
            <button
              onClick={cancel}
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

export default UpdateOrderModal;
