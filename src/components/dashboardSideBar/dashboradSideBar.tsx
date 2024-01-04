import { FC } from "react";
import { RxDashboard } from "react-icons/rx";
import { FiShoppingBag } from "react-icons/fi";

import { AiOutlineFolderAdd } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";

import SideBarItem from "./SideBarItem";

interface IProps {
  active: number;
}

const DashboardSideBar: FC<IProps> = ({ active }) => {
  return (
    <div className="w-full bg-white h-full shadow-sm sticky z-10 left-0 top-0 overflow-y-scroll">
      <div className="w-full flex items-start flex-col sm:p-2 ">
        <SideBarItem
          link="/dashboard/orders"
          label="Orders"
          isActive={active === 2}
          icon={
            <FiShoppingBag
              className={`${active === 2 ? "text-[red]" : "text-[#555]"}`}
            />
          }
        />

        <SideBarItem
          link={"/dashboard/products/new"}
          label="New Order"
          isActive={active === 3}
          icon={
            <AiOutlineFolderAdd
              className={`${active === 3 ? "text-[red]" : "text-[#555]"}`}
            />
          }
        />

        <SideBarItem
          link={"/dashboard/events"}
          label="Events"
          isActive={active === 4}
          icon={
            <MdOutlineLocalOffer
              className={`${active === 4 ? "text-[red]" : "text-[#555]"}`}
            />
          }
        />

        <SideBarItem
          link={"/dashboard/events/new"}
          label="New Event"
          isActive={active === 5}
          icon={
            <AiOutlineFolderAdd
              className={`${active === 5 ? "text-[red]" : "text-[#555]"}`}
            />
          }
        />
      </div>
    </div>
  );
};

export default DashboardSideBar;
