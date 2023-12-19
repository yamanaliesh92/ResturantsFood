import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart.action";
import { addToWishlist } from "../../redux/actions/wishlist.action";
import { IResponseOrder } from "../../redux/api/order.api";
import { IProductData } from "../../sataic/product.data";

interface IProps {
  data: IResponseOrder | undefined;
}

const ProductsDetails: FC<IProps> = ({ data }) => {
  const [count, setCount] = useState<number>(1);

  const { cart } = useSelector((state: any) => state.cart);
  const naviagte = useNavigate();
  const dispatch = useDispatch();

  const addToWishlistHandler = (data: any) => {
    dispatch(addToWishlist(data) as any);
  };

  if (!data) {
    console.log("no data");
  }
  const addToCartHandler = (id: number) => {
    console.log("cart", { cart });

    const isItemExists = cart && cart.find((i: any) => i.id === id);
    if (isItemExists) {
      console.log("already exist");
      toast.error("Item already in cart!");
    } else {
      if (data && data.price < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData) as any);
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const incrementCount = () => {
    setCount((prev) => prev + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className=" bg-white my-4 block sm:flex i sm:justify-between w-11/12 mx-auto sm:w-[80%]">
      <div className="flex flex-col w-[43%] p-3 ">
        <img src={data?.imgOrder} className="w-[70%] h-[270px] mt-4" alt="dd" />
      </div>
      <div className="flex w-[70%] flex-col p-2 mt-3">
        <div className="flex justify-between">
          <h2 className="font-bold text-[18px] mt-1 ml-2  text-[#333] font-Roboto">
            {data?.name}
          </h2>
          <h2 className="font-bold text-[18px] mt-1  text-[#333] font-Roboto">
            {data?.price}
          </h2>
        </div>
        <p className="text-[16px] p-4 my-4 h-[120px] overflow-auto bg-green-400 text-red-400">
          {data?.description}
        </p>
        <div className="flex items-center mt-12  pr-3">
          <button
            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
            onClick={decrementCount}
          >
            -
          </button>
          <span className="bg-gray-200 mx-1  text-gray-800 font-medium px-3 py-[8px]">
            {count}
          </span>
          <button
            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
            onClick={incrementCount}
          >
            +
          </button>
        </div>
        <div className="flex items-center mt-4">
          <button
            className="w-[150px]  bg-black text-white h-[50px]  rounded-xl cursor-pointer"
            // onClick={() => addToCartHandler(data?.id)}
          >
            Add to Cart
          </button>

          <button className="w-[150px]  bg-[#6443d1] ml-6 text-white h-[50px]  rounded-xl cursor-pointer">
            send message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
