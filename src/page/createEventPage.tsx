import React from "react";
import CreateEvent from "../components/createEvent/createEvent";

import DashboardSideBar from "../components/dashboardSideBar/dashboradSideBar";

const CreateEventPage = () => {
  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <div className="w-[330px] h-screen">
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
