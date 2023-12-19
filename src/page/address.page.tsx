import DashboardHeader from "../components/dashboard/dashboard";
import DashboardSideBar from "../components/dashboardSideBar/dashboradSideBar";

const AddressPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex w-full">
        <div className="w-[330px]">
          {/* 800px:w-[100px] */}
          <DashboardSideBar active={4} />
        </div>
        <div className="w-full"> {/* <Address /> */}</div>
      </div>
    </div>
  );
};

export default AddressPage;
