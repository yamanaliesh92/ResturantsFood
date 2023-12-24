import DashboardSideBar from "../components/dashboardSideBar/dashboradSideBar";
import MyOrders from "../components/my-order/my-order";

export default function MyOrdersPage() {
  return (
    <div>
      <div className="flex w-full  justify-between">
        <div className="w-[120px] h-screen sm:w-[330px]">
          <DashboardSideBar active={2} />
        </div>
        <div className="w-full flex bg-white ">
          <MyOrders />
        </div>
      </div>
    </div>
  );
}
