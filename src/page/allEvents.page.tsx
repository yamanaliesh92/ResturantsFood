import AllEvents from "../components/AllEvents/allEvents";

import DashboardSideBar from "../components/dashboardSideBar/dashboradSideBar";
const AllEventsPage = () => {
  return (
    <div className="flex w-full  justify-between">
      <div className="w-[330px]">
        <DashboardSideBar active={5} />
      </div>
      <div className="w-full">
        <AllEvents />
      </div>
    </div>
  );
};

export default AllEventsPage;
