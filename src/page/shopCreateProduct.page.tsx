import React from "react";
import CreateOrder from "../components/create-order/create-order";

import DashboardSideBar from "../components/dashboardSideBar/dashboradSideBar";

const ShopCreateOrderPage = () => {
  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <div className=" w-[120px] sm:w-[330px]">
          <DashboardSideBar active={4} />
        </div>
        <div className="w-full flex items-center justify-center ">
          <CreateOrder />
        </div>
      </div>
    </div>
  );
};
export default ShopCreateOrderPage;
