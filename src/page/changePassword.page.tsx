import ChangePassword from "../components/changePassword/changePassword";

import DashboardSideBar from "../components/dashboardSideBar/dashboradSideBar";

const ChangePasswordPage = () => {
  return (
    <div>
      <div className="flex w-full">
        <div className="w-[330px]">
          <DashboardSideBar active={4} />
        </div>
        <div className="w-full flex justify-center items-center">
          <ChangePassword />;
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
