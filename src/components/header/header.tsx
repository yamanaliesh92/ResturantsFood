import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

import { CgProfile } from "react-icons/cg";

import { ChangeEvent, FC, useState } from "react";

import Navbar from "../navbar/navbar";
import { Link, useNavigate } from "react-router-dom";

import CartProduct from "../cartOrder/cartOrder";
import WhishList from "../whishlist/whishlist";
import { useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  IResponseRestaurant,
  useAllRestaurantQuery,
} from "../../redux/api/resturant.api";
import { IResponseOrder, useAllOrdersQuery } from "../../redux/api/order.api";
import { IStateRedux } from "../../redux/store";

interface IProps {
  activeHeading: number;
}

interface ISearch {
  text: string;
}

const initSearch: ISearch = {
  text: "",
};

const Header: FC<IProps> = ({ activeHeading }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [searchValue, setSearchValue] = useState<ISearch>(initSearch);
  const [data, setData] = useState<IResponseOrder[]>([]);
  const { data: dataAllOrder, isLoading } = useAllOrdersQuery({});

  const [dataSearchRestaurant, setDataSearchRestaurant] = useState<
    IResponseRestaurant[]
  >([]);
  const [openWhishList, setOpenWhishList] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);

  const [searchRestaurant, setSearchRestaurant] = useState("");

  const { data: dataAllRestaurant, error } = useAllRestaurantQuery({});

  const onChangeSearchRestaurant = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchRestaurant(e.target.value);
    const filleter = dataAllRestaurant?.filter((item) =>
      item.name.toLocaleUpperCase().includes(searchRestaurant)
    );
    setDataSearchRestaurant(filleter as IResponseRestaurant[]);
  };

  const wishlist = useSelector(
    (state: IStateRedux) => state.wishlist.whishItem
  );
  const cart = useSelector((state: IStateRedux) => state.cart.cartItem);

  const navigate = useNavigate();

  const changeOpenCart = () => {
    setOpenMenu(false);
    setOpenCart((prev) => !prev);
  };

  const changeOpenWhishList = () => {
    console.log("wishlist", { openWhishList });
    setOpenMenu(false);
    setOpenWhishList((prev) => !prev);
  };

  const search = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue({ text: e.target.value });
    const searchText =
      dataAllOrder &&
      dataAllOrder.filter((pr) =>
        pr.name.toLowerCase().includes(searchValue.text)
      );
    if (!searchText) return;
    setData(searchText);
  };

  return (
    <>
      <div className="w-11/12 mx-auto my-auto">
        <div className="h-[50px] my-[20px]  flex items-center justify-between">
          <Link to={"/"}>
            <img
              src={"https://shopo.quomodothemes.website/assets/images/logo.svg"}
              alt="logo"
              className="w-[60px] sm:w-[140px]"
            />
          </Link>

          {isLoading && <h1>loading....</h1>}

          {error && (
            <h1 className="text-[15px] text-red-400 my-2">
              {JSON.stringify(error)}
            </h1>
          )}

          <div className="w-[50%] relative">
            <input
              type={"text"}
              value={searchValue.text}
              onChange={search}
              placeholder="search product..."
              className="h-[40px] placeholder:text-[13px] sm:placeholder:text-[17px] outline-none border-none w-full border-[#3957db] border-[2px] rounded-md"
            />
            {data && data.length !== 0 && searchValue.text ? (
              <div className="absolute h-auto bg-slate-200 p-4 z-10 shadow-sm">
                {data.map((item) => {
                  return (
                    <Link to={`/products/${item.id}`}>
                      <div className="w-full flex items-center  py-3">
                        <img
                          src={item.imgOrder}
                          alt="dd"
                          className="mr-2 rounded-full h-[45px] w-[45px]"
                        />
                        <h1>{item.name}</h1>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="w-[50%] ml-4 relative">
            <input
              type={"text"}
              value={searchRestaurant}
              onChange={onChangeSearchRestaurant}
              placeholder="search restaurant..."
              className="h-[40px] placeholder:text-[13px] sm:placeholder:text-[17px] outline-none border-none w-full border-[#3957db] border-[2px] rounded-md"
            />
            {dataSearchRestaurant && dataSearchRestaurant.length !== 0 ? (
              <div className="absolute h-auto bg-slate-200 p-4 z-10 shadow-sm">
                {dataSearchRestaurant.map((item) => {
                  return (
                    <Link to={`/restaurant/${item.id}`}>
                      <div
                        className="w-full flex items-center py-3"
                        onClick={() => setDataSearchRestaurant([])}
                      >
                        <h1>{item.name}</h1>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="transition flex items-center justify-between h-[70px] w-full bg-[#3321c8]">
        <div className="w-11/12 mx-auto my-auto flex items-center justify-between">
          <div className=" hidden sm:flex sm:items-center">
            <Navbar active={activeHeading} />
          </div>
          <RxHamburgerMenu
            size={20}
            cursor="pointer"
            className="block sm:hidden"
            onClick={() => setOpenMenu((prev) => !prev)}
          />

          <div className="flex">
            <div className="flex items-center">
              <div className="relative cursor-pointer ml-[15px]">
                <AiOutlineHeart
                  size={30}
                  onClick={changeOpenWhishList}
                  color="rgb(255,255,255/83%)"
                />
                <span className="flex items-center justify-center absolute right-0 top-0 rounded-full text-white bg-[#3bc177] w-4 h-4 top right p-0 m-0">
                  {wishlist.length}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="r relative cursor-pointer ml-[15px]">
                <AiOutlineShoppingCart
                  onClick={changeOpenCart}
                  size={30}
                  color="rgb(255,255,255/83%)"
                />
                <span className="flex items-center justify-center absolute right-0 top-0 rounded-full text-white bg-[#3bc177] w-4 h-4 top right p-0 m-0">
                  {cart.length}
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="relative cursor-pointer ml-[15px]">
                <CgProfile
                  size={30}
                  color="rgb(255,255,255/83%)"
                  className="cursor-pointer"
                  onClick={() => navigate("/profile")}
                />

                {openCart ? <CartProduct setOpenCart={setOpenCart} /> : null}
                {openWhishList ? (
                  <WhishList openWhishList={setOpenWhishList} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      {openMenu && (
        <div className="w-full transition-all ease-linear duration-300 h-[520px] fixed top-0 left-0 z-20 bg-gray-400 flex items-center flex-col ">
          <div
            onClick={() => setOpenMenu(false)}
            className="self-end mr-2 text-[25px] font-bold mt-4 cursor-pointer "
          >
            X
          </div>
          <Navbar active={activeHeading} />
        </div>
      )}
    </>
  );
};
export default Header;
