import DashboardSideBar from "../components/dashboardSideBar/dashboradSideBar";

const ShopDashboardPage = () => {
  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <div className="w-[330px] h-screen">
          <DashboardSideBar active={1} />
        </div>
      </div>
    </div>
  );
};
export default ShopDashboardPage;
