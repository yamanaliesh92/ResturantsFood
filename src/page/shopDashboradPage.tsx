import React from "react";
import DashboardHeader from "../components/dashboard/dashboard";
import DashboardSideBar from "../components/dashboardSideBar/dashboradSideBar";

const ShopDashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex w-full items-center justify-between">
        <div className="w-[330px]">
          {/* 800px:w-[100px] */}
          <DashboardSideBar active={1} />
        </div>
      </div>
    </div>
  );
};
export default ShopDashboardPage;
