import { FC } from "react";
import { RxPerson } from "react-icons/rx";
import {
  AiOutlineMessage,
  AiOutlineCreditCard,
  AiOutlineLogout,
} from "react-icons/ai";
import { MdTrackChanges } from "react-icons/md";

import { ImAddressBook } from "react-icons/im";

import { HiOutlineShoppingBag, HiOutlineReceiptRefund } from "react-icons/hi";

interface IProps {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}

const ProfileSide: FC<IProps> = ({ active, setActive }) => {
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
        className="flex items-center cursor-pointer w-full mb-5"
        onClick={() => setActive(4)}
      >
        <AiOutlineMessage
          size={20}
          color={active === 4 ? "red" : ""}
          className="mr-3"
        />
        <span className={`${active === 4 ? "text-[red]" : ""}`}>Refund</span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-5"
        onClick={() => setActive(5)}
      >
        <MdTrackChanges
          size={20}
          color={active === 5 ? "red" : ""}
          className="mr-3"
        />
        <span className={` hidden sm:block${active === 5 ? "text-[red]" : ""}`}>
          Track Order
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-5"
        onClick={() => setActive(6)}
      >
        <AiOutlineCreditCard
          size={20}
          color={active === 6 ? "red" : ""}
          className="mr-3"
        />
        <span
          className={` hidden sm:block${
            active === 6 ? "text-[red]" : ""
          }800px:block hidden`}
        >
          Payment method
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-5"
        onClick={() => setActive(7)}
      >
        <ImAddressBook
          size={20}
          color={active === 7 ? "red" : ""}
          className="mr-3"
        />
        <span className={` hidden sm:block${active === 7 ? "text-[red]" : ""}`}>
          Address
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-5"
        onClick={() => setActive(8)}
      >
        <AiOutlineLogout
          size={20}
          color={active === 8 ? "red" : ""}
          className="mr-3"
        />
        <span className={`hidden sm:block${active === 8 ? "text-[red]" : ""}`}>
          Logout
        </span>
      </div>
    </div>
  );
};

export default ProfileSide;
