import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/header/header";
import ProductsData from "../components/productData/productData";
import { useGetOrderByCategoryQuery } from "../redux/api/order.api";

import { IProductData, productData } from "../sataic/product.data";

const OrderCategoryPage = () => {
  const [SearchParams] = useSearchParams();
  const category = SearchParams.get("category");
  // const [data, setData] = useState<IProductData[]>([]);

  const { data } = useGetOrderByCategoryQuery({ category: category as string });

  // useEffect(() => {
  //   console.log("cat", { cat });
  //   if (cat === null) {
  //     const d = productData.sort((a, b) => b.total_sell - a.total_sell);
  //     setData(d);
  //   }
  //   const dd = productData.filter((i) => i.category === cat);

  //   setData(dd);
  // }, [cat]);
  return (
    <div>
      <Header activeHeading={3} />
      <div className="w-11/12 mx-auto">
        <div className="grid mt-6 grid-cols-1 gap-[18px] md:grid-cols-2 grid-[22px] lg:grid-cols-4 grid-[26px] xl:grid-cols-5 xl:grid-[30px]">
          {data &&
            data.map((item) => {
              return <ProductsData data={item} />;
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
