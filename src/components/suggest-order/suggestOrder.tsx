import React, { FC } from "react";
import { IResponseOrder } from "../../redux/api/order.api";
import OrderData from "../order-data/orderData";

interface IProps {
  data: IResponseOrder[] | undefined;
}

const SuggestOrder: FC<IProps> = ({ data }) => {
  return (
    <div>
      {data ? (
        <div className=" bg-white dark:bg-black my-4 p-4 flex flex-col w-11/12 mx-auto 800px:w-[80%] h-[30%]">
          <h2 className="text-[27px] text-center text-black dark:text-white md:text-start font-[600] font-Roboto pb-[20px]">
            Related Product
          </h2>
          <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 grid-[22px] lg:grid-cols-4 grid-[26px] xl:grid-cols-5 xl:grid-[30px]">
            {data.map((item) => {
              return <OrderData data={item} />;
            })}
          </div>
        </div>
      ) : (
        <h1>there no any SuggestOrder for this order</h1>
      )}
    </div>
  );
};
export default SuggestOrder;
