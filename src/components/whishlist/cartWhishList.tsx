import React, { FC } from "react";
import { ICartData } from "../../sataic/cart.data";
import { BsFillCartPlusFill } from "react-icons/bs";
interface IProps {
  data: any;
  remove: (data: any) => void;
}
const CartWhishList: FC<IProps> = ({ data, remove }) => {
  return (
    <div className="flex items-center justify-between  p-2">
      <h3 onClick={() => remove(data)}>x</h3>

      <div className="flex items-center">
        <img
          src={data.image_Url[0].url}
          alt="dd"
          className=" w-[80px] h-[80px]"
        />

        <div className="flex items-center flex-col">
          <h1>{data.name}</h1>

          <h3 className="font-[600] text-[#d02222] text-[17px]">
            ${data.discount_price}
          </h3>
        </div>
      </div>
      <BsFillCartPlusFill size={20} className="s justify-end" />
    </div>
  );
};

export default CartWhishList;
