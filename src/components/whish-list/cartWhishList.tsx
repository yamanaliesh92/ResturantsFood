import React, { FC } from "react";

import { BsFillCartPlusFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { IResponseOrder } from "../../redux/api/order.api";
interface IProps {
  data: IResponseOrder;
  remove: (id: number) => void;
}
const CartWhishList: FC<IProps> = ({ data, remove }) => {
  return (
    <div className="flex items-center bg-blue-950 dark:bg-white justify-between  p-2">
      <div className="flex items-center">
        <img
          src={data.imgOrder}
          alt="dd"
          className=" w-[80px] rounded-md mr-2 h-[80px]"
        />

        <div className="flex items-center flex-col text-white dark:text-blue-950">
          <h1>{data.name}</h1>

          <h3 className="font-[600] text-white dark:text-[#d02222] text-[17px]">
            ${data.price}
          </h3>
        </div>
      </div>

      <RxCross1
        className="text-white mb-6   dark:text-blue-950"
        title="remove form wishlist"
        size={20}
        onClick={() => remove(data.id)}
      />
    </div>
  );
};

export default CartWhishList;
