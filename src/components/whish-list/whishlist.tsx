import { FC } from "react";
import { BsBagDash } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

import { IResponseOrder } from "../../redux/api/order.api";
import { removeFromWishlist } from "../../redux/reducers/wishlist.reducer";

import CartWhishList from "./cartWhishList";

interface IProps {
  openWhishList: React.Dispatch<React.SetStateAction<boolean>>;
}

const WhishList: FC<IProps> = ({ openWhishList }) => {
  const wishlist: IResponseOrder[] = useSelector(
    (state: any) => state.wishlist.whishItem
  );
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (id: number) => {
    dispatch(removeFromWishlist({ id: id }));
  };
  return (
    <div className="fixed top-0 right-0  bg-white dark:bg-blue-950 w-[20%] sm:w-[35%] z-10 min-h-screen">
      <div className="flex flex-col ">
        <div className="flex justify-end p-4">
          <RxCross1
            className="dark:text-white text-blue-950"
            size={25}
            onClick={() => openWhishList(false)}
          />
        </div>
        <div className="flex items-center p-2">
          <BsBagDash className="dark:text-white text-blue-950" size={20} />
          <h2 className="d pl-2 text-[20px] font-bold dark:text-white text-blue-950">
            {wishlist.length} Item
          </h2>
        </div>
        {wishlist.map((item) => {
          return (
            <div className="w-full border-t border-t-blue-950 dark:border-t-white">
              <CartWhishList data={item} remove={removeFromWishlistHandler} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhishList;
