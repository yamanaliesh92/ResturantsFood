import { FC, useEffect } from "react";
import { BsBagDash } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseCart,
  getTotal,
  ICartItemFromLocalStorage,
  removeFromCart,
} from "../../redux/reducers/cart.reducer";

import CartSingle from "./cartSingle";

interface IProps {
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartOrder: FC<IProps> = ({ setOpenCart }) => {
  const cart: ICartItemFromLocalStorage[] = useSelector(
    (state: any) => state.cart.cartItem
  );
  const cartTotalAmount = useSelector(
    (state: any) => state.cart.cartTotalAmount
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const addCart = (data: ICartItemFromLocalStorage) => {
    dispatch(addToCart(data));
  };

  const removeFromCartHandler = (id: number) => {
    dispatch(removeFromCart({ id: id }));
  };

  const decrease = (id: number) => {
    dispatch(decreaseCart({ id: id }));
  };

  return (
    <div className="fixed top-0 right-0 overflow-y-scroll  bg-white w-[25%] sm:w-[35%] z-10 min-h-screen">
      <div className="flex flex-col ">
        <div className="flex justify-end p-4">
          <RxCross1 size={25} onClick={() => setOpenCart(false)} />
        </div>
        <div className="flex items-center p-2">
          <BsBagDash size={20} />
          <h2 className="pl-2 text-[20px] font-bold">{cart.length} items</h2>
        </div>
        {cart.map((item) => {
          return (
            <div className="border-t">
              <CartSingle
                data={item}
                remove={removeFromCartHandler}
                decrease={decrease}
                addCart={addCart}
              />
            </div>
          );
        })}
      </div>
      <div className="mb-3 mt-2 flex items-center justify-center p-2 bg-[#d02222] h-[40px] w-full rounded-[5px]">
        <h1 className="font-[600] text-[15px] text-white">{cartTotalAmount}</h1>
      </div>
    </div>
  );
};

export default CartOrder;
