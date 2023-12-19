import React, { FC } from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../sataic/navItem.data";

interface IProps {
  active: number;
}
const Navbar: FC<IProps> = ({ active }) => {
  return (
    <div className="block sm:flex sm:items-center">
      {navItems.map((it, index) => {
        return (
          <div className="mt-10 sm:mt-0">
            {/* <link
              to={it.url}
              className={`${
                active === index + 1 ? "text-[#17dd1f]" : "text-[#fff]"
              }`}
            ></link> */}
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
    </div>
  );
};

export default Navbar;
