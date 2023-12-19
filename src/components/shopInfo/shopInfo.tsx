import { FC } from "react";
import imgProduct from "../../img/photo.jpeg";

interface IProps {
  isOwner: boolean;
}
const ShopInfo: FC<IProps> = ({ isOwner }) => {
  return (
    <div className="w-full p-2 flex flex-col">
      <div className="w-full flex items-center flex-col">
        <img
          src={imgProduct}
          alt="dd"
          className="w-[150px] h-[150px] rounded-full items-center"
        />
        <h3 className="text-[20px] text-center mt-1">Shampo</h3>
        <p className="text-[16px] mt-1 text-center text-[#000000a6]">
          djsajdsjdas ajdjad
        </p>
      </div>
      <div className="flex flex-col mt-2">
        <h4 className="font-[600] mr-3">Address</h4>
        <h5 className="text-[#000000a6]">sham</h5>
      </div>

      <div className="flex flex-col mt-2">
        <h4 className="font-[600] mr-3">Phone Number</h4>
        <h5 className="text-[#000000a6]">099 011 312</h5>
      </div>

      <div className="flex flex-col mt-2">
        <h4 className="font-[600] mr-3">Total Products</h4>
        <h5 className="text-[#000000a6]">10</h5>
      </div>

      <div className="flex flex-col mt-2">
        <h4 className="font-[600] mr-3">Shop Rating</h4>
        <h5 className="text-[#000000a6]">4/5</h5>
      </div>

      <div className="flex flex-col mt-2">
        <h4 className="font-[600] mr-3">Joined</h4>
        <h5 className="text-[#000000a6]">2002-5-5</h5>
      </div>
      {isOwner && (
        <>
          <div className="w-full bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer">
            <span className="text-white">Edit Product</span>
          </div>

          <div className="w-full mt-1 bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer">
            <span className="text-white">Logout</span>
          </div>
        </>
      )}
    </div>
  );
};

export default ShopInfo;
