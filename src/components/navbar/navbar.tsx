import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../sataic/navItem.data";

interface IProps {
  active: number;
}
const Navbar: FC<IProps> = ({ active }) => {
  const [restaurantId, setRestaurantId] = useState<number>(0);

  useEffect(() => {
    const id = localStorage.getItem("id")
      ? JSON.parse(localStorage.getItem("id") as any)
      : 0;
    setRestaurantId(id);
  }, []);
  return (
    <div className="block sm:flex sm:items-center">
      {navItems.map((it, index) => {
        return (
          <div className="mt-10 sm:mt-0">
            <Link
              to={it.url}
              className={`${
                active === index + 1 ? "text-[#17dd1f]" : "text-[#fff]"
              } font-[500] sm:text-[13px] md:text-[16px] ml-1 cursor-pointer sm:px-1 md:px-3 `}
            >
              {it.title}
            </Link>
          </div>
        );
      })}

      {restaurantId === 0 ? (
        <Link
          className="font-[500] sm:text-[12px] md:text-[14px] text-[#fff] ml-1 cursor-pointer sm:px-1 md:px-3"
          to={"/create-restaurant"}
        >
          Become seller
        </Link>
      ) : (
        <div className="flex flex-col mt-3 sm:mt-0 mr-0 sm:mr-2  sm:flex-row items-center ">
          <Link
            className="font-[500] mx-0 sm:mx-2 sm:text-[12px] md:text-[14px] text-[#fff] m1cursor-pointer sm:px-1 md:px-3"
            to={"/dashboard-createProduct"}
          >
            create order
          </Link>
          <Link
            className="font-[500] mt-10 sm:mt-0 sm:text-[12px] md:text-[14px] text-[#fff]  cursor-pointer sm:px-1 md:px-3"
            to={"/dashboard"}
          >
            to dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
