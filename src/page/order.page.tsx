import React from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/header/header";
import OrderData from "../components/orderData/orderData";

import { useGetOrderByCategoryQuery } from "../redux/api/order.api";

const OrderCategoryPage = () => {
  const [SearchParams] = useSearchParams();
  const category = SearchParams.get("category");

  const { data } = useGetOrderByCategoryQuery({ category: category as string });

  return (
    <div>
      <Header activeHeading={3} />
      <div className="w-11/12 mx-auto">
        <div className="grid mt-6 grid-cols-1 gap-[18px] md:grid-cols-2 grid-[22px] lg:grid-cols-4 grid-[26px] xl:grid-cols-5 xl:grid-[30px]">
          {data &&
            data.map((item) => {
              return <OrderData data={item} />;
            })}
          {data && data.length === 0 ? (
            <h1> no product in {category} </h1>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default OrderCategoryPage;
