import React, { FC, useEffect, useState } from "react";
import { IResponseOrder } from "../../redux/api/order.api";

import ProductsData from "../productData/productData";

interface IProps {
  data: IResponseOrder[] | undefined;
}

const SuggestOrder: FC<IProps> = ({ data }) => {
  return (
    <div>
      {data ? (
        <div className=" bg-white my-4 p-4 flex flex-col w-11/12 mx-auto 800px:w-[80%] h-[30%]">
          <h2 className="text-[27px] text-center md:text-start font-[600] font-Roboto pb-[20px]">
            Related Product
          </h2>
          <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 grid-[22px] lg:grid-cols-4 grid-[26px] xl:grid-cols-5 xl:grid-[30px]">
            {data.map((item) => {
              return <ProductsData data={item} />;
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default SuggestOrder;
