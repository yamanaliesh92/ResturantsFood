import { FC } from "react";

import { ICartItemFromLocalStorage } from "../../redux/reducers/cart.reducer";

interface IProps {
  data: ICartItemFromLocalStorage;
  remove: (id: number) => void;
  decrease: (id: number) => void;
  addCart: (data: ICartItemFromLocalStorage) => void;
}

const CartSingle: FC<IProps> = ({ data, remove, decrease, addCart }) => {
  return (
    <div className="flex bg-blue-950 dark:bg-white  items-center justify-between p-2 ">
      <div className="flex flex-col items-center">
        <span
          onClick={() => addCart(data)}
          className="bg-[#e44343] cursor-pointer w-[25px] mb-1 h-[25px] flex items-center justify-center rounded-full "
        >
          +
        </span>
        <h1 className="text-white dark:text-blue-950">{data.cartQuantity} </h1>
        <span
          onClick={() => decrease(data.id)}
          className="bg-[#a7abb14f] mt-1 cursor-pointer w-[25px] h-[25px] flex items-center justify-center rounded-full"
        >
          -
        </span>
      </div>
      <img src={data.imgOrder} alt="dd" className=" w-[80px] h-[80px]" />
      <div className="flex items-center flex-col">
        <h1 className="text-white dark:text-blue-950">{data.name}</h1>
        <h3 className="font-[400] text-[15px] dark:text-blue-950 text-white">
          {data.price * data.cartQuantity} $
        </h3>{" "}
      </div>
      <h2
        className="text-white dark:text-blue-950"
        onClick={() => remove(data.id)}
      >
        X
      </h2>
    </div>
  );
};

export default CartSingle;
