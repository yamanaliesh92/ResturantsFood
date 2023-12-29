import { FC } from "react";
import { RxDashboard } from "react-icons/rx";
import { FiShoppingBag } from "react-icons/fi";
import { FaAddressCard } from "react-icons/fa";
import { VscNewFile } from "react-icons/vsc";

import { AiOutlineFolderAdd } from "react-icons/ai";
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
        <Link to={"/dashboard"} className="flex items-center p-2 mb-3">
          <RxDashboard
            className={`  ${active === 1 ? "text-[red]" : "text-[#555]"}`}
          />
          <h3
            className={`${
              active === 1 ? "text-[red]" : "text-[#555]"
            } text-[12px] sm:text-[18px] font-bold text-bold ml-3`}
          >
            Dashboard
          </h3>
        </Link>

        <Link to={"/dashboard-allOrder"} className="flex items-center p-2 mb-3">
          <FiShoppingBag
            className={` ${active === 2 ? "text-[red]" : "text-[#555]"}`}
          />
          <h3
            className={`${
              active === 2 ? "text-[red]" : "text-[#555]"
            } text-[12px] sm:text-[18px] font-bold text-bold ml-3`}
          >
            AllOrder
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
            }  text-[12px] sm:text-[18px] text-bold ml-3`}
          >
            createOrder
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
          <FaAddressCard
            size={25}
            className={`${active === 7 ? "text-[red]" : "text-[#555]"}`}
          />
          <h3
            className={`${
              active === 7 ? "text-[red]" : "text-[#555]"
            } text-[12px] sm:text-[16px] font-bold text-bold ml-3`}
          >
            information of restaurant
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
