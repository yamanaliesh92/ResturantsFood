import AllEvents from "../components/All-events/allEvents";

import DashboardSideBar from "../components/dashboardSideBar/dashboradSideBar";
const AllEventsPage = () => {
  return (
    <div className="flex w-full  justify-between">
      <div className="w-[330px] h-screen">
        <DashboardSideBar active={5} />
      </div>
      <div className="w-full">
        <AllEvents owner={true} />
      </div>
    </div>
  );
};

export default AllEventsPage;
