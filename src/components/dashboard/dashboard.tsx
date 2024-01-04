import { AiOutlineGift } from "react-icons/ai";
import { Link } from "react-router-dom";
import imgProduct from "../../img/photo.jpeg";
import { BiPackage, BiMessageSquareDetail } from "react-icons/bi";

import { MdOutlineLocalOffer, MdOutlineShoppingBag } from "react-icons/md";

const DashboardHeader = () => {
  return (
    <div className="w-full h-[80px] shadow bg-white sticky left-0 top-0 z-10 p-3 flex items-center justify-between">
      <Link to={"/dashboard"}>
        <img
          src={"https://shopo.quomodothemes.website/assets/images/logo.svg"}
          alt="logo"
        />
      </Link>

      <div className="flex items-center">
        <Link to={"/dashboard/cupouns"}>
          <AiOutlineGift size={25} className="mr-3 cursor-pointer" />
        </Link>
        <Link to={"/dashboard/all-events"}>
          <MdOutlineLocalOffer size={25} className="mr-3 cursor-pointer" />
        </Link>
        <Link to={"/dashboard/product"}>
          <MdOutlineShoppingBag size={25} className="mr-3 cursor-pointer" />
        </Link>
        <Link to={"/dashboard/order"}>
          <BiPackage size={25} className="mr-3 cursor-pointer" />
        </Link>
        <Link to={"/dashboard-message"}>
          <BiMessageSquareDetail size={25} className="mr-3 cursor-pointer" />
        </Link>
        <Link to={"/shop"}>
          <img
            src={imgProduct}
            alt="d"
            className="w-[60px] h-[60px] rounded-full"
          />
        </Link>
        dd
      </div>
    </div>
  );
};

export default DashboardHeader;
