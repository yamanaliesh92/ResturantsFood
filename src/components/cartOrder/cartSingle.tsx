import { FC, useState } from "react";
import { toast } from "react-toastify";

interface IProps {
  // data: ICartData;
  data: any;
  remove: (data: any) => void;
  qunatiy: (data: any) => void;
}

const CartSingle: FC<IProps> = ({ data, remove, qunatiy }) => {
  const [value, setValue] = useState<number>(data.qty);

  const totalPrice = data.discount_price * value;

  const increment = (data: any) => {
    if (data.stock < value) {
      toast.error("product stock limited");
    }
    setValue(value + 1);

    const updateCart = { ...data, qty: value + 1 };
    qunatiy(updateCart);
  };

  const discrement = (data: any) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCart = { ...data, qty: value - 1 };
    qunatiy(updateCart);
  };

  return (
    <div className="flex items-center justify-between p-2 ">
      <div className="flex flex-col items-center">
        <span
          onClick={() => increment(data)}
          className="bg-[#e44343] cursor-pointer w-[25px] mb-1 h-[25px] flex items-center justify-center rounded-full "
        >
          +
        </span>
        {value}
        <span
          onClick={() => discrement(data)}
          className="bg-[#a7abb14f] mt-1 cursor-pointer w-[25px] h-[25px] flex items-center justify-center rounded-full"
        >
          -
        </span>
      </div>
      <img
        src={data.image_Url[0].url}
        alt="dd"
        className=" w-[80px] h-[80px]"
      />
      <div className="flex items-center flex-col">
        <h1>{data.name}</h1>
        <h3 className="font-[400] text-[15px] text-blue-400">
          ${data.discount_price}* {value}
        </h3>
        <h3 className="font-[600] text-[#d02222] text-[17px]">${totalPrice}</h3>
      </div>
      <button onClick={() => remove(data)}>X</button>
    </div>
  );
};

export default CartSingle;
