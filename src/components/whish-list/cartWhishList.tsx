import React, { FC } from "react";

import { BsFillCartPlusFill } from "react-icons/bs";
import { IResponseOrder } from "../../redux/api/order.api";
interface IProps {
  data: IResponseOrder;
  remove: (id: number) => void;
}
const CartWhishList: FC<IProps> = ({ data, remove }) => {
  return (
    <div className="flex items-center justify-between  p-2">
      <h3 onClick={() => remove(data.id)}>x</h3>

      <div className="flex items-center">
        <img src={data.imgOrder} alt="dd" className=" w-[80px] h-[80px]" />

        <div className="flex items-center flex-col dark:text-white">
          <h1>{data.name}</h1>

          <h3 className="font-[600] text-[#d02222] text-[17px] dark:text-white">
            ${data.price}
          </h3>
        </div>
      </div>
      <BsFillCartPlusFill size={20} className="s justify-end" />
    </div>
  );
};

export default CartWhishList;
