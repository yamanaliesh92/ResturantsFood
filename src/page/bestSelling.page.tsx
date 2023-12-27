import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/header/header";
import ProductsData from "../components/orderData/orderData";

import { IProductData, productData } from "../sataic/product.data";

const BestSellingPage = () => {
  const [data, setData] = useState<IProductData[]>([]);

  useEffect(() => {
    const d = productData.sort((a, b) => b.total_sell - a.total_sell);
    setData(d);
  }, []);
  return (
    <div>
      <Header activeHeading={2} />
      <div className="w-11/12 mx-auto">
        <div className="grid mt-6 grid-cols-1 gap-[18px] md:grid-cols-2 grid-[22px] lg:grid-cols-4 grid-[26px] xl:grid-cols-5 xl:grid-[30px]">
          {data.map((item) => {
            // return <ProductsData data={item} />;
            return "dd";
          })}
        </div>
      </div>
    </div>
  );
};

export default BestSellingPage;
