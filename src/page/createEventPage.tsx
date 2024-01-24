import React from "react";
import CreateEvent from "../components/create-event/createEvent";

import DashboardSideBar from "../components/dashboardSideBar/dashboradSideBar";

const CreateEventPage = () => {
  return (
    <div>
      <div className="flex w-full  justify-between bg-white dark:bg-dark">
        <div className=" w-[120px]  sm:w-[330px] h-screen">
          <DashboardSideBar active={5} />
        </div>
        <div className="w-full flex items-center justify-center ">
          <CreateEvent />
        </div>
      </div>
    </div>
  );
};
export default CreateEventPage;
