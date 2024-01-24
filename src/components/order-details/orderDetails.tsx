import { FC, useState } from "react";
import { useDispatch } from "react-redux";

import { IResponseOrder } from "../../redux/api/order.api";
import { addToCart } from "../../redux/reducers/cart.reducer";
import Button from "../button";

interface IProps {
  data: IResponseOrder | undefined;
}

const OrderDetails: FC<IProps> = ({ data }) => {
  const [count, setCount] = useState<number>(1);

  const dispatch = useDispatch();

  if (!data) {
    console.log("no data");
  }

  const addCart = (data: IResponseOrder) => {
    dispatch(addToCart({ ...data, cartQuantity: count }));
  };

  //   console.log("cart", { cart });

  //   const isItemExists = cart && cart.find((i: any) => i.id === id);
  //   if (isItemExists) {
  //     console.log("already exist");
  //     toast.error("Item already in cart!");
  //   } else {
  //     if (data && data.price < 1) {
  //       toast.error("Product stock limited!");
  //     } else {
  //       const cartData = { ...data, qty: 1 };
  //       dispatch(addToCart(cartData) as any);
  //       toast.success("Item added to cart successfully!");
  //     }
  //   }
  // };

  const incrementCount = () => {
    setCount((prev) => prev + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <>
      {data && (
        <div className=" dark:bg-white bg-dark my-4 block sm:flex i sm:justify-between w-11/12 mx-auto sm:w-[80%]">
          <div className="flex flex-col w-[43%] p-3 ">
            <img
              src={data?.imgOrder}
              className="w-[70%] rounded-md h-[270px] mt-4"
              alt="dd"
            />
          </div>
          <div className="flex w-[70%] flex-col p-2 mt-3">
            <div className="flex justify-between">
              <h2 className="font-bold text-[18px] text-white dark:text-dark mt-1 ml-2">
                {data?.name}
              </h2>
              <h2 className="font-bold text-[18px] mt-1 text-white dark:text-dark mr-3">
                {data?.price}
              </h2>
            </div>
            <p className="text-[16px] p-4 my-4 h-[120px] overflow-auto text-white dark:text-dark mt">
              {data?.description}
            </p>
            <div className="flex items-center mt-12  pr-3">
              <button
                className="text-white font-bold rounded-l px-4 py-2 dark:bg-gray-500 bg-yellow-300 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                onClick={decrementCount}
              >
                -
              </button>
              <span className="bg-gray-200 mx-1  text-gray-800 font-medium px-3 py-[8px]">
                {count}
              </span>
              <button
                className=" dark:bg-gray-500 bg-yellow-300  text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                onClick={incrementCount}
              >
                +
              </button>
            </div>
            <div className="flex items-center mt-4">
              <Button onClick={() => addCart(data)}>Add to Cart</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
