import { toggle } from "../../redux/reducers/theme.reducer";
import { IStateRedux } from "../../redux/store";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { navItems } from "../../sataic/navItem.data";
import { BsFillSunFill } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";

interface IProps {
  active: number;
}

const Navbar: FC<IProps> = ({ active }) => {
  const [restaurantId, setRestaurantId] = useState<number>(0);

  const mode = useSelector((state: IStateRedux) => state.theme.mode);

  const dispatch = useDispatch();

  useEffect(() => {
    const id = localStorage.getItem("id")
      ? JSON.parse(localStorage.getItem("id") as any)
      : 0;
    setRestaurantId(id);
  }, []);

  useEffect(() => {
    mode === true
      ? window.document.documentElement.classList.add("dark")
      : window.document.documentElement.classList.remove("dark");
  }, [mode]);

  return (
    <div className="block sm:flex sm:items-center">
      {navItems.map((it, index) => {
        return (
          <div className="mt-10 sm:mt-0">
            <Link
              to={it.url}
              className={`${
                active === index + 1
                  ? "text-gray-800"
                  : "text-[#fff] dark:text-black"
              } font-[500] sm:text-[13px] md:text-[16px] ml-1 cursor-pointer sm:px-1 md:px-3 `}
            >
              {it.title}
            </Link>
          </div>
        );
      })}

      {restaurantId === 0 ? (
        <Link
          className="font-[500] sm:text-[12px] md:text-[14px] text-[#fff] dark:text-black ml-1 cursor-pointer sm:px-1 md:px-3"
          to={"/create-restaurant"}
        >
          Become seller
        </Link>
      ) : (
        <div className="flex flex-col mt-3 sm:mt-0 mr-0 sm:mr-2  sm:flex-row items-center ">
          <Link
            className="font-[500] mx-0 sm:mx-2 sm:text-[12px] md:text-[14px] text-[#fff]  dark:text-black cursor-pointer sm:px-1 md:px-3"
            to={"/dashboard/products/new"}
          >
            Create Order
          </Link>
          <Link
            className="font-[500] mt-10 sm:mt-0 sm:text-[12px] md:text-[14px] text-[#fff]  dark:text-black  cursor-pointer sm:px-1 md:px-3"
            to={"/dashboard/orders"}
          >
            To Dashboard
          </Link>
        </div>
      )}
      <button data-cy="darkModeButton" onClick={() => dispatch(toggle())}>
        {mode ? (
          <BsFillSunFill data-cy="lightMode" cursor={"pointer"} size={20} />
        ) : (
          <MdDarkMode data-cy="darkMode" cursor={"pointer"} size={20} />
        )}
      </button>
    </div>
  );
};

export default Navbar;
