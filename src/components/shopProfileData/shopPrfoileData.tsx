import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { reviewData } from "../../sataic/allReview.data";
import { productData } from "../../sataic/product.data";
import ProductsData from "../productData/productData";

interface IProps {
  isOwner: boolean;
}
const ShopProfileData: FC<IProps> = ({ isOwner }) => {
  const [active, setActive] = useState<number>(0);
  return (
    <div className="w-full p-4 flex  flex-col">
      <div className="flex items-center justify-between my-4">
        <div className="flex items-center">
          <div className="flex items-center mr-5 " onClick={() => setActive(1)}>
            <h4
              className={`${
                active === 1 ? "text-red-500" : "text-[#333]"
              } font-bold cursor-pointer`}
            >
              Shop Product
            </h4>
          </div>

          <div className="flex items-center mr-5" onClick={() => setActive(2)}>
            <h4
              className={`${
                active === 2 ? "text-red-500" : "text-[#333]"
              } font-bold cursor-pointer`}
            >
              Running Events
            </h4>
          </div>

          <div className="flex items-center mr-5" onClick={() => setActive(3)}>
            <h4
              className={`${
                active === 3 ? "text-red-500" : "text-[#333]"
              } font-bold cursor-pointer`}
            >
              Review
            </h4>
          </div>
        </div>
        {isOwner && (
          <Link
            to={"/dashboard"}
            className="w-[190px] flex items-center justify-center text-yellow-50 mt-1 bg-black h-[50px] my-3  rounded-xl cursor-pointer"
          >
            Go to Dashboard
          </Link>
        )}
      </div>

      {active === 1 && (
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 grid-[22px] lg:grid-cols-4 grid-[26px] xl:grid-cols-5 xl:grid-[30px] border-0">
          {productData.map((item) => {
            // return <ProductsData data={item} />;
            return "a";
          })}
        </div>
      )}

      {active === 2 && <div>get event that create it befor</div>}

      {active === 3 && (
        <div>
          {reviewData.map((commentRev) => {
            return (
              <div className="flex flex-col items-start p-3">
                <div className="flex items-center w-full bg-[#00000010] ">
                  <img
                    src={commentRev.image_Url}
                    alt="dd"
                    className="w w-[50px] h-[50px] rounded-full object-cover mr-2"
                  />
                  <div className="flex flex-col w-auto h-auto p-2 ml-3 rounded-md">
                    <h1 className="font-[600]">{commentRev.username}</h1>
                    <p className="font-[400] text-[#000000a7]">
                      {commentRev.title}
                    </p>
                    <p className="text-[#000000a7] text-[14px]">2 days ago</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;
