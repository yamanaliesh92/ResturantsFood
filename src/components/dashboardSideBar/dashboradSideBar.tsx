import { FC } from "react";
import { RxDashboard } from "react-icons/rx";
import { FiShoppingBag } from "react-icons/fi";
import { FaAddressCard } from "react-icons/fa";
import { VscNewFile } from "react-icons/vsc";
import { HiReceiptRefund } from "react-icons/hi";
import { BiPackage, BiMessageSquareDetail } from "react-icons/bi";

import { CiMoneyBill, CiSettings } from "react-icons/ci";

import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";

import { Link } from "react-router-dom";
import { CgPassword } from "react-icons/cg";

interface IProps {
  active: number;
}

const DashboardSideBar: FC<IProps> = ({ active }) => {
  return (
    <div className="w-full bg-white h-full shadow-sm sticky z-10 left-0 top-0 overflow-y-scroll">
      <div className="w-full flex items-start flex-col sm:p-2 ">
        <Link to={"/dashboard"} className="flex items-center sm:p-2 mb-3">
          <RxDashboard
            className={` text-[14px] sm:text-[25px] ${
              active === 1 ? "text-[red]" : "text-[#555]"
            }`}
          />
          <h3
            className={`${
              active === 1 ? "text-[red]" : "text-[#555]"
            } text-[12px] sm:text-[18px] font-bold text-bold ml-3`}
          >
            Dashboard
          </h3>
        </Link>

        <Link
          to={"/dashboard-allOrder"}
          className="flex items-center sm:p-2 mb-3"
        >
          <FiShoppingBag
            className={`text-[14px] sm:text-[25px] ${
              active === 2 ? "text-[red]" : "text-[#555]"
            }`}
          />
          <h3
            className={`${
              active === 2 ? "text-[red]" : "text-[#555]"
            } text-[12px] sm:text-[18px] font-bold text-bold ml-3`}
          >
            AllOrder
            {/* here in h3 800px:hidden and all h3 like that */}
          </h3>
        </Link>

        <Link
          to={"/dashboard-allProduct"}
          className="flex items-center p-2 mb-3"
        >
          <BiPackage
            size={25}
            className={`${active === 3 ? "text-[red]" : "text-[#555]"}`}
          />
          <h3
            className={`${
              active === 3 ? "text-[red]" : "text-[#555]"
            } text-[12px] sm:text-[18px] font-bold text-bold ml-3`}
          >
            AllProduct
          </h3>
        </Link>

        <Link
          to={"/dashboard-createProduct"}
          className="flex items-center p-2 mb-3"
        >
          <AiOutlineFolderAdd
            size={25}
            className={`${active === 4 ? "text-[red]" : "text-[#555]"}`}
          />
          <h3
            className={`${
              active === 4 ? "text-[red]" : "text-[#555]"
            } text-[18px] text-bold ml-3`}
          >
            createProduct
          </h3>
        </Link>

        <Link
          to={"/dashboard-allEvents"}
          className="flex items-center p-2 mb-3"
        >
          <MdOutlineLocalOffer
            size={25}
            className={`${active === 5 ? "text-[red]" : "text-[#555]"}`}
          />
          <h3
            className={`${
              active === 5 ? "text-[red]" : "text-[#555]"
            } text-[12px] sm:text-[18px] font-bold text-bold ml-3`}
          >
            AllEvents
          </h3>
        </Link>

        <Link
          to={"/dashboard-createEvent"}
          className="flex items-center p-2 mb-3"
        >
          <VscNewFile
            size={25}
            className={`${active === 6 ? "text-[red]" : "text-[#555]"}`}
          />
          <h3
            className={`${
              active === 6 ? "text-[red]" : "text-[#555]"
            } text-[12px] sm:text-[18px] font-bold text-bold ml-3`}
          >
            CreateEvent
          </h3>
        </Link>

        <Link to={"/dashboard/resInfo"} className="flex items-center p-2 mb-3">
          <CiMoneyBill
            size={25}
            className={`${active === 7 ? "text-[red]" : "text-[#555]"}`}
          />
          <h3
            className={`${
              active === 7 ? "text-[red]" : "text-[#555]"
            } text-[12px] sm:text-[18px] font-bold text-bold ml-3`}
          >
            WithDrawMoney
          </h3>
        </Link>

        <Link to={"/dashboard-message"} className="flex items-center p-2 mb-3">
          <BiMessageSquareDetail
            size={25}
            className={`${active === 8 ? "text-[red]" : "text-[#555]"}`}
          />
          <h2
            className={`${
              active === 8 ? "text-[red]" : "text-[#555]"
            } text-[18px] text-bold ml-3`}
          >
            ShopInbox
          </h2>
        </Link>

        <Link to={"/dashboard-Coupon "} className="flex items-center p-2 mb-3">
          <AiOutlineGift
            size={25}
            className={`${active === 9 ? "text-[red]" : "text-[#555]"}`}
          />
          <h3
            className={`${
              active === 9 ? "text-[red]" : "text-[#555]"
            } text-[18px] text-bold ml-3`}
          >
            Discount Code
          </h3>
        </Link>

        <Link to={"/dashboard-refund"} className="flex items-center p-2 mb-3">
          <HiReceiptRefund
            size={25}
            className={`${active === 10 ? "text-[red]" : "text-[#555]"}`}
          />
          <h3
            className={`${
              active === 10 ? "text-[red]" : "text-[#555]"
            } text-[18px] text-bold ml-3`}
          >
            Refund
          </h3>
        </Link>

        <Link to={"/dashboard-setting"} className="flex items-center p-2 mb-3">
          <CiSettings
            size={25}
            className={`${active === 11 ? "text-[red]" : "text-[#555]"}`}
          />
          <h3
            className={`${
              active === 11 ? "text-[red]" : "text-[#555]"
            } text-[18px] text-bold ml-3`}
          >
            Refund
          </h3>
        </Link>

        <Link to={"/dashboard-address"} className="flex items-center p-2 mb-3">
          <FaAddressCard
            size={25}
            className={`${active === 12 ? "text-[red]" : "text-[#555]"}`}
          />
          <h3
            className={`${
              active === 12 ? "text-[red]" : "text-[#555]"
            } text-[18px] text-bold ml-3`}
          >
            address
          </h3>
        </Link>

        <Link
          to={"/dashboard-changePassword"}
          className="flex items-center p-2 mb-3"
        >
          <CgPassword
            size={25}
            className={`${active === 13 ? "text-[red]" : "text-[#555]"}`}
          />
          <h3
            className={`${
              active === 13 ? "text-[red]" : "text-[#555]"
            } text-[18px] text-bold ml-3`}
          >
            change_Password
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSideBar;
