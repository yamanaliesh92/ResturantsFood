import { FC } from "react";
import { Link } from "react-router-dom";

interface ISideBarItemProp {
  icon: JSX.Element;
  isActive: boolean;
  link: string;
  label: string;
}

const SideBarItem: FC<ISideBarItemProp> = ({ icon, isActive, label, link }) => {
  return (
    <Link to={link} className="flex items-center p-2 mb-3">
      {icon}
      <h3
        className={`${
          isActive ? "text-[red]" : "text-[#555]"
        } text-[12px] sm:text-[18px] font-bold text-bold ml-3`}
      >
        {label}
      </h3>
    </Link>
  );
};

export default SideBarItem;
