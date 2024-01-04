import { FC } from "react";
import { RxPerson } from "react-icons/rx";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/user.reducer";
import { removeCookie } from "../../utils/cookie";
import { useNavigate } from "react-router-dom";

interface IProps {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}

const ProfileSide: FC<IProps> = ({ active, setActive }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutFn = () => {
    setActive(2);
    removeCookie("MyToken");
    removeCookie("MyRefreshToken");
    navigate("/auth");

    dispatch(logout);
  };
  return (
    <div className="w-[60px] sm:w-full bg-white shadow-sm rounded-[10px] p-4  ">
      <div
        className="flex items-center cursor-pointer w-full mb-5"
        onClick={() => setActive(1)}
      >
        <RxPerson
          size={25}
          color={active === 1 ? "red" : "black"}
          className=" mr-3 group:"
        />
        <span className={`${active === 1 ? "text-[red]" : "text-black"}  `}>
          Profile
        </span>
      </div>

      <div
        onClick={logoutFn}
        className="flex items-center cursor-pointer w-full mb-5"
      >
        <AiOutlineLogout
          size={20}
          color={active === 2 ? "red" : ""}
          className="mr-3"
        />
        <div className={`hidden sm:block${active === 8 ? "text-[red]" : ""}`}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default ProfileSide;
