import React from "react";
import CreateOrder from "../components/create-order/create-order";

import DashboardSideBar from "../components/dashboardSideBar/dashboradSideBar";

const CreateOrderPage = () => {
  return (
    <div>
      <div className="flex w-full items-center justify-between bg-white dark:bg-dark">
        <div className=" w-[130px] sm:w-[330px] h-screen">
          <DashboardSideBar active={3} />
        </div>
        <div className="w-full flex items-center justify-center ">
          <CreateOrder />
        </div>
      </div>
    </div>
  );
};
export default CreateOrderPage;
