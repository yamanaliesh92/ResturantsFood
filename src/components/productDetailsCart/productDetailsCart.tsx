import { FC, useEffect, useState } from "react";
import { IProductData } from "../../sataic/product.data";
import { RxCross1 } from "react-icons/rx";
import {
  AiOutlineShoppingCart,
  AiOutlineMessage,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart.action";
import { toast } from "react-toastify";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist.action";
import { IResponseOrder } from "../../redux/api/order.api";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dataProduct: IResponseOrder;
}

const ProductDetailsCart: FC<IProps> = ({ open, setOpen, dataProduct }) => {
  console.log("DDDDDDDDDddd");
  const [count, setCount] = useState<number>(1);
  const [select, setSelect] = useState<boolean>(false);
  const [click, setClick] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { cart } = useSelector((state: any) => state.cart);

  const { wishlist } = useSelector((state: any) => state.wishlist);

  const removeFromWishlistHandler = (data: any) => {
    setClick((prev) => !prev);
    dispatch(removeFromWishlist(dataProduct) as any);
  };

  const addToWishlistHandler = (data: any) => {
    console.log("hello in wish list", { data });
    setClick((prev) => !prev);
    dispatch(addToWishlist(dataProduct) as any);
  };

  const addToCartHandler = (id: number) => {
    console.log("cart", { cart });
    const isItemExists = cart && cart.find((i: any) => i.id === id);
    if (isItemExists) {
      console.log("already exist");
      toast.error("Item already in cart!");
    } else {
      if (dataProduct.id < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...dataProduct, qty: count };
        dispatch(addToCart(cartData) as any);
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i: any) => i.id === dataProduct.id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [dataProduct.id, wishlist]);

  return (
    <div className="bg- bg-red-300">
      {dataProduct ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={25}
              className="absolute right-3 top-3 z-50 mb-2"
              onClick={() => setOpen(false)}
            />

            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img src={dataProduct.imgOrder} alt="ss" />
                <div className="flex">
                  <Link to={`/shop/preview/${dataProduct.id}`} className="flex">
                    <img
                      src={dataProduct.imgOrder}
                      alt="sss"
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                    <div>
                      <h3 className="text-[18px] bg-red-400">
                        {dataProduct.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">
                        {/* {dataProduct?.ratings} Ratings */}
                        Rating
                      </h5>
                    </div>
                  </Link>
                </div>
                <div
                  className="'w-[150px  my-3 flex items-center justify-center  cursor-pointer bg-[#000] mt-4 rounded-[4px] h-11"
                  // onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-[16px] text-[red] mt-5">(50) Sold out</h5>
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className="text-[25px] font-[600] font-Roboto text-[#333]">
                  {dataProduct.name}
                </h1>
                <p>{dataProduct.description}</p>

                <div className="flex pt-3">
                  <h4 className="font-bold text-[18px] text-[#333] font-Roboto">
                    {/* {dataProduct.discountPrice}$ */}
                    11dis
                  </h4>
                  <h3 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
                    {/* {dataProduct.originalPrice
                      ? dataProduct.originalPrice + "$"
                      : null} */}
                    22$
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(dataProduct)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(dataProduct)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className="'w-[150px] bg-black  my-3  justify-center  cursor-pointer mt-6 rounded-[4px] h-11 flex items-center"
                  onClick={() => addToCartHandler(dataProduct.id)}
                >
                  <span className="text-[#fff] flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCart;
