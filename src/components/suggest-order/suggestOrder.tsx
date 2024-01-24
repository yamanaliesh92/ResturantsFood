import React, { FC } from "react";
import { IResponseOrder } from "../../redux/api/order.api";
import OrderData from "../order-data/orderData";

interface IProps {
  data: IResponseOrder[] | undefined;
}

const SuggestOrder: FC<IProps> = ({ data }) => {
  return (
    <div>
      {data && (
        <div className="w-11/12 mx-auto sm:w-[80%] dark:bg-white bg-dark  my-4 p-4 flex flex-col h-[30%]">
          <h2 className="text-[27px] text-center text-white dark:text-dark md:text-start font-[600] font-Roboto pb-[20px]">
            Related Order
          </h2>
          <div className="grid grid-cols-1  gap-[18px] md:grid-cols-2 grid-[22px] lg:grid-cols-4 grid-[26px] xl:grid-cols-5 xl:grid-[30px]">
            {data.map((item) => {
              return <OrderData data={item} />;
            })}
          </div>
          {data?.length === 0 && (
            <h1 className=" text-white dark:text-dark ">
              {" "}
              there is no any SuggestOrder for this order
            </h1>
          )}
        </div>
      )}
    </div>
  );
};
export default SuggestOrder;
