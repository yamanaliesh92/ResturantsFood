import DashboardHeader from "../components/dashboard/dashboard";
import DashboardSideBar from "../components/dashboardSideBar/dashboradSideBar";
const AllCouponesPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex w-full items-center justify-between">
        <div className="w-[330px]">
          {/* 800px:w-[100px] */}
          <DashboardSideBar active={7} />
        </div>
        <div className="w-full flex items-center justify-center "></div>
      </div>
    </div>
  );
};

export default AllCouponesPage;
