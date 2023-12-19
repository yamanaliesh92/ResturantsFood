import React from "react";
import CreateEvent from "../components/createEvent/createEvent";

import DashboardHeader from "../components/dashboard/dashboard";
import DashboardSideBar from "../components/dashboardSideBar/dashboradSideBar";

const CreateEventPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex w-full items-center justify-between">
        <div className="w-[330px]">
          {/* 800px:w-[100px] */}
          <DashboardSideBar active={4} />
        </div>
        <div className="w-full flex items-center justify-center ">
          <CreateEvent />
        </div>
      </div>
    </div>
  );
};
export default CreateEventPage;
